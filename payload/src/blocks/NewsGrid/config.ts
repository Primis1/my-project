import type { Block } from 'payload'

export const NewsGrid: Block = {
  slug: 'newsGrid',
  interfaceName: 'NewsGridBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'From Our Desk',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Latest Updates & News',
    },
    {
      name: 'headingAccent',
      type: 'text',
      defaultValue: 'Updates',
      admin: {
        description: 'Text within the heading to highlight in italics/brand color.',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Articles',
      admin: {
        description: 'Label for the view all link.',
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      defaultValue: '/posts',
      admin: {
        description: 'URL for the view all link.',
      },
    },
  ],
  labels: {
    plural: 'News Grids',
    singular: 'News Grid',
  },
}
