interface BrokerAlertData {
  firstName: string
  lastName: string
  email: string
  phone: string
  province: string
  selectedCoverages: { value: string }[]
  assets: { assetType: string; details: { key: string; value: string }[] }[]
  docId: string | number
}

export function brokerAlertHtml(data: BrokerAlertData): string {
  const coverageList = data.selectedCoverages.map((c) => `<li>${c.value}</li>`).join('')
  const assetList = data.assets
    .map((a) => {
      const details = a.details.map((d) => `${d.key}: ${d.value}`).join(', ')
      return `<li>${a.assetType} — ${details || 'No details provided'}</li>`
    })
    .join('')

  return `
    <h2>New Quote Request #${data.docId}</h2>
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Province:</strong> ${data.province}</p>
    <h3>Coverage Types</h3><ul>${coverageList}</ul>
    <h3>Assets</h3><ul>${assetList}</ul>
    <p><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/quote-requests/${data.docId}">
      View in Admin →
    </a></p>
  `
}
