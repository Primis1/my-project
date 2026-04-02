import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { QuoteFormBlock as QuoteFormBlockType } from '@/payload-types'
import { PCQuoteForm } from './components/pc-quote-form'

type Props = {
  block: QuoteFormBlockType
}

export const QuoteFormBlock: React.FC<Props> = async ({ block }) => {
  const payload = await getPayload({ config })
  const options = await payload.findGlobal({ slug: 'quoteFormOptions' })

  return <PCQuoteForm config={block} options={options} />
}
