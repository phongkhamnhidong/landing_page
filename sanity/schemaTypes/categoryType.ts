import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
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
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
