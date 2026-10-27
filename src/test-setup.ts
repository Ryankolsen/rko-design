import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend(axeMatchers)

declare module 'vitest' {
  interface Matchers<R, T> extends AxeMatchers {}
}
