import React from 'react'
import type { QuoteFormBlock as QuoteFormBlockType } from '@/payload-types'
import { PCQuoteForm } from './components/pc-quote-form'
import RichText from '@/components/RichText'

export const QuoteFormBlock: React.FC<
  {
    id?: string
  } & QuoteFormBlockType
> = (props) => {
  const { enableIntro, introContent } = props

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <PCQuoteForm />
    </div>
  )
}
