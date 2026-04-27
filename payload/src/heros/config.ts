import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Impact (Side-by-Side)',
          value: 'impact',
        },
      ],
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'impact'].includes(type),
      },
    },
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
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Main Image',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'impact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'media2',
      type: 'upload',
      label: 'Secondary Image (Impact only)',
      admin: {
        condition: (_, { type } = {}) => ['impact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'style',
      type: 'select',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'impact'].includes(type),
      },
      defaultValue: 'default',
      options: [
        {
          label: 'Default (White)',
          value: 'default',
        },
        {
          label: 'Brand Blue',
          value: 'gold',
        },
      ],
    },
    {
      name: 'showScrollIndicator',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'impact'].includes(type),
      },
      defaultValue: true,
      label: 'Show Scroll Indicator',
    },
    {
      name: 'scrollIndicatorLabel',
      type: 'text',
      admin: {
        condition: (_, { type, showScrollIndicator } = {}) =>
          ['highImpact', 'impact'].includes(type) && showScrollIndicator,
      },
      defaultValue: 'Discover',
      label: 'Scroll Indicator Label',
    },
  ],
  label: false,
}
