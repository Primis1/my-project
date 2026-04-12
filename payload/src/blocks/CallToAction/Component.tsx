import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CenteredCta } from './CenteredCta'
import { DetailedCta } from './DetailedCta'

export const CallToActionBlock: React.FC<CTABlockProps> = (props) => {
  const { layout } = props

  if (layout === 'detailed') {
    const detailedContent = props.detailedContent || {}
    return <DetailedCta {...detailedContent} />
  }

  // Default is 'centered'
  return <CenteredCta richText={props.richText} links={props.links} />
}
