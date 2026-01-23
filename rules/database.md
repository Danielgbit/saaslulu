# Database Rules

- The database schema located at the project root is the single source of truth.
- Any schema change MUST be reflected in:
  - TypeScript types
  - Zod validators
  - Services

- NEVER hardcode database assumptions in components.
- Prefer explicit relations and constraints over inferred logic.
