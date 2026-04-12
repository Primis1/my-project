import type { Block } from 'payload'
import { link } from '../../fields/link'

export const FeatureCards: Block = {
  slug: 'featureCards',
  interfaceName: 'FeatureCardsBlock',
  labels: {
    singular: 'Feature Cards',
    plural: 'Feature Cards',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      admin: {
        description: 'Short uppercase label above the heading (e.g. "WHAT WE DO")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'shield',
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
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'bulletins',
          type: 'array',
          label: 'Bullet Points',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        link({
          overrides: {
            admin: {
              condition: (_, { enableLink }) => Boolean(enableLink),
            },
          },
        }),
      ],
    },
  ],
}
