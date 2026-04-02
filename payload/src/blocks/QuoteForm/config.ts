import type { Block } from 'payload'

export const QuoteFormBlock: Block = {
  slug: 'quoteForm',
  interfaceName: 'QuoteFormBlock',
  labels: {
    singular: 'Quote Form',
    plural: 'Quote Forms',
  },
  fields: [
    // ── Section header copy ──────────────────────────────────────
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Risk Assessment',
      admin: {
        description: 'Small uppercase label above the heading (e.g. "Risk Assessment")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Request a Quote',
      required: true,
    },
    {
      name: 'headingAccent',
      type: 'text',
      label: 'Heading Accent (italic gold word)',
      defaultValue: 'Quote',
      admin: {
        description: 'This word inside the heading will render in italic gold. Must be a substring of Heading.',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue:
        'Complete this form to receive a personalized coverage assessment from our senior brokers.',
    },
    // ── Step 1 ───────────────────────────────────────────────────
    {
      name: 'step1Heading',
      type: 'text',
      label: 'Step 1 — Section Heading',
      defaultValue: 'What would you like to protect?',
    },
    {
      name: 'step1Subheading',
      type: 'text',
      label: 'Step 1 — Section Subheading',
      defaultValue:
        'Select all coverage types that apply. You can add multiple assets of each type.',
    },
    // ── Step 2 ───────────────────────────────────────────────────
    {
      name: 'step2Heading',
      type: 'text',
      label: 'Step 2 — Section Heading',
      defaultValue: 'Asset Details',
    },
    // ── Step 3 ───────────────────────────────────────────────────
    {
      name: 'step3Heading',
      type: 'text',
      label: 'Step 3 — Section Heading',
      defaultValue: 'Your Information',
    },
    {
      name: 'step3Subheading',
      type: 'text',
      label: 'Step 3 — Section Subheading',
      defaultValue: 'All information is treated with the strictest confidence.',
    },
    // ── Step 4 ───────────────────────────────────────────────────
    {
      name: 'step4Heading',
      type: 'text',
      label: 'Step 4 — Section Heading',
      defaultValue: 'Review Your Request',
    },
    {
      name: 'step4Subheading',
      type: 'text',
      label: 'Step 4 — Section Subheading',
      defaultValue: 'Please review your information before submitting.',
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Submit Quote Request',
    },
    // ── Success state ────────────────────────────────────────────
    {
      name: 'successHeading',
      type: 'text',
      label: 'Success Screen — Heading',
      defaultValue: 'Quote Request Received',
    },
    {
      name: 'successHeadingAccent',
      type: 'text',
      label: 'Success Screen — Heading Accent',
      defaultValue: 'Received',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      label: 'Success Screen — Body Message',
      defaultValue:
        'Thank you for your inquiry. A member of our P&C practice team will review your information and contact you within one business day to discuss your coverage needs.',
    },
    // ── Footer trust line ────────────────────────────────────────
    {
      name: 'trustLine',
      type: 'text',
      label: 'Footer Trust Indicator Text',
      defaultValue: 'RIBO Licensed | Your information is secure and confidential',
      admin: {
        description: 'Text shown beneath the form. The portion before "|" renders in gold. Supports multiple pipes.',
      },
    },
  ],
}
