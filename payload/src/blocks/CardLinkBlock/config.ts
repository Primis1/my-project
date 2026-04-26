import type { Block } from 'payload'
import { link } from '../../fields/link'

export const CardLinkBlock: Block = {
  slug: 'cardLink',
  interfaceName: 'CardLinkBlockType',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Who We Serve',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Solutions for Every Stage of Life',
      required: true,
    },
    {
      name: 'titleAccent',
      type: 'text',
      defaultValue: 'Every',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'We understand that insurance needs vary based on your life situation. That is why we offer specialized solutions for entrepreneurs, families, and individuals alike.',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Building', value: 'building' },
            { label: 'Trending Up', value: 'trending-up' },
            { label: 'Lock', value: 'lock' },
            { label: 'Users', value: 'users' },
            { label: 'Star', value: 'star' },
            { label: 'Chart', value: 'bar-chart' },
            { label: 'Check Circle', value: 'check-circle' },
            { label: 'Scale', value: 'scale' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Heart', value: 'heart' },
            { label: 'Home', value: 'home' },
            { label: 'Car', value: 'car' },
          ],
          defaultValue: 'shield',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'needs',
          type: 'array',
          label: 'Key Coverage Needs',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        link(),
      ],
    },
  ],
  labels: {
    plural: 'Card Link Blocks',
    singular: 'Card Link Block',
  },
}
