import React from 'react'
import { Building2, Handshake, Shield, CheckCircle } from 'lucide-react'

const iconMap = {
  Building2,
  Handshake,
  Shield,
}

export function DetailedCta({
  benefitsTitle,
  benefitsDescription,
  benefits,
}: any) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Benefits Banner */}
        <div className="bg-gradient-to-br from-[#1d4ed8] to-blue-700 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {benefitsTitle && (
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {benefitsTitle}
                </h3>
              )}
              {benefitsDescription && (
                <p className="text-white/80 text-sm leading-relaxed">
                  {benefitsDescription}
                </p>
              )}
            </div>

            {benefits && benefits.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefitItem: any, bIdx: number) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <CheckCircle
                      className="w-4 h-4 text-white/80 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-white/90 text-xs">{benefitItem.benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
