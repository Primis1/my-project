import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { SplitSection } from '../../blocks/SplitSection/config'
import { FeatureCards } from '../../blocks/FeatureCards/config'
import { QuoteFormBlock } from '../../blocks/QuoteForm/config'
import { NewsGrid } from '../../blocks/NewsGrid/config'
import { FaqBlock } from '../../blocks/FaqBlock/config'
import { CardLinkBlock } from '../../blocks/CardLinkBlock/config'
import { EventsBlock } from '../../blocks/EventsBlock/config'
import { ContactBlock } from '../../blocks/ContactBlock/config'
import { PartnerCardsBlock } from '../../blocks/PartnerCards/config'
import { PromotionBlock } from '../../blocks/PromotionBlock/config'
import { link } from '../../fields/link'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'default',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Default (Blocks)',
          value: 'default',
        },
        {
          label: 'Personal Lines',
          value: 'personal-lines',
        },
        {
          label: 'Commercial Lines',
          value: 'commercial-lines',
        },
        {
          label: 'Life & Income',
          value: 'life-income',
        },
        {
          label: 'Home Page',
          value: 'home',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
          admin: {
            condition: (_, siblingData) => !siblingData?.template || siblingData?.template === 'default',
          },
        },
        {
          label: 'Template Settings',
          fields: [
            {
              name: 'personalLines',
              type: 'group',
              fields: [
                {
                  name: 'heroHeadlineTop',
                  type: 'text',
                  defaultValue: 'Compare. Save.',
                },
                {
                  name: 'heroHeadlineBottom',
                  type: 'text',
                  defaultValue: 'Get Protected.',
                },
                {
                  name: 'heroDescription',
                  type: 'textarea',
                  defaultValue: 'We shop 20+ insurance companies to find you the best coverage at the lowest price. No sales pressure, just expert guidance tailored to your needs.',
                },
              ],
            },
            {
              name: 'plLinks',
              type: 'group',
              label: 'Page Links',
              admin: { description: 'Editable links used throughout the Personal Lines template.' },
              fields: [
                link({ appearances: false, overrides: { name: 'ctaPrimary', label: 'CTA Primary Link' } }),
                link({ appearances: false, overrides: { name: 'ctaSecondary', label: 'CTA Secondary Link' } }),
              ],
            },
            {
              name: 'plPromotion',
              label: 'Promotion Banner (below Hero)',
              type: 'blocks',
              blocks: [PromotionBlock],
              maxRows: 1,
              admin: {
                description: 'Optional promotion banner displayed between the Hero section and the Partners carousel.',
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.template === 'personal-lines',
          },
        },
        {
          label: 'Commercial Template Settings',
          fields: [
            {
              name: 'commercialLines',
              type: 'group',
              fields: [
                {
                  name: 'heroHeadlineTop',
                  type: 'text',
                  defaultValue: 'Protect Your Business.',
                },
                {
                  name: 'heroHeadlineBottom',
                  type: 'text',
                  defaultValue: 'Secure Your Future.',
                },
                {
                  name: 'heroDescription',
                  type: 'textarea',
                  defaultValue: 'Comprehensive commercial insurance solutions tailored for your industry. We help you manage risk and protect your bottom line.',
                },
              ],
            },
            {
              name: 'clLinks',
              type: 'group',
              label: 'Page Links',
              admin: { description: 'Editable links used throughout the Commercial Lines template.' },
              fields: [
                link({ appearances: false, overrides: { name: 'ctaPrimary', label: 'CTA Primary Link' } }),
                link({ appearances: false, overrides: { name: 'ctaSecondary', label: 'CTA Secondary Link' } }),
              ],
            },
            {
              name: 'clPromotion',
              label: 'Promotion Banner (below Hero)',
              type: 'blocks',
              blocks: [PromotionBlock],
              maxRows: 1,
              admin: {
                description: 'Optional promotion banner displayed between the Hero section and the Partners carousel.',
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.template === 'commercial-lines',
          },
        },
        {
          label: 'Life & Income Template Settings',
          fields: [
            {
              name: 'lifeIncome',
              type: 'group',
              fields: [
                {
                  name: 'heroHeadlineTop',
                  type: 'text',
                  defaultValue: 'Protect What Matters.',
                },
                {
                  name: 'heroHeadlineBottom',
                  type: 'text',
                  defaultValue: 'Plan With Confidence.',
                },
                {
                  name: 'heroDescription',
                  type: 'textarea',
                  defaultValue: 'Life insurance, income protection, and health benefits tailored for individuals, families, and business owners. Quality guidance for the moments that matter most.',
                },
              ],
            },
            {
              name: 'liLinks',
              type: 'group',
              label: 'Page Links',
              admin: { description: 'Editable links used throughout the Life & Income template.' },
              fields: [
                link({ appearances: false, overrides: { name: 'ctaPrimary', label: 'CTA Primary Link' } }),
                link({ appearances: false, overrides: { name: 'ctaSecondary', label: 'CTA Secondary Link' } }),
              ],
            },
            {
              name: 'liPromotion',
              label: 'Promotion Banner (below Hero)',
              type: 'blocks',
              blocks: [PromotionBlock],
              maxRows: 1,
              admin: {
                description: 'Optional promotion banner displayed between the Hero section and the Partners carousel.',
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.template === 'life-income',
          },
        },
        {
          label: 'Home Page Settings',
          fields: [
            {
              name: 'homePage',
              type: 'group',
              fields: [
                {
                  name: 'heroHeadlineTop',
                  type: 'text',
                  defaultValue: 'Insurance That Works',
                },
                {
                  name: 'heroHeadlineBottom',
                  type: 'text',
                  defaultValue: 'For You.',
                },
                {
                  name: 'heroDescription',
                  type: 'textarea',
                  defaultValue: 'An independent brokerage protecting individuals, families, and businesses across personal, commercial, and life insurance — all under one roof.',
                },
              ],
            },
            {
              name: 'homeLinks',
              type: 'group',
              label: 'Page Links',
              admin: { description: 'Editable links used throughout the Home page template.' },
              fields: [
                link({ appearances: false, overrides: { name: 'divisionPL', label: 'Personal Lines Division Link' } }),
                link({ appearances: false, overrides: { name: 'divisionCL', label: 'Commercial Lines Division Link' } }),
                link({ appearances: false, overrides: { name: 'divisionLI', label: 'Life & Income Division Link' } }),
                link({ appearances: false, overrides: { name: 'ctaPrimary', label: 'Why Us CTA Link' } }),
              ],
            },
            {
              name: 'homePromotion',
              label: 'Promotion Banner (below Hero)',
              type: 'blocks',
              blocks: [PromotionBlock],
              maxRows: 1,
              admin: {
                description: 'Optional promotion banner displayed below the hero section.',
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.template === 'home',
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                SplitSection,
                FeatureCards,
                QuoteFormBlock,
                NewsGrid,
                FaqBlock,
                CardLinkBlock,
                EventsBlock,
                ContactBlock,
                PartnerCardsBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
          admin: {
            condition: (_, siblingData) => !siblingData?.template || siblingData?.template === 'default',
          },
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
