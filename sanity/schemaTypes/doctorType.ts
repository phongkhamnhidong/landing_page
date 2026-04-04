import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const doctorType = defineType({
  name: 'doctor',
  title: 'Bác Sĩ',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Họ và tên',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'title',
      title: 'Chức danh',
      type: 'string',
      description: 'Ví dụ: Bác sĩ Nhi khoa, Thạc sĩ - Bác sĩ',
    }),
    defineField({
      name: 'qualifications',
      title: 'Bằng cấp',
      type: 'string',
      description: 'Ví dụ: Tốt nghiệp Đại học Y Dược TP.HCM',
    }),
    defineField({
      name: 'shortBio',
      title: 'Giới thiệu ngắn (cho trang chủ)',
      type: 'text',
      rows: 3,
      description: '2–3 câu giới thiệu hiển thị trên trang chủ',
    }),
    defineField({
      name: 'achievements',
      title: 'Thành tích & Kinh nghiệm',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Danh sách thành tích, chứng chỉ, kinh nghiệm',
    }),
    defineField({
      name: 'photo',
      title: 'Ảnh',
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
      name: 'bio',
      title: 'Tiểu sử đầy đủ',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
})
