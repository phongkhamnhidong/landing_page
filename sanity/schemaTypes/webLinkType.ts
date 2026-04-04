import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const webLinkType = defineType({
  name: 'webLink',
  title: 'Liên Kết Web',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Tên',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Đường dẫn (URL)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Nền tảng',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Zalo', value: 'zalo'},
          {title: 'Website', value: 'website'},
          {title: 'Khác', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'platform',
    },
  },
})
