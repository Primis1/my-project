"use client"

import { Shield, Scale, Heart } from "lucide-react"
import { PartnersCarousel as SharedPartnersCarousel } from "./partners-carousel"

const insurancePartners = [
  "State Farm",
  "Allstate", 
  "Progressive",
  "GEICO",
  "Liberty Mutual",
  "Nationwide",
  "Farmers",
  "USAA",
  "Travelers",
  "American Family",
  "Erie Insurance",
  "The Hartford",
  "Safeco",
  "MetLife",
  "Chubb",
  "Amica",
  "Auto-Owners",
  "Mercury",
  "Esurance",
  "21st Century",
]

const valueProps = [
  {
    icon: Shield,
    title: "Unbiased Recommendations",
    description: "We don't sell our own policies. We find the best fit from 20+ carriers.",
  },
  {
    icon: Scale,
    title: "True Comparison Shopping",
    description: "See real quotes side-by-side with transparent pricing breakdowns.",
  },
  {
    icon: Heart,
    title: "Your Advocate, Always",
    description: "We work for you, not the insurance companies. Your interests come first.",
  },
]

export function PartnersCarousel() {
  return (
    <SharedPartnersCarousel
      sectionLabel="Our Insurance Partners"
      headline="We Compare 20+ Top Insurers for You"
      partners={insurancePartners}
      valueProps={valueProps}
    />
  )
}
