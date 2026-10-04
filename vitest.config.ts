import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    // Exclude nested git worktrees (used by delegate-work style parallel
    // agent runs) so their test files aren't picked up as part of this repo's
    // own suite.
    exclude: [...configDefaults.exclude, '**/.claude/worktrees/**'],
  },
})
