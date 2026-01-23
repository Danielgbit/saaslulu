# Global Project Rules – Antigravity SaaS

This is a production-grade SaaS built with Next.js (App Router), TypeScript and AI-assisted development.

The AI MUST ALWAYS:
- Respect the existing project structure
- Prefer clarity over cleverness
- Avoid over-engineering
- Assume this is a scalable SaaS, not a demo

---

## ABSOLUTE LANGUAGE ENFORCEMENT (HIGH PRIORITY)

### User Communication Language

- ALL communication with the user MUST be in Spanish.
- This includes:
  - Explanations
  - Reasoning
  - Suggestions
  - Chat responses
  - Error explanations
- This rule has higher priority than any stylistic or contextual instruction.

### Codebase Language

- ALL code-related content MUST be written in English:
  - Code comments
  - Function comments
  - Inline comments
  - Documentation blocks
  - JSDoc
- NEVER write Spanish inside code comments.
- NEVER mix Spanish and English inside code blocks.

### Language Conflict Resolution

If a conflict exists:
1. User-facing communication → Spanish
2. Code and code comments → English

---

## SELF-CORRECTION RULE (MANDATORY)

If the AI:
- Writes code comments in Spanish
- Or communicates with the user in English

It MUST:
1. Immediately correct itself
2. Rewrite the affected content
3. Continue following all rules strictly

---

## CODE STYLE RULES

- Always use TypeScript.
- Never use `any` unless strictly unavoidable and justified.
- Prefer explicit types over inference in public APIs.
- Use named exports by default.
- Default exports ONLY for:
  - Next.js pages
  - Next.js layouts
- Keep functions small and single-responsibility.
- Avoid side effects inside React components unless strictly required.

---

## PROJECT STRUCTURE RULES

The AI MUST respect the following structure:

- `/app` → Next.js routes, layouts and pages ONLY
- `/components` → Reusable UI components ONLY
- `/hooks` → Custom React hooks (NO UI logic)
- `/services` → Business logic and API interaction
- `/validators` → Zod schemas and validation logic
- `/types` → Shared TypeScript types
- `/lib` → Utilities, helpers and external integrations
- `/schema` (root) → Database schema definition (single source of truth)

### Separation of Concerns

- Components MUST NOT contain business logic.
- Business logic MUST live in:
  - Services
  - Hooks

---

## DATABASE RULES

- The database schema located at the project root is the single source of truth.
- Any schema change MUST be reflected in:
  - TypeScript types
  - Zod validators
  - Services
- NEVER hardcode database assumptions in components.

---

## AI BEHAVIOR RULES

The AI MUST NEVER invent:
- Database fields
- API routes
- Environment variables
- External services

If required data is missing:
- Ask for clarification
- OR explicitly state assumptions before proceeding

The AI MUST:
- Prefer extending existing patterns
- Avoid introducing new patterns unnecessarily

---

## SAAS & AI AWARENESS RULES

- Assume this SaaS handles real users and real data.
- Prioritize:
  - Security
  - Validation
  - Data consistency
- NEVER suggest shortcuts that compromise data integrity.
- Treat AI features as assistive, never authoritative.

---

## FRONTEND RULES

- Use `"use client"` ONLY when strictly required.
- Prefer Server Components by default.
- Side effects MUST be handled inside `useEffect`.
- No data fetching inside UI-only components.
- Loading, success and error states MUST be explicit.

---

## SERVICE LAYER RULES

Services MAY:
- Handle API calls
- Contain business logic
- Transform data

Services MUST NOT:
- Access UI state
- Manipulate the DOM
- Trigger toasts or UI notifications

---

## ERROR HANDLING RULES

- Errors MUST be handled gracefully.
- NEVER fail silently.
- Errors MUST:
  - Be logged
  - Be communicated to the UI in a user-friendly way
- NEVER expose internal or raw errors directly to the user.

---

## NAMING CONVENTIONS

- Functions → camelCase
- Components → PascalCase
- Files:
  - React components → PascalCase.tsx
  - Hooks → useSomething.ts
  - Services → something.service.ts

Avoid generic names like:
- utils.ts
- helpers.ts

---

## PERFORMANCE RULES

- Avoid unnecessary re-renders.
- Prefer memoization ONLY when justified.
- Do not introduce global state unless required.
- Assume the app will scale to thousands of users.

---

## META RULE

If the AI is unsure:
- DO NOT guess
- Ask for clarification
- OR present options with pros and cons
- Prefer concise explanations unless the user explicitly requests depth
