import { authenticated } from '../../access/authenticated'
import type { CollectionConfig } from 'payload'
import { brokerAlertHtml } from '../../blocks/QuoteForm/emails/brokerAlert'
import { clientConfirmationHtml } from '../../blocks/QuoteForm/emails/clientConfirmation'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: {
    singular: 'Quote Request',
    plural: 'Quote Requests',
  },
  access: {
    create: () => true,   // public — frontend can POST without auth
    read: authenticated,  // admin only
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'status', 'assignedBroker', 'createdAt'],
    group: 'Submissions',
    listSearchableFields: ['email', 'firstName', 'lastName', 'phone'],
  },
  hooks: {
    beforeOperation: [
      async ({ operation, args, req }) => {
        if (operation !== 'create') return

        const ip =
          req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

        // Attach IP to the incoming data
        args.data.submitterIp = ip

        // Count recent submissions from same IP
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
        const recent = await req.payload.find({
          collection: 'quote-requests',
          where: {
            and: [
              { submitterIp: { equals: ip } },
              { createdAt: { greater_than: tenMinutesAgo } },
            ],
          },
          limit: 0, // count only
        })

        if (recent.totalDocs >= 3) {
          throw new Error('Too many requests. Please wait before submitting again.')
        }
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (
          operation === 'update' &&
          previousDoc?.status &&
          doc.status !== previousDoc.status
        ) {
          await req.payload.update({
            collection: 'quote-requests',
            id: doc.id,
            data: {
              statusHistory: [
                ...(doc.statusHistory ?? []),
                {
                  from: previousDoc.status,
                  to: doc.status,
                  changedAt: new Date().toISOString(),
                },
              ],
            },
          })
        }
      },
    ],
    afterOperation: [
      async ({ operation, result, req }) => {
        if (operation !== 'create') return

        const brokerageEmail = process.env.BROKERAGE_ALERT_EMAIL
        const brokerageName  = process.env.BROKERAGE_NAME ?? 'Our Team'

        if (!brokerageEmail) {
          console.warn('BROKERAGE_ALERT_EMAIL not set — skipping email notifications.')
          return
        }

        // Broker alert
        await req.payload.sendEmail({
          to: brokerageEmail,
          subject: `New Quote Request — ${result.firstName} ${result.lastName}`,
          html: brokerAlertHtml({ ...result, docId: result.id }),
        })

        // Client confirmation
        if (result.email) {
          await req.payload.sendEmail({
            to: result.email,
            subject: 'Your Quote Request Has Been Received',
            html: clientConfirmationHtml({
              firstName: result.firstName,
              docId: result.id,
              brokerageEmail,
              brokerageName,
            }),
          })
        }
      },
    ],
  },
  fields: [
    // ── Hidden Fields ──────────────────────────────────────────────
    {
      name: 'submitterIp',
      type: 'text',
      admin: { hidden: true },
    },
    // ── Operations ────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'new',
      options: [
        { value: 'new',        label: 'New' },
        { value: 'reviewing',  label: 'Under Review' },
        { value: 'contacted',  label: 'Contacted' },
        { value: 'quoted',     label: 'Quote Sent' },
        { value: 'closed-won', label: 'Closed — Won' },
        { value: 'closed-lost',label: 'Closed — Lost' },
      ],
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'assignedBroker',
      type: 'relationship',
      relationTo: 'users',
      label: 'Assigned Broker',
      hasMany: false,
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Internal Notes',
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        description: 'Not visible to the client.',
      },
    },
    {
      name: 'followUpDate',
      type: 'date',
      label: 'Follow-Up Date',
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'statusHistory',
      type: 'array',
      label: 'Status History',
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        readOnly: true,
        description: 'Automatically recorded on status changes.',
      },
      fields: [
        { name: 'from',      type: 'text' },
        { name: 'to',        type: 'text' },
        { name: 'changedAt', type: 'date' },
      ],
    },
    // ── Personal info ─────────────────────────────────────────────
    { name: 'firstName',  type: 'text', required: true },
    { name: 'lastName',   type: 'text', required: true },
    { name: 'email',      type: 'email', required: true },
    { name: 'phone',      type: 'text', required: true },
    { name: 'province',   type: 'text' },
    { name: 'preferredContact', type: 'text' },
    { name: 'timeframe',  type: 'text' },
    { name: 'additionalNotes', type: 'textarea' },
    // ── Coverage ──────────────────────────────────────────────────
    {
      name: 'selectedCoverages',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },
    // ── Assets ───────────────────────────────────────────────────
    {
      name: 'assets',
      type: 'array',
      fields: [
        { name: 'assetId',   type: 'text' },
        { name: 'assetType', type: 'text' },
        {
          name: 'details',
          type: 'array',
          fields: [
            { name: 'key',   type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
      ],
    },
  ],
}
