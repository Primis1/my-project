import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const PromotionBlock: Block = {
  slug: 'promotion',
  interfaceName: 'PromotionBlockType',
  labels: {
    singular: 'Promotion Banner',
    plural: 'Promotion Banners',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info (Blue)', value: 'info' },
        { label: 'Success (Green)', value: 'success' },
        { label: 'Warning (Amber)', value: 'warning' },
        { label: 'Brand (Primary)', value: 'brand' },
      ],
      admin: {
        description: 'Sets the visual tone of the promotion banner.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        placeholder: 'e.g. Limited Time, New for 2026, Holiday Special',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Main promotion headline',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        placeholder: 'Brief supporting text (1-2 sentences)',
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Allow visitors to dismiss/close the banner.',
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        maxRows: 2,
      },
    }),
  ],
}
