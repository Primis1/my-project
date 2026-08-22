"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Share2, 
  Download, 
  Phone, 
  Mail, 
  Check, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface BusinessCardProps {
  pdfUrl?: string
  title?: string
  subtitle?: string
  name?: string
  role?: string
  tagline?: string
  license?: string
  phone?: string
  email?: string
  shareBtnText?: string
  downloadBtnText?: string
  locale?: 'uk' | 'en'
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  pdfUrl,
  title,
  subtitle,
  name,
  role,
  tagline,
  license,
  phone = '+1 (416) 555-0199',
  email = 'oleh@example.com',
  shareBtnText,
  downloadBtnText,
  locale = 'uk'
}) => {
  const [copied, setCopied] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  const isEn = locale === 'en'

  const t = isEn ? {
    title: 'Digital Business Card',
    subtitle: 'Oleh Babinskyi — Licensed Insurance Broker in Ontario',
    name: 'Oleh Babinskyi',
    role: 'Licensed Insurance Broker',
    tagline: 'Official Contact Profile',
    license: 'RIBO Licensed',
    shareBtnText: 'Share Business Card',
    downloadBtnText: 'Download PDF Card',
    saveContactText: 'Save Contact',
    copiedText: 'Link Copied!',
    shareSuccessText: 'Successfully Shared!',
    copiedShortText: 'Copied!',
    footerNote: '*Tap "Share" to send via Telegram, WhatsApp, iMessage, or SMS.'
  } : {
    title: 'Цифрова візитка брокера',
    subtitle: 'Олег Бабінський — Ліцензований страховий брокер в Онтаріо',
    name: 'Олег Бабінський',
    role: 'Страховий брокер / Фахівець',
    tagline: 'Офіційний контактний профіль',
    license: 'RIBO Ліцензія',
    shareBtnText: 'Поділитися візиткою',
    downloadBtnText: 'Завантажити PDF візитку',
    saveContactText: 'Зберегти контакти',
    copiedText: 'Посилання скопійовано!',
    shareSuccessText: 'Успішно поширено!',
    copiedShortText: 'Скопійовано!',
    footerNote: '*Натисніть «Поділитися» для відправки через Telegram, Viber, WhatsApp або SMS.'
  }

  const finalTitle = title || t.title
  const finalSubtitle = subtitle || t.subtitle
  const finalName = name || t.name
  const finalRole = role || t.role
  const finalTagline = tagline || t.tagline
  const finalLicense = license || t.license
  const finalShareBtnText = shareBtnText || t.shareBtnText
  const finalDownloadBtnText = downloadBtnText || t.downloadBtnText

  // Target PDF link or fallback to current page URL
  const targetUrl = pdfUrl || (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = async () => {
    const shareData = {
      title: finalTitle,
      text: finalSubtitle,
      url: targetUrl || window.location.href,
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard()
        }
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl || window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
    }
  }

  // Derive initials from finalName
  const initialsParts = finalName.trim().split(' ')
  const derivedInitials = initialsParts.length > 1 
    ? `${initialsParts[0][0]}${initialsParts[initialsParts.length - 1][0]}`.toUpperCase()
    : finalName.slice(0, 2).toUpperCase()

  return (
    <div className="w-full max-w-4xl mx-auto relative group my-12" id="business-card-section">
      {/* Ambient Glowing Orbs */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative bg-gradient-to-br from-card/95 via-card/80 to-card/60 backdrop-blur-xl border border-primary/25 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 overflow-hidden">
        
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

        {/* Card Header & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-inner">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{finalTitle}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {finalTagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{finalLicense}</span>
            </span>
          </div>
        </div>

        {/* Card Body: Profile Info & Avatar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Avatar & Badge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-3 p-4 bg-background/50 rounded-2xl border border-border/40">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-black shadow-xl tracking-tighter">
                {derivedInitials}
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-success border-2 border-background flex items-center justify-center text-[10px] text-white font-bold" title="Verified Broker">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">{finalName}</h4>
              <p className="text-xs font-medium text-primary">{finalRole}</p>
            </div>
          </div>

          {/* Contact Details & Subtitle */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {finalName}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                {finalSubtitle}
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 hover:bg-background border border-border/80 text-xs sm:text-sm font-semibold text-foreground transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{phone}</span>
              </a>
              <a 
                href={`mailto:${email}`} 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 hover:bg-background border border-border/80 text-xs sm:text-sm font-semibold text-foreground transition-all shadow-sm"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Action Controls: Share & Download PDF */}
        <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-3">
            
            {/* Native Mobile Share Button */}
            <Button
              onClick={handleShare}
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 text-sm font-bold shadow-md gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.copiedText}</span>
                </>
              ) : shareSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.shareSuccessText}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{finalShareBtnText}</span>
                </>
              )}
            </Button>

            {/* Download PDF Button */}
            {pdfUrl ? (
              <a 
                href={pdfUrl} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold gap-2 border-primary/40 hover:bg-primary/10"
                >
                  <Download className="w-4 h-4 text-primary" />
                  <span>{finalDownloadBtnText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </a>
            ) : (
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold gap-2 border-border/80"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>{copied ? t.copiedShortText : t.saveContactText}</span>
              </Button>
            )}

          </div>

          <p className="text-xs text-muted-foreground text-center sm:text-right">
            {t.footerNote}
          </p>

        </div>

      </div>
    </div>
  )
}
