import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'Hỏi Đáp',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'submitterName',
      title: 'Người gửi',
      type: 'string',
      description: 'Tên người gửi câu hỏi (từ website)',
    }),
    defineField({
      name: 'question',
      title: 'Câu hỏi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Câu trả lời',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})
