import type { GlobalConfig } from 'payload'

const optionField = (name: string, label: string, defaultValue? : { value: string, label: string }[]) => ({
  name,
  type: 'array' as const,
  label,
  defaultValue,
  fields: [
    { name: 'value', type: 'text' as const, required: true },
    { name: 'label', type: 'text' as const, required: true },
  ],
})

export const QuoteFormOptions: GlobalConfig = {
  slug: 'quoteFormOptions',
  label: 'Quote Form Options',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      name: 'coverageTypes',
      type: 'array',
      label: 'Coverage Types (Step 1)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { value: 'Home', label: 'Home' },
            { value: 'Car', label: 'Car' },
            { value: 'Building2', label: 'Building' },
            { value: 'Ship', label: 'Ship' },
            { value: 'Gem', label: 'Gem' },
            { value: 'Shield', label: 'Shield' },
          ],
          defaultValue: 'Shield',
        },
      ],
      defaultValue: [
        { value: 'homeowners', label: 'High-Value Homeowners', icon: 'Home' },
        { value: 'auto', label: 'Luxury Auto & Collection', icon: 'Car' },
        { value: 'commercial', label: 'Commercial Property', icon: 'Building2' },
        { value: 'watercraft', label: 'Watercraft & Aviation', icon: 'Ship' },
        { value: 'valuables', label: 'Jewellery & Valuables', icon: 'Gem' },
        { value: 'umbrella', label: 'Excess Liability / Umbrella', icon: 'Shield' },
      ],
    },
    optionField('propertyValueRanges', 'Property Value Ranges', [
      { value: '2m-5m', label: '$2M - $5M' },
      { value: '5m-10m', label: '$5M - $10M' },
      { value: '10m-25m', label: '$10M - $25M' },
      { value: '25m-50m', label: '$25M - $50M' },
      { value: '50m+', label: '$50M+' },
    ]),
    optionField('propertyTypes', 'Property Types', [
      { value: 'primary', label: 'Primary Residence' },
      { value: 'secondary', label: 'Secondary / Vacation Home' },
      { value: 'investment', label: 'Investment Property' },
      { value: 'commercial', label: 'Commercial Building' },
      { value: 'mixed', label: 'Mixed-Use Property' },
    ]),
    optionField('constructionTypes', 'Construction Types', [
      { value: 'standard', label: 'Standard Construction' },
      { value: 'custom', label: 'Custom / Architectural' },
      { value: 'heritage', label: 'Heritage / Historical' },
      { value: 'modern', label: 'Modern / Contemporary' },
    ]),
    optionField('securitySystems', 'Security Systems', [
      { value: 'none', label: 'None' },
      { value: 'basic', label: 'Basic Alarm System' },
      { value: 'monitored', label: '24/7 Monitored System' },
      { value: 'comprehensive', label: 'Comprehensive (Cameras, Motion, etc.)' },
      { value: 'staffed', label: 'On-site Security Personnel' },
    ]),
    optionField('vehicleTypes', 'Vehicle Types', [
      { value: 'luxury', label: 'Luxury Sedan / SUV' },
      { value: 'exotic', label: 'Exotic / Supercar' },
      { value: 'classic', label: 'Classic / Vintage' },
      { value: 'collector', label: 'Collector Vehicle' },
      { value: 'fleet', label: 'Multiple Vehicles / Fleet' },
    ]),
    optionField('vehicleValues', 'Vehicle Values', [
      { value: '100k-250k', label: '$100K - $250K' },
      { value: '250k-500k', label: '$250K - $500K' },
      { value: '500k-1m', label: '$500K - $1M' },
      { value: '1m-2m', label: '$1M - $2M' },
      { value: '2m+', label: '$2M+' },
    ]),
    optionField('usageTypes', 'Vehicle Usage Types', [
      { value: 'personal', label: 'Personal Use Only' },
      { value: 'occasional', label: 'Occasional / Weekend' },
      { value: 'show', label: 'Show / Display Only' },
      { value: 'track', label: 'Track Days Included' },
    ]),
    optionField('storageTypes', 'Vehicle Storage Types', [
      { value: 'private-garage', label: 'Private Garage' },
      { value: 'climate-controlled', label: 'Climate-Controlled Storage' },
      { value: 'secure-facility', label: 'Secure Storage Facility' },
      { value: 'outdoor', label: 'Outdoor / Driveway' },
    ]),
    optionField('provinces', 'Provinces', [
      { value: 'ON', label: 'Ontario' },
      { value: 'BC', label: 'British Columbia' },
      { value: 'AB', label: 'Alberta' },
      { value: 'QC', label: 'Quebec' },
      { value: 'MB', label: 'Manitoba' },
      { value: 'SK', label: 'Saskatchewan' },
      { value: 'NS', label: 'Nova Scotia' },
      { value: 'NB', label: 'New Brunswick' },
      { value: 'NL', label: 'Newfoundland and Labrador' },
      { value: 'PE', label: 'Prince Edward Island' },
    ]),
    optionField('preferredContactMethods', 'Preferred Contact Methods', [
      { value: 'phone', label: 'Phone Call' },
      { value: 'email', label: 'Email' },
      { value: 'both', label: 'Either' },
    ]),
    optionField('timeframes', 'Coverage Timeframes', [
      { value: 'immediate', label: 'Immediate - Within 1 week' },
      { value: '1-3months', label: '1-3 Months' },
      { value: '3-6months', label: '3-6 Months' },
      { value: 'exploring', label: 'Just Exploring Options' },
    ]),
  ],
}
