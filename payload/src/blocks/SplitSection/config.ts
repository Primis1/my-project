import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlockquoteFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const SplitSection: Block = {
  slug: 'splitSection',
  interfaceName: 'SplitSectionBlock',
  labels: {
    singular: 'Split Section',
    plural: 'Split Sections',
  },
  fields: [
    // ─── LEFT COLUMN (always visible) ───────────────────────────────
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      admin: {
        description: 'Short uppercase label above the heading (e.g. "OUR APPROACH")',
      },
    },
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlockquoteFeature(),
        ],
      }),
    },
    {
      name: 'enableCta',
      type: 'checkbox',
      label: 'Add CTA Button',
      defaultValue: false,
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'cta',
        label: 'CTA Button',
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableCta),
          hideGutter: true,
        },
      },
    }),

    // ─── RIGHT COLUMN ────────────────────────────────────────────────
    {
      name: 'rightColumnType',
      type: 'select',
      label: 'Right Column Type',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Stat Cards', value: 'stats' },
        { label: 'Numbered Steps', value: 'steps' },
      ],
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      admin: {
        condition: (_data, siblingData) => siblingData?.rightColumnType === 'image',
        description: 'Which side the image appears on',
      },
      options: [
        { label: 'Right (text left)', value: 'right' },
        { label: 'Left (text right)', value: 'left' },
      ],
    },

    // ─── Right: Image ─────────────────────────────────────────────
    {
      name: 'rightImage',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData?.rightColumnType === 'image',
      },
    },

    // ─── Right: Stat Cards ────────────────────────────────────────
    {
      name: 'rightStats',
      type: 'array',
      label: 'Stat Cards',
      admin: {
        condition: (_data, siblingData) => siblingData?.rightColumnType === 'stats',
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
          ],
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Stat Value (e.g. $2.4B+)',
          required: true,
        },
        {
          name: 'statLabel',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'statDescription',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },

    // ─── Right: Numbered Steps ────────────────────────────────────
    {
      name: 'rightSteps',
      type: 'array',
      label: 'Numbered Steps',
      admin: {
        condition: (_data, siblingData) => siblingData?.rightColumnType === 'steps',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight title in Gold',
          defaultValue: false,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
  ],
}
