import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { getCategories } from '../lib/cms'

// Read the Next.js build ID from '.next/BUILD_ID
// This is configured in `layer0.config.js` to be included in the build/deploy
const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID')

export default async function getPrerenderRequests() {
  const { categories } = await getCategories()
  const requests = categories.map(c => ({ path: c.href }))

  categories.forEach(c => {
    requests.push(...c.items.map(p => ({ path: p.href })))
  })

  if (existsSync(buildIdPath)) {
    const buildId = readFileSync(buildIdPath, 'utf8')
    const apiPaths = requests
      .map(req => {
        let path = req.path.replace(/^\/|\/$/, '')
        const [, name] = path.split('/') // value of the `name` query param

        path = `/_next/data/${buildId}/${path}.json`

        return [{ path }, { path: `${path}?name=${name}` }]
      })
      .flat()
    requests.push(...apiPaths)
  }

  return requests
}
