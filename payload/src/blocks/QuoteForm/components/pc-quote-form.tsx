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
import { resolveIcon } from "./icon-resolver"

export interface QuoteFormConfig {
  eyebrow?: string | null
  heading?: string | null
  headingAccent?: string | null
  subheading?: string | null
  step1Heading?: string | null
  step1Subheading?: string | null
  step2Heading?: string | null
  step3Heading?: string | null
  step3Subheading?: string | null
  step4Heading?: string | null
  step4Subheading?: string | null
  submitButtonLabel?: string | null
  successHeading?: string | null
  successHeadingAccent?: string | null
  successMessage?: string | null
  trustLine?: string | null
}

export interface PCQuoteFormProps {
  config?: QuoteFormConfig
  options?: QuoteFormOptions
}

type Validator = (value: string) => string | undefined

const required: Validator = (v) =>
  v.trim() === '' ? 'This field is required.' : undefined

const validEmail: Validator = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
    ? undefined
    : 'Please enter a valid email address.'

const validPhone: Validator = (v) =>
  /^[\d\s\-+()]{7,}$/.test(v.trim())
    ? undefined
    : 'Please enter a valid phone number.'

function validate(rules: Record<string, Array<Validator>>, data: Record<string, string>) {
  const result: Record<string, string> = {}
  for (const [field, validators] of Object.entries(rules)) {
    for (const validator of validators) {
      const error = validator(data[field] ?? '')
      if (error) {
        result[field] = error
        break 
      }
    }
  }
  return result
}

function renderAccentHeading(full: string, accent: string, className = '') {
  if (!accent || !full.includes(accent)) {
    return <span className={className}>{full}</span>
  }
  const [before, ...afterParts] = full.split(accent)
  const after = afterParts.join(accent)
  return (
    <>
      {before}
      <span className={cn('italic text-gold', className)}>{accent}</span>
      {after}
    </>
  )
}


const steps = [
  { id: 1, label: "Coverage Type", icon: <Shield className="h-4 w-4" /> },
  { id: 2, label: "Asset Details", icon: <Home className="h-4 w-4" /> },
  { id: 3, label: "Your Information", icon: <User className="h-4 w-4" /> },
  { id: 4, label: "Review", icon: <ArrowRight className="h-4 w-4" /> },
]

export interface CoverageTypeOption {
  value: string
  label: string
  icon: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface QuoteFormOptions {
  coverageTypes?: CoverageTypeOption[]
  propertyValueRanges?: SelectOption[]
  propertyTypes?: SelectOption[]
  constructionTypes?: SelectOption[]
  securitySystems?: SelectOption[]
  vehicleTypes?: SelectOption[]
  vehicleValues?: SelectOption[]
  usageTypes?: SelectOption[]
  storageTypes?: SelectOption[]
  provinces?: SelectOption[]
  preferredContactMethods?: SelectOption[]
  timeframes?: SelectOption[]
}

const vehicleYears = Array.from({ length: 30 }, (_, i) => ({
  value: String(2025 - i),
  label: String(2025 - i),
}))

interface Asset {
  id: string
  type: string
  details: Record<string, string>
}

export function PCQuoteForm({ config = {}, options = {} }: PCQuoteFormProps) {
  const {
    coverageTypes: coverageTypesRaw = FALLBACK_COVERAGE_TYPES,
    propertyValueRanges = FALLBACK_PROPERTY_VALUE_RANGES,
    propertyTypes = FALLBACK_PROPERTY_TYPES,
    constructionTypes = FALLBACK_CONSTRUCTION_TYPES,
    securitySystems = FALLBACK_SECURITY_SYSTEMS,
    vehicleTypes = FALLBACK_VEHICLE_TYPES,
    vehicleValues = FALLBACK_VEHICLE_VALUES,
    usageTypes = FALLBACK_USAGE_TYPES,
    storageTypes = FALLBACK_STORAGE_TYPES,
    provinces = FALLBACK_PROVINCES,
    preferredContactMethods = FALLBACK_CONTACT_METHODS,
    timeframes = FALLBACK_TIMEFRAMES,
  } = options

  const coverageTypes = coverageTypesRaw.map((c) => ({
    ...c,
    icon: resolveIcon(c.icon),
  }))

  const eyebrow = config.eyebrow || 'Risk Assessment'
  const heading = config.heading || 'Request a Quote'
  const headingAccent = config.headingAccent || 'Quote'
  const subheading = config.subheading || 'Complete this form to receive a personalized coverage assessment from our senior brokers.'
  const step1Heading = config.step1Heading || 'What would you like to protect?'
  const step1Subheading = config.step1Subheading || 'Select all coverage types that apply. You can add multiple assets of each type.'
  const step2Heading = config.step2Heading || 'Asset Details'
  const step3Heading = config.step3Heading || 'Your Information'
  const step3Subheading = config.step3Subheading || 'All information is treated with the strictest confidence.'
  const step4Heading = config.step4Heading || 'Review Your Request'
  const step4Subheading = config.step4Subheading || 'Please review your information before submitting.'
  const submitButtonLabel = config.submitButtonLabel || 'Submit Request'
  const successHeading = config.successHeading || 'Quote Request Received'
  const successHeadingAccent = config.successHeadingAccent || 'Received'
  const successMessage = config.successMessage || 'Thank you for your inquiry. A member of our P&C practice team will review your information and contact you within one business day to discuss your coverage needs.'
  const trustLine = config.trustLine || 'RIBO Licensed | Your information is secure and confidential'
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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const stepValidationRules: Record<number, () => Record<string, string>> = {
    1: (): Record<string, string> => {
      if (selectedCoverages.length === 0) {
        return { coverages: 'Please select at least one coverage type.' }
      }
      return {}
    },
    3: () =>
      validate(
        {
          firstName: [required],
          lastName: [required],
          email: [required, validEmail],
          phone: [required, validPhone],
          province: [required],
        },
        formData,
      ),
  }

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
    const rulesFn = stepValidationRules[currentStep]
    const stepErrors = rulesFn ? rulesFn() : {}

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return // block navigation
    }

    setErrors({})

    if (currentStep === 1) {
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
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (honeypot !== '') {
      setIsSubmitted(true)
      return
    }
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        province: formData.province,
        preferredContact: formData.preferredContact,
        timeframe: formData.timeframe,
        additionalNotes: formData.additionalNotes,
        selectedCoverages: selectedCoverages.map((value) => ({ value })),
        assets: assets.map((a) => ({
          assetId: a.id,
          assetType: a.type,
          details: Object.entries(a.details).map(([key, value]) => ({ key, value })),
        })),
      }

      const res = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error?.message ?? `Submission failed: ${res.status}`)
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Quote submission error:', err)
      setSubmitError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
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
            {renderAccentHeading(successHeading, successHeadingAccent)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {successMessage}
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
            {eyebrow}
            <span className="h-[1px] w-8 bg-gold" />
          </span>
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            {renderAccentHeading(heading, headingAccent)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {subheading}
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
                {step1Heading}
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                {step1Subheading}
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
              {errors.coverages && (
                <p className="mt-4 text-xs text-destructive">{errors.coverages}</p>
              )}
            </div>
          )}

          {/* Step 2: Asset Details */}
          {currentStep === 2 && (
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <h3 className="font-serif text-2xl font-normal text-foreground">
                  {step2Heading}
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
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-foreground">
                {step3Heading}
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                {step3Subheading}
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField label="First Name" required error={errors.firstName}>
                  <StyledInput
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormField("firstName", e.target.value)}
                  />
                </FormField>

                <FormField label="Last Name" required error={errors.lastName}>
                  <StyledInput
                    type="text"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => updateFormField("lastName", e.target.value)}
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.email}>
                  <StyledInput
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormField("email", e.target.value)}
                  />
                </FormField>

                <FormField label="Phone Number" required error={errors.phone}>
                  <StyledInput
                    type="tel"
                    placeholder="+1 (416) 555-1234"
                    value={formData.phone}
                    onChange={(e) => updateFormField("phone", e.target.value)}
                  />
                </FormField>

                <FormField label="Province" required error={errors.province}>
                  <StyledSelect
                    value={formData.province}
                    onValueChange={(v) => updateFormField("province", v)}
                    placeholder="Select province..."
                    options={provinces}
                  />
                </FormField>

                <FormField label="Preferred Contact Method">
                  <StyledSelect
                    value={formData.preferredContact}
                    onValueChange={(v) => updateFormField("preferredContact", v)}
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
                    onValueChange={(v) => updateFormField("timeframe", v)}
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
                    onChange={(e) => updateFormField("additionalNotes", e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-foreground">
                {step4Heading}
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                {step4Subheading}
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

            {submitError && (
              <div className="absolute -top-6 right-0 text-xs text-destructive">
                {submitError}
              </div>
            )}
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
                {isSubmitting ? "Submitting..." : submitButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-center">
          {(() => {
            const [gold, ...rest] = trustLine.split('|')
            const remainingText = rest.join('|')
            return (
              <p className="text-xs text-muted-foreground">
                <span className="text-gold">{gold?.trim()}</span>
                {remainingText ? ` | ${remainingText.trim()}` : ''}
              </p>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

const FALLBACK_COVERAGE_TYPES = [
  { value: "homeowners", label: "High-Value Homeowners", icon: 'Home' },
  { value: "auto", label: "Luxury Auto & Collection", icon: 'Car' },
  { value: "commercial", label: "Commercial Property", icon: 'Building2' },
  { value: "watercraft", label: "Watercraft & Aviation", icon: 'Ship' },
  { value: "valuables", label: "Jewellery & Valuables", icon: 'Gem' },
  { value: "umbrella", label: "Excess Liability / Umbrella", icon: 'Shield' },
]

const FALLBACK_PROPERTY_VALUE_RANGES = [
  { value: "2m-5m", label: "$2M - $5M" },
  { value: "5m-10m", label: "$5M - $10M" },
  { value: "10m-25m", label: "$10M - $25M" },
  { value: "25m-50m", label: "$25M - $50M" },
  { value: "50m+", label: "$50M+" },
]

const FALLBACK_PROPERTY_TYPES = [
  { value: "primary", label: "Primary Residence" },
  { value: "secondary", label: "Secondary / Vacation Home" },
  { value: "investment", label: "Investment Property" },
  { value: "commercial", label: "Commercial Building" },
  { value: "mixed", label: "Mixed-Use Property" },
]

const FALLBACK_CONSTRUCTION_TYPES = [
  { value: "standard", label: "Standard Construction" },
  { value: "custom", label: "Custom / Architectural" },
  { value: "heritage", label: "Heritage / Historical" },
  { value: "modern", label: "Modern / Contemporary" },
]

const FALLBACK_SECURITY_SYSTEMS = [
  { value: "none", label: "None" },
  { value: "basic", label: "Basic Alarm System" },
  { value: "monitored", label: "24/7 Monitored System" },
  { value: "comprehensive", label: "Comprehensive (Cameras, Motion, etc.)" },
  { value: "staffed", label: "On-site Security Personnel" },
]

const FALLBACK_VEHICLE_TYPES = [
  { value: "luxury", label: "Luxury Sedan / SUV" },
  { value: "exotic", label: "Exotic / Supercar" },
  { value: "classic", label: "Classic / Vintage" },
  { value: "collector", label: "Collector Vehicle" },
  { value: "fleet", label: "Multiple Vehicles / Fleet" },
]

const FALLBACK_VEHICLE_VALUES = [
  { value: "100k-250k", label: "$100K - $250K" },
  { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-2m", label: "$1M - $2M" },
  { value: "2m+", label: "$2M+" },
]

const FALLBACK_USAGE_TYPES = [
  { value: "personal", label: "Personal Use Only" },
  { value: "occasional", label: "Occasional / Weekend" },
  { value: "show", label: "Show / Display Only" },
  { value: "track", label: "Track Days Included" },
]

const FALLBACK_STORAGE_TYPES = [
  { value: "private-garage", label: "Private Garage" },
  { value: "climate-controlled", label: "Climate-Controlled Storage" },
  { value: "secure-facility", label: "Secure Storage Facility" },
  { value: "outdoor", label: "Outdoor / Driveway" },
]

const FALLBACK_PROVINCES = [
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

const FALLBACK_CONTACT_METHODS = [
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" },
  { value: "both", label: "Either" },
]

const FALLBACK_TIMEFRAMES = [
  { value: "immediate", label: "Immediate - Within 1 week" },
  { value: "1-3months", label: "1-3 Months" },
  { value: "3-6months", label: "3-6 Months" },
  { value: "exploring", label: "Just Exploring Options" },
]
