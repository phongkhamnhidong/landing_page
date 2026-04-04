import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const clinicInfoType = defineType({
  name: 'clinicInfo',
  title: 'Clinic Info',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'clinicName',
      title: 'Clinic Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'motto',
      title: 'Khẩu hiệu (Motto)',
      type: 'string',
      description: 'Ví dụ: CHẤT LƯỢNG - HIỆU QUẢ - TẬN TÂM',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description shown in the hero section',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'zalo',
      title: 'Zalo',
      type: 'string',
      description: 'Số điện thoại Zalo hoặc link zalo.me/...',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'Link trang Facebook của phòng khám',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours (deprecated)',
      type: 'text',
      hidden: true,
    }),
    defineField({
      name: 'schedule',
      title: 'Lịch Làm Việc',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'daySchedule',
          fields: [
            {
              name: 'day',
              title: 'Ngày',
              type: 'string',
              options: {
                list: [
                  {title: 'Thứ Hai', value: 'monday'},
                  {title: 'Thứ Ba', value: 'tuesday'},
                  {title: 'Thứ Tư', value: 'wednesday'},
                  {title: 'Thứ Năm', value: 'thursday'},
                  {title: 'Thứ Sáu', value: 'friday'},
                  {title: 'Thứ Bảy', value: 'saturday'},
                  {title: 'Chủ Nhật', value: 'sunday'},
                ],
              },
            },
            {name: 'openTime', title: 'Giờ mở cửa (deprecated)', type: 'string', hidden: true},
            {name: 'closeTime', title: 'Giờ đóng cửa (deprecated)', type: 'string', hidden: true},
            {
              name: 'slots',
              title: 'Khung giờ',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'openTime', title: 'Giờ mở cửa', type: 'string'},
                    {name: 'closeTime', title: 'Giờ đóng cửa', type: 'string'},
                  ],
                  preview: {
                    select: {title: 'openTime', subtitle: 'closeTime'},
                  },
                },
              ],
            },
            {name: 'isClosed', title: 'Nghỉ', type: 'boolean', initialValue: false},
          ],
          preview: {
            select: {title: 'day'},
          },
        },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About the Clinic',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'clinicName',
    },
  },
})
