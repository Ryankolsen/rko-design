import { describe, expect, it } from 'vitest'
import { projects } from './projects'

describe('projects', () => {
  it('has exactly 3 entries', () => {
    expect(projects.length).toBe(3)
  })

  it('has required non-empty fields on every entry', () => {
    for (const project of projects) {
      expect(project.href).toBeTruthy()
      expect(project.navLabel).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.imageSrc).toBeTruthy()
      expect(project.imageAlt).toBeTruthy()
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.storeLinks)).toBe(true)
    }
  })

  it('has the expected route/href values', () => {
    const hrefs = projects.map((project) => project.href).sort()
    expect(hrefs).toEqual(['/bourbon-dojo', '/panda-jump', '/wizard-kittenz'])
  })

  it('has unique href values', () => {
    const hrefs = projects.map((project) => project.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('has unique title values', () => {
    const titles = projects.map((project) => project.title)
    expect(new Set(titles).size).toBe(titles.length)
  })
})
