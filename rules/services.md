# Service Layer Rules

Services handle:
- Business logic
- API interaction
- Data transformation

Services MUST:
- Be single-responsibility
- Be deterministic
- Validate inputs before processing

Services MUST NOT:
- Access UI state
- Manipulate the DOM
- Trigger toasts or UI notifications
