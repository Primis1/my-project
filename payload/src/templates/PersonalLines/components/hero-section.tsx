"use client"

import { Car, Home, Building2, Shield } from "lucide-react"
import { ServiceHero } from "./service-hero"

export function HeroSection({ data }: { data?: any }) {
  return (
    <ServiceHero
      // Badge
      badgeIcon={Shield}
      badgeText="Independent Advisor - No Proprietary Plans"
      
      // Headline
      headlineTop={data?.heroHeadlineTop || "Compare. Save."}
      headlineBottom={data?.heroHeadlineBottom || "Get Protected."}
      description={data?.heroDescription || "We shop 20+ insurance companies to find you the best coverage at the lowest price. No sales pressure, just expert guidance tailored to your needs."}
      
      // Checkmarks
      checkmarks={[
        "Unbiased recommendations",
        "Multi-carrier access",
        "Annual coverage reviews"
      ]}
      
      // Form
      formTitle="Get Your Free Quote"
      formSubtitle="Compare rates from 20+ insurers in minutes"
      tabs={[
        { id: "auto", label: "Auto", icon: Car },
        { id: "home", label: "Home", icon: Home },
        { id: "tenant", label: "Tenant", icon: Building2 },
      ]}
      defaultTab="auto"
      fields={[
        { id: "firstName", label: "First Name", type: "text", placeholder: "John", halfWidth: true },
        { id: "lastName", label: "Last Name", type: "text", placeholder: "Smith", halfWidth: true },
        { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
        { id: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567", halfWidth: true },
        { id: "zipCode", label: "ZIP Code", type: "text", placeholder: "12345", halfWidth: true },
      ]}
      submitLabel="Compare Quotes Now"
      formFooter="No obligation. We never share your information."
      
      // Trust stats
      trustStats={[
        { value: "20+", label: "Insurance Partners" },
        { value: "$847", label: "Avg. Annual Savings" },
        { value: "15min", label: "Quote Comparison" },
        { value: "98%", label: "Client Retention" },
      ]}
    />
  )
}
