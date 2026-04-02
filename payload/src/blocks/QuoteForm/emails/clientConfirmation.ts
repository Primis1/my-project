interface ClientConfirmationData {
  firstName: string
  docId: string | number
  brokerageEmail: string
  brokerageName: string
}

export function clientConfirmationHtml(data: ClientConfirmationData): string {
  return `
    <h2>Thank you, ${data.firstName}.</h2>
    <p>Your quote request has been received (Reference: #${String(data.docId).toUpperCase()}).</p>
    <p>A member of our team will be in touch within one business day.</p>
    <p>If you have any immediate questions, contact us at
      <a href="mailto:${data.brokerageEmail}">${data.brokerageEmail}</a>.
    </p>
    <p>— ${data.brokerageName}</p>
  `
}
