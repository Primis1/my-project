"use client"

import { Heart, Shield, Wallet, Users } from "lucide-react"
import { ServiceHero } from "@/templates/PersonalLines/components/service-hero"

export function HeroSection({ data }: { data?: any }) {
  return (
    <ServiceHero
      // Badge
      badgeIcon={Heart}
      badgeText="Life & Income Protection Specialists"
      
      // Headline
      headlineTop={data?.heroHeadlineTop || "Protect What Matters."}
      headlineBottom={data?.heroHeadlineBottom || "Plan With Confidence."}
      description={data?.heroDescription || "Life insurance, income protection, and health benefits tailored for individuals, families, and business owners. Quality guidance for the moments that matter most."}
      
      // Checkmarks
      checkmarks={[
        "Personalized needs analysis",
        "Life-event triggered reviews",
        "Independent & unbiased advice"
      ]}
      
      // Form
      formTitle="Start Your Protection Plan"
      formSubtitle="Confidential assessment — no obligation"
      tabs={[
        { id: "income", label: "Income", icon: Wallet },
        { id: "life", label: "Life", icon: Heart },
        { id: "health", label: "Health", icon: Shield },
        { id: "group", label: "Group", icon: Users },
      ]}
      defaultTab="income"
      fields={[
        { id: "firstName", label: "First Name", type: "text", placeholder: "Jane", halfWidth: true },
        { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe", halfWidth: true },
        { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
        { id: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567", halfWidth: true },
        { id: "age", label: "Age", type: "text", placeholder: "35", halfWidth: true },
      ]}
      submitLabel="Get a Personalized Assessment"
      formFooter="Your information is kept strictly confidential."
      
      // Trust stats
      trustStats={[
        { value: "L&I", label: "Specialists" },
        { value: "100%", label: "Independent" },
        { value: "Life-Event", label: "Triggered Reviews" },
        { value: "A+", label: "Rated Carriers" },
      ]}
    />
  )
}
