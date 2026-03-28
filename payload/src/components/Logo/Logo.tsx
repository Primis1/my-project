import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  text?: string | null
}

export const Logo = (props: Props) => {
  const { className, text } = props

  return (
    <div className={clsx('flex items-center gap-3 group', className)}>
      <div className="flex items-center gap-0.5">
        <div className="h-5 w-[2px] bg-gold" />
        <div className="h-7 w-[2px] bg-gold" />
        <div className="h-5 w-[2px] bg-gold" />
      </div>
      <span className="font-serif text-lg tracking-wide text-foreground">
        {text || 'Finn Babinskyi'}
      </span>
    </div>
  )
}
