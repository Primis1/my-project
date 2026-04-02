"use client"

import { useState } from "react"
import { cn } from "@/utilities/ui"
import {
  Home,
  Car,
  Shield,
  User,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Building2,
  Ship,
  Gem,
} from "lucide-react"
import { StepIndicator } from "./step-indicator"
import { FormField } from "./form-field"
import { StyledSelect } from "./style-select"
import { StyledInput } from "./styled-input"

const steps = [
  { id: 1, label: "Coverage Type", icon: <Shield className="h-4 w-4" /> },
  { id: 2, label: "Asset Details", icon: <Home className="h-4 w-4" /> },
  { id: 3, label: "Your Information", icon: <User className="h-4 w-4" /> },
  { id: 4, label: "Review", icon: <ArrowRight className="h-4 w-4" /> },
]

const coverageTypes = [
  { value: "homeowners", label: "High-Value Homeowners", icon: Home },
  { value: "auto", label: "Luxury Auto & Collection", icon: Car },
  { value: "commercial", label: "Commercial Property", icon: Building2 },
  { value: "watercraft", label: "Watercraft & Aviation", icon: Ship },
  { value: "valuables", label: "Jewellery & Valuables", icon: Gem },
  { value: "umbrella", label: "Excess Liability / Umbrella", icon: Shield },
]

const propertyValueRanges = [
  { value: "2m-5m", label: "$2M - $5M" },
  { value: "5m-10m", label: "$5M - $10M" },
  { value: "10m-25m", label: "$10M - $25M" },
  { value: "25m-50m", label: "$25M - $50M" },
  { value: "50m+", label: "$50M+" },
]

const propertyTypes = [
  { value: "primary", label: "Primary Residence" },
  { value: "secondary", label: "Secondary / Vacation Home" },
  { value: "investment", label: "Investment Property" },
  { value: "commercial", label: "Commercial Building" },
  { value: "mixed", label: "Mixed-Use Property" },
]

const constructionTypes = [
  { value: "standard", label: "Standard Construction" },
  { value: "custom", label: "Custom / Architectural" },
  { value: "heritage", label: "Heritage / Historical" },
  { value: "modern", label: "Modern / Contemporary" },
]

const securitySystems = [
  { value: "none", label: "None" },
  { value: "basic", label: "Basic Alarm System" },
  { value: "monitored", label: "24/7 Monitored System" },
  { value: "comprehensive", label: "Comprehensive (Cameras, Motion, etc.)" },
  { value: "staffed", label: "On-site Security Personnel" },
]

const vehicleYears = Array.from({ length: 30 }, (_, i) => ({
  value: String(2025 - i),
  label: String(2025 - i),
}))

const vehicleTypes = [
  { value: "luxury", label: "Luxury Sedan / SUV" },
  { value: "exotic", label: "Exotic / Supercar" },
  { value: "classic", label: "Classic / Vintage" },
  { value: "collector", label: "Collector Vehicle" },
  { value: "fleet", label: "Multiple Vehicles / Fleet" },
]

const vehicleValues = [
  { value: "100k-250k", label: "$100K - $250K" },
  { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-2m", label: "$1M - $2M" },
  { value: "2m+", label: "$2M+" },
]

const usageTypes = [
  { value: "personal", label: "Personal Use Only" },
  { value: "occasional", label: "Occasional / Weekend" },
  { value: "show", label: "Show / Display Only" },
  { value: "track", label: "Track Days Included" },
]

const storageTypes = [
  { value: "private-garage", label: "Private Garage" },
  { value: "climate-controlled", label: "Climate-Controlled Storage" },
  { value: "secure-facility", label: "Secure Storage Facility" },
  { value: "outdoor", label: "Outdoor / Driveway" },
]

const provinces = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "QC", label: "Quebec" },
  { value: "MB", label: "Manitoba" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "PE", label: "Prince Edward Island" },
]

const preferredContactMethods = [
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" },
  { value: "both", label: "Either" },
]

const timeframes = [
  { value: "immediate", label: "Immediate - Within 1 week" },
  { value: "1-3months", label: "1-3 Months" },
  { value: "3-6months", label: "3-6 Months" },
  { value: "exploring", label: "Just Exploring Options" },
]

interface Asset {
  id: string
  type: string
  details: Record<string, string>
}

export function PCQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0)
  const [formData, setFormData] = useState({
    // Personal info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    province: "",
    preferredContact: "",
    timeframe: "",
    additionalNotes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleCoverage = (value: string) => {
    setSelectedCoverages((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  const addAsset = (type: string) => {
    const newAsset: Asset = {
      id: `${type}-${Date.now()}`,
      type,
      details: {},
    }
    setAssets([...assets, newAsset])
    setCurrentAssetIndex(assets.length)
  }

  const removeAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id))
    if (currentAssetIndex >= assets.length - 1) {
      setCurrentAssetIndex(Math.max(0, assets.length - 2))
    }
  }

  const updateAssetDetail = (assetId: string, key: string, value: string) => {
    setAssets(
      assets.map((a) =>
        a.id === assetId ? { ...a, details: { ...a.details, [key]: value } } : a
      )
    )
  }

  const handleNext = () => {
    if (currentStep === 1 && selectedCoverages.length > 0) {
      // Initialize assets based on selected coverages if empty
      if (assets.length === 0) {
        const initialAssets = selectedCoverages.map((type) => ({
          id: `${type}-${Date.now()}-${Math.random()}`,
          type,
          details: {},
        }))
        setAssets(initialAssets)
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      setCurrentStep(4)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const currentAsset = assets[currentAssetIndex]

  const renderAssetForm = (asset: Asset) => {
    const isProperty = asset.type === "homeowners" || asset.type === "commercial"
    const isAuto = asset.type === "auto"

    if (isProperty) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Property Type"
            required
            tooltip="Select the type of property you want to insure"
          >
            <StyledSelect
              value={asset.details.propertyType}
              onValueChange={(v) => updateAssetDetail(asset.id, "propertyType", v)}
              placeholder="Select property type..."
              options={propertyTypes}
            />
          </FormField>

          <FormField
            label="Estimated Value"
            required
            tooltip="Approximate replacement value of the property"
          >
            <StyledSelect
              value={asset.details.value}
              onValueChange={(v) => updateAssetDetail(asset.id, "value", v)}
              placeholder="Select value range..."
              options={propertyValueRanges}
            />
          </FormField>

          <FormField label="Construction Type">
            <StyledSelect
              value={asset.details.construction}
              onValueChange={(v) => updateAssetDetail(asset.id, "construction", v)}
              placeholder="Select construction type..."
              options={constructionTypes}
            />
          </FormField>

          <FormField
            label="Security System"
            tooltip="Higher security may qualify for premium discounts"
          >
            <StyledSelect
              value={asset.details.security}
              onValueChange={(v) => updateAssetDetail(asset.id, "security", v)}
              placeholder="Select security level..."
              options={securitySystems}
            />
          </FormField>

          <FormField label="Year Built">
            <StyledInput
              type="number"
              placeholder="e.g., 2015"
              value={asset.details.yearBuilt || ""}
              onChange={(e) => updateAssetDetail(asset.id, "yearBuilt", e.target.value)}
            />
          </FormField>

          <FormField label="Square Footage">
            <StyledInput
              type="number"
              placeholder="e.g., 5000"
              value={asset.details.sqft || ""}
              onChange={(e) => updateAssetDetail(asset.id, "sqft", e.target.value)}
            />
          </FormField>

          <FormField label="Property Address" className="md:col-span-2">
            <StyledInput
              type="text"
              placeholder="Street address, city, postal code"
              value={asset.details.address || ""}
              onChange={(e) => updateAssetDetail(asset.id, "address", e.target.value)}
            />
          </FormField>
        </div>
      )
    }

    if (isAuto) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Vehicle Year"
            required
            tooltip="Year of manufacture"
          >
            <StyledSelect
              value={asset.details.year}
              onValueChange={(v) => updateAssetDetail(asset.id, "year", v)}
              placeholder="Select year..."
              options={vehicleYears}
            />
          </FormField>

          <FormField
            label="Vehicle Type"
            required
          >
            <StyledSelect
              value={asset.details.vehicleType}
              onValueChange={(v) => updateAssetDetail(asset.id, "vehicleType", v)}
              placeholder="Select type..."
              options={vehicleTypes}
            />
          </FormField>

          <FormField label="Make">
            <StyledInput
              type="text"
              placeholder="e.g., Porsche"
              value={asset.details.make || ""}
              onChange={(e) => updateAssetDetail(asset.id, "make", e.target.value)}
            />
          </FormField>

          <FormField label="Model">
            <StyledInput
              type="text"
              placeholder="e.g., 911 GT3"
              value={asset.details.model || ""}
              onChange={(e) => updateAssetDetail(asset.id, "model", e.target.value)}
            />
          </FormField>

          <FormField
            label="Estimated Value"
            required
            tooltip="Agreed value for insurance purposes"
          >
            <StyledSelect
              value={asset.details.value}
              onValueChange={(v) => updateAssetDetail(asset.id, "value", v)}
              placeholder="Select value range..."
              options={vehicleValues}
            />
          </FormField>

          <FormField
            label="Primary Use"
            tooltip="How the vehicle is primarily used affects coverage"
          >
            <StyledSelect
              value={asset.details.usage}
              onValueChange={(v) => updateAssetDetail(asset.id, "usage", v)}
              placeholder="Select usage..."
              options={usageTypes}
            />
          </FormField>

          <FormField
            label="Storage Location"
            tooltip="Where is the vehicle parked overnight?"
          >
            <StyledSelect
              value={asset.details.storage}
              onValueChange={(v) => updateAssetDetail(asset.id, "storage", v)}
              placeholder="Select storage type..."
              options={storageTypes}
            />
          </FormField>

          <FormField label="Annual Kilometres">
            <StyledInput
              type="number"
              placeholder="e.g., 5000"
              value={asset.details.annualKm || ""}
              onChange={(e) => updateAssetDetail(asset.id, "annualKm", e.target.value)}
            />
          </FormField>
        </div>
      )
    }

    // Generic form for other asset types
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="Estimated Value"
          required
        >
          <StyledSelect
            value={asset.details.value}
            onValueChange={(v) => updateAssetDetail(asset.id, "value", v)}
            placeholder="Select value range..."
            options={propertyValueRanges}
          />
        </FormField>

        <FormField label="Description" className="md:col-span-2">
          <textarea
            className="min-h-[100px] w-full border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            placeholder="Please describe the asset(s) you wish to insure..."
            value={asset.details.description || ""}
            onChange={(e) => updateAssetDetail(asset.id, "description", e.target.value)}
          />
        </FormField>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <section id="quote" className="relative bg-secondary py-28 lg:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-gold bg-gold/10">
            <Shield className="h-10 w-10 text-gold" />
          </div>
          <h2 className="font-serif text-4xl font-normal text-foreground">
            Quote Request <span className="italic text-gold">Received</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Thank you for your inquiry. A member of our P&C practice team will review
            your information and contact you within one business day to discuss your
            coverage needs.
          </p>
          <p className="mt-8 text-xs tracking-wide text-muted-foreground">
            Reference: #{Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="relative bg-secondary py-28 lg:py-36">
      {/* Subtle diagonal pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 1px,
            #C5A059 1px,
            #C5A059 2px
          )`,
          backgroundSize: "8px 8px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-medium tracking-[0.35em] uppercase text-gold">
            <span className="h-[1px] w-8 bg-gold" />
            Risk Assessment
            <span className="h-[1px] w-8 bg-gold" />
          </span>
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            Request a <span className="italic text-gold">Quote</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Complete this form to receive a personalized coverage assessment from our
            senior brokers.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} className="mb-12" />

        {/* Form Container */}
        <div className="border border-border bg-card p-8 lg:p-12">
          {/* Step 1: Coverage Selection */}
          {currentStep === 1 && (
            <div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-foreground">
                What would you like to protect?
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                Select all coverage types that apply. You can add multiple assets of each type.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {coverageTypes.map((coverage) => {
                  const Icon = coverage.icon
                  const isSelected = selectedCoverages.includes(coverage.value)

                  return (
                    <button
                      key={coverage.value}
                      type="button"
                      onClick={() => toggleCoverage(coverage.value)}
                      className={cn(
                        "group relative flex flex-col items-start gap-4 border p-6 text-left transition-all duration-300",
                        isSelected
                          ? "border-gold bg-gold/5"
                          : "border-border bg-background hover:border-gold/40"
                      )}
                    >
                      {/* Checkmark indicator */}
                      {isSelected && (
                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center bg-gold">
                          <svg
                            className="h-4 w-4 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center border transition-all duration-300",
                          isSelected
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border text-muted-foreground group-hover:border-gold/40 group-hover:text-gold"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          isSelected ? "text-gold" : "text-foreground"
                        )}
                      >
                        {coverage.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Asset Details */}
          {currentStep === 2 && (
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <h3 className="font-serif text-2xl font-normal text-foreground">
                  Asset Details
                </h3>
                <div className="flex flex-wrap gap-2">
                  {assets.map((asset, index) => {
                    const coverageType = coverageTypes.find((c) => c.value === asset.type)
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => setCurrentAssetIndex(index)}
                        className={cn(
                          "flex items-center gap-2 border px-3 py-1.5 text-xs transition-all duration-300",
                          currentAssetIndex === index
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border text-muted-foreground hover:border-gold/40"
                        )}
                      >
                        {coverageType?.label} #{assets.filter((a, i) => a.type === asset.type && i <= index).length}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeAsset(asset.id)
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Add more assets */}
              <div className="mb-8 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Add another:</span>
                {selectedCoverages.map((type) => {
                  const coverageType = coverageTypes.find((c) => c.value === type)
                  const Icon = coverageType?.icon || Shield
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addAsset(type)}
                      className="flex items-center gap-1 text-xs text-gold hover:text-gold-light"
                    >
                      <Plus className="h-3 w-3" />
                      {coverageType?.label}
                    </button>
                  )
                })}
              </div>

              {/* Current asset form */}
              {currentAsset && (
                <div>
                  <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-gold">
                      {coverageTypes.find((c) => c.value === currentAsset.type)?.label}
                    </span>
                  </div>
                  {renderAssetForm(currentAsset)}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Personal Information */}
          {currentStep === 3 && (
            <div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-foreground">
                Your Information
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                All information is treated with the strictest confidence.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField label="First Name" required>
                  <StyledInput
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Last Name" required>
                  <StyledInput
                    type="text"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Email Address" required>
                  <StyledInput
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Phone Number" required>
                  <StyledInput
                    type="tel"
                    placeholder="+1 (416) 555-1234"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Province" required>
                  <StyledSelect
                    value={formData.province}
                    onValueChange={(v) =>
                      setFormData({ ...formData, province: v })
                    }
                    placeholder="Select province..."
                    options={provinces}
                  />
                </FormField>

                <FormField label="Preferred Contact Method">
                  <StyledSelect
                    value={formData.preferredContact}
                    onValueChange={(v) =>
                      setFormData({ ...formData, preferredContact: v })
                    }
                    placeholder="Select preference..."
                    options={preferredContactMethods}
                  />
                </FormField>

                <FormField
                  label="When do you need coverage?"
                  className="md:col-span-2"
                >
                  <StyledSelect
                    value={formData.timeframe}
                    onValueChange={(v) =>
                      setFormData({ ...formData, timeframe: v })
                    }
                    placeholder="Select timeframe..."
                    options={timeframes}
                  />
                </FormField>

                <FormField
                  label="Additional Notes"
                  className="md:col-span-2"
                >
                  <textarea
                    className="min-h-[100px] w-full border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    placeholder="Any additional information you'd like us to know..."
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalNotes: e.target.value })
                    }
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-foreground">
                Review Your Request
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                Please review your information before submitting.
              </p>

              {/* Coverage Summary */}
              <div className="mb-8 border border-border bg-background p-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
                  Coverage Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCoverages.map((type) => {
                    const coverage = coverageTypes.find((c) => c.value === type)
                    return (
                      <span
                        key={type}
                        className="border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-gold"
                      >
                        {coverage?.label}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Assets Summary */}
              <div className="mb-8 border border-border bg-background p-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
                  Assets ({assets.length})
                </h4>
                <div className="space-y-3">
                  {assets.map((asset) => {
                    const coverage = coverageTypes.find((c) => c.value === asset.type)
                    return (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                      >
                        <span className="text-sm text-foreground">
                          {coverage?.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {asset.details.value || "Value not specified"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Contact Summary */}
              <div className="border border-border bg-background p-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Name</span>
                    <p className="text-sm text-foreground">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Email</span>
                    <p className="text-sm text-foreground">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Phone</span>
                    <p className="text-sm text-foreground">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Province</span>
                    <p className="text-sm text-foreground">
                      {provinces.find((p) => p.value === formData.province)?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center gap-2 border px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300",
                currentStep === 1
                  ? "cursor-not-allowed border-border text-muted-foreground opacity-50"
                  : "border-border text-foreground hover:border-gold/40 hover:text-gold"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 && selectedCoverages.length === 0}
                className={cn(
                  "flex items-center gap-2 border px-8 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                  currentStep === 1 && selectedCoverages.length === 0
                    ? "cursor-not-allowed border-border bg-border text-muted-foreground"
                    : "border-gold bg-gold text-primary-foreground hover:bg-transparent hover:text-gold"
                )}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 border border-gold bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="text-gold">RIBO Licensed</span> | Your information is secure and confidential
          </p>
        </div>
      </div>
    </section>
  )
}
