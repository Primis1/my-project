import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const EventsBlock: Block = {
  slug: 'events',
  interfaceName: 'EventsBlockType',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Promo', value: 'promo' },
        { label: 'Giveaway', value: 'giveaway' },
        { label: 'New Service', value: 'new-service' },
        { label: 'Announcement', value: 'announcement' },
      ],
      defaultValue: 'promo',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      required: true,
      defaultValue: 'Limited Offer',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'highlight',
      type: 'text',
      admin: {
        description: 'Optional highlighted text shown below the title.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'expires',
      type: 'text',
      admin: {
        description: 'Optional expiration text (e.g., "Offer ends May 31").',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'CTA Link',
        maxRows: 1,
      },
    }),
  ],
  labels: {
    plural: 'Events Blocks',
    singular: 'Events Block',
  },
}
