"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/utilities/ui"

interface SelectOption {
  value: string
  label: string
}

interface StyledSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: SelectOption[]
  className?: string
  disabled?: boolean
}

export function StyledSelect({
  value,
  onValueChange,
  placeholder = "Select...",
  options,
  className,
  disabled = false,
}: StyledSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "h-12 w-full rounded-xl border-border bg-card px-4 text-sm text-foreground transition-all duration-300",
          "hover:border-gold/40 focus:border-gold focus:ring-gold/20",
          "data-[placeholder]:text-muted-foreground",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-border bg-card">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer text-foreground hover:bg-secondary focus:bg-secondary focus:text-gold"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
