import type { Block } from 'payload'

export const PartnerCardsBlock: Block = {
  slug: 'partnerCards',
  interfaceName: 'PartnerCardsBlockType',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Partners',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Backed by Industry Leaders',
    },
    {
      name: 'titleAccent',
      type: 'text',
      defaultValue: 'Industry',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'As an independent agency, we partner with the best carriers in the industry to bring you choice, value, and peace of mind.',
    },
    {
      name: 'partnerCategories',
      type: 'array',
      label: 'Partner Categories',
      dbName: 'part_cats_block',
      fields: [
        {
          name: 'icon',
          type: 'select',
          dbName: 'part_cat_icon',
          options: [
            { label: 'Building', value: 'Building2' },
            { label: 'Handshake', value: 'Handshake' },
            { label: 'Shield', value: 'Shield' },
          ],
          defaultValue: 'Building2',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'partners',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Partner Cards',
    singular: 'Partner Cards',
  },
}
