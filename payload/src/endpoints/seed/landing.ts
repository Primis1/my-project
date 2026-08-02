import type { RequiredDataFromCollectionSlug } from 'payload'

export const landing: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    title: 'Landing Page',
    slug: 'landing-page',
    template: 'landing-page',
    _status: 'published',
    landingPage: {
      heroHeading: '2 Free Giveaways!',
      heroSubtitle: 'We appreciate your interest! Review your 2 exclusive giveaways below and submit your request for instant access.',
      lureTitle: 'Your 2 Exclusive Free Giveaways',
      formTitle: 'Start Your Protection Plan',
      formSubtitle: 'Confidential assessment — no obligation',
      hideHeader: true,
      hideFooter: true,
    },
  }
}
