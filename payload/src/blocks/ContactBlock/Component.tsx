"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import type { ContactBlockType } from "@/payload-types"

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

export const ContactBlock: React.FC<ContactBlockType> = ({
  eyebrow,
  title,
  titleHighlight,
  description,
  contactInfo,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const parts = formState.name.trim().split(" ")
      const firstName = parts[0]
      const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "Unknown"

      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formState.email,
          phone: formState.phone,
          selectedCoverages: formState.service ? [{ value: formState.service }] : [],
          additionalNotes: formState.message,
          status: "new",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setSuccess(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            {title}{" "}
            {titleHighlight && (
              <span className="font-serif italic">{titleHighlight}</span>
            )}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-gray-50/50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">Send Us a Message</h3>

            {success ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-bold mb-2">Message Sent Successfully!</h4>
                <p className="text-sm">Thank you for reaching out. One of our advisors will be in touch shortly.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setSuccess(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs font-medium text-foreground mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full h-9 px-3 rounded-md border border-input bg-white text-sm"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="home">Home Insurance</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="business">Business Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="health">Health Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your insurance needs..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-white text-sm resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1d4ed8] text-white hover:bg-blue-700 rounded-full py-3 text-sm font-semibold shadow-md"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactInfo && contactInfo.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] || MapPin
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-1">{item.title}</div>
                      {item.details && item.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">{detail.text}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
