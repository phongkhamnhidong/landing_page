import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Bài Viết',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'section',
      title: 'Phân mục',
      type: 'string',
      options: {
        list: [
          {title: 'Kiến Thức Y Khoa', value: 'kienThuc'},
          {title: 'Tin Tức', value: 'tinTuc'},
        ],
        layout: 'radio',
      },
      initialValue: 'kienThuc',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('Slug là bắt buộc. Nhấn "Generate" để tạo tự động.'),
    }),
    defineField({
      name: 'author',
      title: 'Tác giả',
      type: 'reference',
      to: {type: 'doctor'},
      validation: (Rule) => Rule.required().error('Vui lòng chọn tác giả.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh chính',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Mô tả ảnh',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Danh mục',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      validation: (Rule) => Rule.required().min(1).error('Vui lòng chọn ít nhất một danh mục.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('Vui lòng chọn ngày đăng.'),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'blockContent',
      validation: (Rule) => Rule.required().error('Nội dung bài viết là bắt buộc.'),
    }),
    defineField({
      name: 'references',
      title: 'Tài liệu tham khảo',
      type: 'array',
      description: 'Các nguồn tham khảo được sử dụng trong bài viết',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Tên tài liệu', type: 'string'},
            {name: 'url', title: 'Đường dẫn', type: 'url'},
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      section: 'section',
    },
    prepare(selection) {
      const {author, section} = selection
      const label = section === 'tinTuc' ? 'Tin Tức' : 'Kiến Thức'
      return {
        ...selection,
        subtitle: [label, author && `· ${author}`].filter(Boolean).join(' '),
      }
    },
  },
})
