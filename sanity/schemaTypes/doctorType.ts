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
      title: 'Chức danh (cũ)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'titles',
      title: 'Chức Danh',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Thêm từng chức danh riêng biệt. Ví dụ: "Thầy Thuốc Ưu Tú", "Bác Sĩ Chuyên Khoa Cấp 2 Nhi"',
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
      name: 'treatmentAreas',
      title: 'Các lĩnh vực điều trị',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Danh sách các lĩnh vực điều trị',
    }),
    defineField({
      name: 'achievements',
      title: 'Thành tích & Khen thưởng',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Danh sách thành tích, bằng khen, danh hiệu',
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
