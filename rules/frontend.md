# Frontend Rules

- Use "use client" ONLY when strictly required.
- Prefer Server Components by default.
- Do NOT fetch data inside UI-only components.
- Side effects MUST be handled inside useEffect.
- Loading, success and error states MUST be explicit.
- Components MUST NOT contain business logic.
- Business logic MUST live in services or hooks.
