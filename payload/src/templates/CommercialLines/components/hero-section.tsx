"use client"

import { Building2, Shield, Truck, Briefcase } from "lucide-react"
import { ServiceHero } from "@/templates/PersonalLines/components/service-hero"

export function HeroSection({ data }: { data?: any }) {
  return (
    <ServiceHero
      // Badge
      badgeIcon={Shield}
      badgeText="Commercial P&C Specialists"
      
      // Headline
      headlineTop={data?.heroHeadlineTop || "Protect Your Business."}
      headlineBottom={data?.heroHeadlineBottom || "Secure Your Future."}
      description={data?.heroDescription || "Expert commercial insurance solutions tailored for your industry. We specialize in General Liability, Commercial Auto, Property, and Surety Bonds."}
      
      // Checkmarks
      checkmarks={[
        "Industry-specific coverage",
        "Proactive risk management",
        "Quarterly policy reviews"
      ]}
      
      // Form
      formTitle="Request a Commercial Review"
      formSubtitle="Get expert advice on your business coverage"
      tabs={[
        { id: "gl", label: "Liability", icon: Shield },
        { id: "property", label: "Property", icon: Building2 },
        { id: "auto", label: "Auto", icon: Truck },
        { id: "bonds", label: "Bonds", icon: Briefcase },
      ]}
      defaultTab="gl"
      fields={[
        { id: "businessName", label: "Business Name", type: "text", placeholder: "Acme Corp" },
        { id: "contactName", label: "Contact Name", type: "text", placeholder: "Jane Doe", halfWidth: true },
        { id: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567", halfWidth: true },
        { id: "email", label: "Email Address", type: "email", placeholder: "jane@acmecorp.com" },
        { id: "industry", label: "Industry", type: "text", placeholder: "Construction, Retail, etc.", halfWidth: true },
        { id: "zipCode", label: "ZIP Code", type: "text", placeholder: "12345", halfWidth: true },
      ]}
      submitLabel="Get a Risk Assessment"
      formFooter="We keep your business information strictly confidential."
      
      // Trust stats
      trustStats={[
        { value: "P&C", label: "Specialists" },
        { value: "24/7", label: "Claims Assistance" },
        { value: "4x", label: "Annual Reviews" },
        { value: "A+", label: "Rated Carriers" },
      ]}
    />
  )
}
