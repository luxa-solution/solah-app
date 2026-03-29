# Test Strategy And TDD Rollout Plan

## Goal

Establish a repo-wide testing strategy with a strict TDD workflow and enforce Jest coverage gates, with especially high coverage for:

- components
- hooks
- utils
- stores

This repo already uses `jest` + `jest-expo` and has a partial test suite. The plan below is designed to harden that setup rather than replace it.

## Fast Failure Principle

The test strategy should detect breakage as close as possible to the change that caused it.

That means every code change should be protected by three feedback loops:

1. Immediate local loop
2. Changed-scope validation loop
3. Full CI coverage loop

Expected behavior:

- if a developer breaks a nearby behavior, the nearest test should fail immediately
- if a developer changes a shared component, hook, util, or store, changed-scope checks should fail before merge
- if a wider regression slips past local checks, the full CI suite should still block the branch

Decision rule:

- if a test breaks because the code is wrong, fix the code
- if a test breaks because behavior intentionally changed, update the test first and then the code through TDD
- do not merge with knowingly broken tests

## Current Baseline

- Jest is already configured in `jest.config.js`.
- Existing scripts:
  - `npm test`
  - `npm run test:cov`
  - `npm run test:ci`
  - `npm run test:prepush`
- Coverage collection is already enabled through `collectCoverageFrom`.
- Current source inventory under `src`:
  - ~101 tracked source files across utils, hooks, store, and components
  - 35 test files written as of the last audit
- A quality audit of all 35 test files found the following distribution:
  - Good (meets branch and behavior expectations): 22 files
  - Partial (happy path covered, key branches missing): 9 files
  - Thin (smoke test only, little behavioral value): 3 files
  - Broken (references missing or misnamed source file): 1 file
- Having a test file is not the same as having good coverage. The backlog below tracks quality tier, not just existence.

## Guiding TDD Rules

Every new feature or bug fix should follow this cycle:

1. Write or update the failing test first.
2. Run the smallest relevant Jest scope locally.
3. Implement the minimum production change to make the test pass.
4. Refactor while keeping tests green.
5. Run the related coverage command before merging.

Rules to enforce in practice:

- No production change without a test in the same branch unless the change is purely mechanical.
- Bug fixes require a regression test first.
- Shared UI primitives, hooks, and pure utilities should be treated as coverage-critical code.
- Prefer behavior tests over implementation-detail tests.
- Prefer narrow mocks and deterministic data over full tree mocks.

## Scope Layers

The suite should be built in four layers.

### 1. Unit Tests

Best fit for:

- utils
- hooks with isolated dependency mocking
- store selectors and store actions
- pure mapping or formatting logic

Expected style:

- no network
- no timers unless explicitly controlled
- deterministic input/output assertions

### 2. Component Tests

Best fit for:

- presentational components
- feature components with user interactions
- rendering branches based on props, store state, and navigation state

Expected style:

- use `@testing-library/react-native`
- assert visible behavior, text, accessibility labels, disabled states, and callbacks
- avoid snapshot-only tests except for stable layout contracts

### 3. Screen / Feature Integration Tests

Best fit for:

- screen containers
- router-aware flows
- store + component interactions
- feature modules where multiple child components work together

Expected style:

- keep mocks at the API/native boundary
- do not mock the component under test
- verify user-visible state transitions

### 4. App-Shell Smoke Tests

Best fit for:

- providers
- route entry points
- critical startup branches

Expected style:

- minimal count
- high-value only
- confirm app shell does not regress on boot-level wiring

## Priority Order

### Priority 1: Utils

Reason:

- fastest to cover
- easiest to stabilize
- ideal for TDD habit formation
- should reach near-complete branch coverage

Targets:

- formatting helpers
- time helpers
- qibla math
- notification scheduling helpers
- settings conversion helpers
- responsive dimension helpers

### Priority 2: Hooks

Reason:

- medium complexity
- high behavior value
- often hide edge cases in timers, permissions, sensors, location, and derived state

Targets:

- location hooks
- qibla hooks
- date/time hooks
- settings hooks
- home rotation hooks

### Priority 3: Components

Reason:

- largest volume in repo
- many are reusable UI units and should have strong interaction coverage
- best return after utils/hooks are stable

Targets:

- shared components
- settings pickers and sheets
- solah feature components
- guide components
- remaining adhkar components

### Priority 4: Stores And Screen Integration

Reason:

- stores hold important business behavior and should be covered almost as strictly as hooks and utils
- screen integration has broader surface area and more wiring
- both are best added after lower-level confidence is strong

Targets:

- store mutation coverage
- store initialization and reset behavior
- store persistence-related behavior
- screen behavior branches
- navigation boundary contracts

## Coverage Policy

Coverage must be enforced in Jest with two levels:

1. Global thresholds for the repo
2. Much stricter thresholds for components, hooks, utils, and stores

Recommended phased thresholds:

### Phase 1: Introduce Gates Without Freezing Delivery

Global threshold:

- branches: 70
- functions: 75
- lines: 78
- statements: 78

Critical paths threshold:

- `src/**/utils/**`
  - branches: 95
  - functions: 100
  - lines: 98
  - statements: 98
- `src/**/hooks/**`
  - branches: 90
  - functions: 95
  - lines: 95
  - statements: 95
- `src/**/components/**`
  - branches: 85
  - functions: 90
  - lines: 90
  - statements: 90
- `src/**/store/**`
  - branches: 90
  - functions: 95
  - lines: 95
  - statements: 95

### Phase 2: Raise Global Coverage After Backlog Burn-Down

Global threshold:

- branches: 80
- functions: 85
- lines: 88
- statements: 88

Critical paths threshold:

- `src/**/utils/**`
  - branches: 98
  - functions: 100
  - lines: 100
  - statements: 100
- `src/**/hooks/**`
  - branches: 95
  - functions: 100
  - lines: 98
  - statements: 98
- `src/**/components/**`
  - branches: 90
  - functions: 95
  - lines: 95
  - statements: 95
- `src/**/store/**`
  - branches: 95
  - functions: 100
  - lines: 98
  - statements: 98

Notes:

- Utils should be held to the strictest standard because they are mostly deterministic.
- Hooks should have very high coverage, especially for branch and effect behavior.
- Components should have very high line/function coverage, but branch coverage may lag slightly where native behavior requires heavy mocking.
- Stores should be treated as critical business logic and held near hook-level strictness.

## Jest Setup Changes To Plan

The following updates should be applied to `jest.config.js` as part of execution, not in this planning-only step.

### 1. Enforce Coverage Thresholds

Add `coverageThreshold` with:

- `global`
- path-specific thresholds for `src/**/components/**`
- path-specific thresholds for `src/**/hooks/**`
- path-specific thresholds for `src/**/utils/**`
- path-specific thresholds for `src/**/store/**`

If Jest path-glob threshold behavior becomes awkward, split config into named Jest projects or use directory-specific CI commands as a fallback. The preferred first attempt is a single Jest config with path-based thresholds.

### 2. Tighten Coverage Collection

Keep `collectCoverageFrom`, but review exclusions.

Current exclusions to revisit:

- `!src/**/index.{js,jsx,ts,tsx}`
- `!src/**/constants.ts`
- `!src/**/types.ts`

Plan:

- keep barrel `index` files excluded
- keep pure type-only files excluded
- do not broadly exclude constants if they contain executable mapping logic
- ensure stores, screens, providers, and route entry points are either explicitly included or intentionally excluded with justification

### 3. Improve Test Matching Consistency

Standardize on:

- `*.test.ts`
- `*.test.tsx`

Remove all use of `spec` if already used and replace with any of the two above, we do not want any naming variance.

### 4. Add Stable Test Utilities

Create shared helpers for:

- rendering with providers
- mocking router navigation
- mocking Expo location, sensors, haptics, notifications, fonts, and async storage
- controlled fake timers
- shared fixture builders

This reduces repeated mock boilerplate and makes TDD faster.

### 5. Add Coverage Outputs For CI

Retain:

- text
- json-summary
- lcov

### 6. Add Fast-Feedback Scripts

Add scripts that fail quickly on nearby breakage:

- `test:watch`
- `test:changed`
- `test:related`

Recommended behavior:

- `test:watch`: developer loop while writing tests first
- `test:changed`: quick validation for modified files before push
- `test:related`: run tests related to a changed source file or set of files

Suggested commands:

- `jest --watch`
- `jest --onlyChanged`
- `jest --findRelatedTests`


## Proposed Supporting Setup Work

Before broad test authoring starts, complete these setup tasks:

1. Create a `test` utilities area, for example `src/shared/test` or `test-utils`.
2. Add a custom `render` wrapper for providers and shared mocks.
3. Add fixture factories for feature data with sensible defaults.
4. Add mock modules for native Expo APIs used across the repo.
5. Add a short testing guide to the repo docs or README.
6. Add lint guidance or review checklist requiring tests for feature changes.

Recommended helper modules:

- `renderWithProviders`
- `createMockNavigation`
- `mockExpoLocation`
- `mockExpoSensors`
- `mockNotifications`
- `advanceFakeTime`
- feature-specific fixtures for adhkar, solah times, and settings state, these can be in feaures/*/test or anything you recommend. 

## Breakage Detection Strategy

To detect regressions almost immediately, use this enforcement model:

### Layer 1: Near-Test Requirement

Every component, hook, util, and store should have tests close to the source file so a local change naturally triggers the relevant test run.

Required expectation:

- changed code in these folders should almost always have a corresponding nearby `*.test.ts` or `*.test.tsx`

### Layer 2: Fast Local Commands

Developers should use:

- focused file watch runs while implementing
- related-test runs before finishing a change
- changed-test runs before push

This is the fastest path to catching breakage before CI.

### Layer 3: Pre-Push Guard

The current `test:prepush` script already runs changed tests against `origin/main`. Keep that pattern, but make it part of the required workflow.

### Layer 4: Full CI Gate

CI remains the final protection layer:

- full suite
- full coverage
- threshold enforcement

This prevents hidden regressions in shared behavior from being merged.

## Test Backlog By Area

Each entry is tagged with its current quality tier: **[Good]**, **[Partial]**, **[Thin]**, **[Broken]**, or **[None]** (no test exists yet).

### Shared

- `src/shared/components/Providers.tsx` — **[None]**
- `src/shared/components/ProgressBar.tsx` — **[None]**
- `src/shared/components/TitleBar.tsx` — **[None]**
- `src/shared/components/BottomSheet.tsx` — **[Thin]** — add gesture, snap, animation, keyboard, and safe area coverage
- `src/shared/components/Button.tsx` — **[Good]** — missing variant, icon, fullWidth, and opacity branch coverage; consider raising to Good+
- `src/shared/utils/responsive-dimensions.ts` — **[None]**

### Home

- `src/features/home/hooks/useAdhkarAutoRotation.ts` — **[None]**
- `src/features/home/components/AdhkarCard.tsx` — **[None]**
- `src/features/home/components/PrayerGuideCard.tsx` — **[Thin]** — add title, subtitle, illustration, and card layout assertions
- `src/features/home/components/PrayerTimesCard.tsx` — **[None]**
- `src/features/home/components/TitleBar.tsx` — **[Partial]** — add title text, logo, qibla icon, and layout assertions
- `src/features/home/screens/HomeScreen.tsx` — **[None]**

### Solah

- `src/features/solah/hooks/useCurrentLocation.ts` — **[None]**
- `src/features/solah/hooks/useDateAndTime.ts` — **[None]**
- `src/features/solah/hooks/useSolahTimes.ts` — **[None]**
- `src/features/solah/hooks/useQiblaHeading.ts` — **[Partial]** — add permission-denied branch, listener cleanup, smoothing verification
- `src/features/solah/utils/adhanHelpers.ts` — **[None]**
- `src/features/solah/utils/formatDateAndTime.ts` — **[Broken]** — the test file `formatFateAndTime.test.ts` references a missing or misnamed source; fix the import before this counts as any coverage at all
- `src/features/solah/components/CalendarStrip.tsx` — **[Partial]** — add prev navigation, week layout, today and selected date highlighting
- `src/features/solah/components/*` not already covered — **[None]**
- `src/features/solah/screens/SolahTimeScreen.tsx` — **[None]**

### Settings

- `src/features/settings/components/sheet/SheetBody.tsx` — **[Partial]** — only 1 of 10 settings types tested; cover all types and onClose forwarding
- `src/features/settings/components/sheet/SheetTitle.tsx` — **[Thin]** — only 1 of 10 title mappings tested; cover all 10
- `src/features/settings/store/settingsStore.ts` — **[None]**
- `src/features/settings/store/defaultStore.ts` — **[None]**
- utility and constant modules with executable behavior — **[None]**
- `src/features/settings/screens/SettingsHome.tsx` — **[None]**

### Notifications

- `src/features/notifications/utils/solahNotifications.ts` — **[None]**
- `src/features/notifications/components/SolahNotificationsEffect.tsx` — **[None]**

### Guide

- `src/features/guide/components/AdhkarCard.tsx` — **[None]**
- `src/features/guide/components/AudioPlayButton.tsx` — **[None]**
- `src/features/guide/components/StepDescription.tsx` — **[None]**
- `src/features/guide/components/StepTitle.tsx` — **[None]**
- `src/features/guide/screens/GuideHome.tsx` — **[None]**

### Adhkar

- `src/features/adhkar/hooks/*` — **[None]**
- `src/features/adhkar/components/Details.tsx` — **[Partial]** — add adhkar_type variations, empty entries edge case
- `src/features/adhkar/components/TitleBar.tsx` — **[Partial]** — add all 3 title mappings, bookmark state from store, and missing-item conditional
- `src/features/adhkar/components/TopNav.tsx` — **[Partial]** — add all 3 tabs, icon color changes, both count types, count=0 edge case
- `src/features/adhkar/components/List.tsx` — **[None]**
- `src/features/adhkar/screens/AdhkarHome.tsx` — **[Partial]** — only 2 tabs tested; add all tab rendering, home button, count calculations, and favouriteItems filtering
- `src/features/adhkar/screens/AdhkarDetails.tsx` — **[None]**
- `src/features/adhkar/screens/AdhkarList.tsx` — **[None]**
- `src/features/adhkar/screens/FavouriteAdhkar.tsx` — **[None]**
- `src/features/adhkar/store/adhkarStore.ts` — **[None]**

### Onboarding

- `src/features/onboarding/components/OnboardingContent.tsx` — **[None]**
- `src/features/onboarding/screens/OnboardingScreen.tsx` — **[None]**
- `src/features/onboarding/store/onboardingStore.ts` — **[None]**

### Store Coverage Focus

Apply especially high coverage expectations to:

- `src/features/solah/store/solahStore.ts`
- `src/features/settings/store/settingsStore.ts`
- `src/features/settings/store/defaultStore.ts`
- `src/features/adhkar/store/adhkarStore.ts`
- `src/features/onboarding/store/onboardingStore.ts`

## Execution Plan

### Stage 0: Stabilize The Test Platform

- verify Jest runs cleanly on local and CI environments
- fix `formatFateAndTime.test.ts` — it references a missing or misnamed source file; this is a broken test that may pass vacuously and must be resolved before coverage thresholds are applied
- centralize mocks now scattered across test files
- add reusable render helpers and fixtures
- document the testing conventions

Exit criteria:

- one-command local execution works
- one-command CI coverage run works
- common native dependencies have stable mocks
- no broken test files (files referencing non-existent sources)

### Stage 1: Lock Down Utilities

- write tests for every untested util
- drive edge cases first: invalid values, timezone behavior, date formatting, numeric boundaries
- enforce the strict utils coverage threshold

Exit criteria:

- all utils covered
- utils threshold passes consistently

### Stage 2: Lock Down Hooks

- cover return values, loading states, permission states, timer states, cleanup behavior, and error branches
- prefer fake timers and boundary mocks
- enforce the hooks threshold

Exit criteria:

- all hooks have direct tests
- cleanup/effect paths are covered
- hook threshold passes consistently

### Stage 3: Lock Down Stores

- cover store defaults, action updates, reset behavior, persistence-related behavior, and derived reads
- keep store tests fast and deterministic
- enforce the store threshold

Exit criteria:

- all stores have direct tests
- state mutation paths are covered
- store threshold passes consistently

### Stage 4: Expand Component Coverage

- work from shared components outward into feature components
- cover render states, callbacks, disabled states, conditional rendering, and accessibility-facing content
- treat shared components and settings/solah components as first-class priorities

Exit criteria:

- all reusable components have at least one behavior test
- critical components have branch-oriented coverage
- component threshold passes consistently

### Stage 5: Add Screen And App Integration Coverage

- cover screen composition and route-level behavior
- add smoke tests for providers and app-shell paths

Exit criteria:

- major user flows have at least one integration test each
- global threshold passes

### Stage 6: Ratchet Up Thresholds

- move from Phase 1 thresholds to Phase 2
- only raise thresholds after the suite is green for at least a few consecutive merges

Exit criteria:

- CI blocks regressions
- high coverage is sustained rather than temporarily forced

## PR And CI Policy

Recommended policy:

- PRs must run `npm run test:ci`
- changed test scope can be used for local iteration, but merge validation should use full coverage
- coverage regressions should fail the build
- pre-push hook may keep using changed tests for speed, but CI must remain authoritative
- components, hooks, utils, and stores should not be merged without direct tests unless the change is purely mechanical

Recommended command usage:

- local focused run: `npx jest path/to/file.test.tsx --watch`
- local related run: `npx jest --findRelatedTests path/to/source.ts`
- local changed run: `npx jest --onlyChanged`
- local coverage run: `npm run test:cov`
- pre-push validation: `npm run test:prepush`
- CI run: `npm run test:ci`

## Definition Of Done

A feature area is considered complete only when:

- tests were written first or updated first for the change
- all new tests pass locally
- relevant coverage thresholds pass
- mocks are minimal and reusable
- happy path plus important edge paths are covered
- cleanup behavior is tested for hooks/effects where applicable
- tests cover the primary conditional branches — not just the happy path render
- a test file existing does not count as done; it must reach Good quality tier as defined in the Coverage Quality Tiers section below

## Coverage Quality Tiers

Use these tiers when assessing or updating the test backlog:

- **Good**: covers primary conditional branches, user-visible behavior, callbacks, disabled/loading/error states, and important edge cases
- **Partial**: happy path is covered but key branches, state variations, or important edge cases are missing
- **Thin**: smoke test only — confirms the component renders or the function runs, but asserts little behavioral value
- **Broken**: test file references a missing or misnamed source, or passes vacuously with no real assertions

## Risks And Mitigations

### Risk: Over-mocking

Mitigation:

- mock only native or external boundaries
- prefer real rendering and user events for component behavior

### Risk: Brittle UI Tests

Mitigation:

- assert behavior and user-visible output
- avoid implementation details, internal state, and excessive snapshots

### Risk: Coverage Gaming

Mitigation:

- require branch-focused assertions
- review tests for meaningful assertions, not line inflation

### Risk: CI Friction From Immediate Strict Thresholds

Mitigation:

- adopt Phase 1 first
- burn down backlog by priority
- then ratchet to Phase 2

## Recommended First Implementation Batch

Start with this exact order:

1. Create shared test utilities and native mocks.
2. Add `coverageThreshold` to Jest with Phase 1 values.
3. Add fast-feedback scripts for watch, changed, and related test runs.
4. Finish all remaining utils tests.
5. Finish all remaining hooks tests.
6. Finish all store tests and enforce the store threshold.
7. Expand shared and settings/solah component tests.
8. Add screen/app integration coverage for high-traffic flows.
9. Raise thresholds to Phase 2 after backlog reduction.

## Expected Outcome

If executed in this order, the repo will gain:

- a repeatable TDD workflow
- breakage detection close to the point of change
- enforceable coverage gates in Jest
- near-complete confidence in components, hooks, utils, and stores
- reduced regression risk in feature work
- a test suite that scales with the app rather than trailing behind it
