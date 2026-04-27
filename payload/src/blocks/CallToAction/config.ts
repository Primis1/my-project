import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'centered',
      options: [
        {
          label: 'Centered Banner',
          value: 'centered',
        },
        {
          label: 'Detailed Partners',
          value: 'detailed',
        },
      ],
      admin: {
        description: 'Choose the visual layout for this Call to Action.',
      },
      required: true,
    },
    // --- Centered Layout Fields ---
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'centered',
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, siblingData) => siblingData.layout === 'centered',
        },
      },
    }),

    // --- Detailed Layout Fields ---
    {
      type: 'group',
      name: 'detailedContent',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'detailed',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'benefitsTitle',
              type: 'text',
              defaultValue: 'The Independent Advantage',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'benefitsDescription',
              type: 'textarea',
              defaultValue: 'Unlike captive agents who represent a single carrier, we work for you. Our independent status means we can shop the market to find the best coverage at the best price — every time.',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefits List',
          fields: [
            {
              name: 'benefit',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
