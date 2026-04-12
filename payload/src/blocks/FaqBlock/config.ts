import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlockType',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'FAQs',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
      required: true,
    },
    {
      name: 'titleAccent',
      type: 'text',
      defaultValue: 'Questions',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Find answers to common questions about our services, coverage options, and processes.',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'cta',
        label: 'Submit CTA (Internal/External Link)',
        maxRows: 1,
      },
    }),
  ],
  labels: {
    plural: 'FAQ Blocks',
    singular: 'FAQ Block',
  },
}
