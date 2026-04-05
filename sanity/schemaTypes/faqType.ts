import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'Hỏi Đáp',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          {title: 'Câu hỏi mới', value: 'new'},
          {title: 'Đã trả lời', value: 'answered'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
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
      type: 'blockContent',
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
      status: 'status',
    },
    prepare({title, status}) {
      return {
        title,
        subtitle: status === 'new' ? '🆕 Chưa trả lời' : '✅ Đã trả lời',
      }
    },
  },
})
