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
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text',
      rows: 4,
      description: 'e.g. Thứ 2 - Thứ 6: 8:00 - 17:00',
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
