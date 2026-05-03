import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })
  
  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'personal-lines' } }
  })
  
  if (existingPage.docs.length > 0) {
    console.log('Personal Lines page already exists!')
    process.exit(0)
  }
  
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Personal Lines',
      slug: 'personal-lines',
      template: 'personal-lines',
      _status: 'published'
    } as any // bypass strict typing for dynamic template field
  })
  
  console.log('Successfully created Personal Lines page!')
  process.exit(0)
}

seed().catch(console.error)
