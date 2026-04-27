import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlockType',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Get In Touch',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: "Let's Start the",
      required: true,
    },
    {
      name: 'titleHighlight',
      type: 'text',
      defaultValue: 'Conversation',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Ready to protect what matters most? Reach out today for a free consultation with one of our experienced advisors.',
    },
    {
      name: 'contactInfo',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Map Pin', value: 'MapPin' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Clock', value: 'Clock' },
          ],
          defaultValue: 'MapPin',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'details',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Contact Blocks',
    singular: 'Contact Block',
  },
}
