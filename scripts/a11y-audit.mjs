// Real-browser axe audit: every route at desktop and phone widths, with
// color-contrast on (the jsdom suite in src/a11y can't check contrast).
//
//   npm run audit:a11y                          builds, previews, audits
//   BASE=https://… npm run audit:a11y           audits a deployed site instead
//
// Exits 1 on any violation. Contrast items axe can't decide (gradients,
// images, pseudo-elements) are listed as "incomplete" for manual review.
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'
import { build, preview } from 'vite'

const ROUTES = [
  '/',
  '/bourbon-dojo',
  '/bourbon-dojo/privacy',
  '/panda-jump',
  '/panda-jump/privacy',
  '/wizard-kittenz',
  '/wizard-kittenz/privacy',
]
const VIEWPORTS = [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa', 'best-practice']

let server
let base = process.env.BASE
if (!base) {
  await build({ logLevel: 'warn' })
  server = await preview({ preview: { port: 4173 }, logLevel: 'warn' })
  base = server.resolvedUrls.local[0]
}
base = base.replace(/\/$/, '')

// The installed Chrome, so no Playwright browser download is needed.
const browser = await chromium.launch({ channel: 'chrome' })
let violations = 0
try {
  for (const viewport of VIEWPORTS) {
    const page = await (await browser.newContext({ viewport })).newPage()
    for (const route of ROUTES) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500) // let fonts and entrance animations settle
      const result = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      violations += result.violations.length

      console.log(`${viewport.width}×${viewport.height} ${route}: ${result.violations.length} violations`)
      for (const v of result.violations) {
        for (const node of v.nodes) {
          console.log(`  ✗ [${v.impact}] ${v.id}: ${node.target.join(' ')}`)
          console.log(`    ${node.failureSummary.replace(/\n/g, ' ')}`)
        }
      }
      for (const v of result.incomplete.filter((i) => i.id === 'color-contrast')) {
        for (const node of v.nodes) {
          const data = node.any[0]?.data ?? {}
          const ratio = data.contrastRatio ? ` ${data.contrastRatio}:1 (${data.fgColor} on ${data.bgColor})` : ''
          console.log(`  ? contrast incomplete: ${node.target.join(' ')} — ${data.messageKey ?? 'unknown'}${ratio}`)
        }
      }
    }
  }
} finally {
  await browser.close()
  await server?.close()
}

console.log(violations === 0 ? '\nPASS: zero violations' : `\nFAIL: ${violations} violated rules`)
process.exit(violations === 0 ? 0 : 1)
