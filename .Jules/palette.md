## 2024-11-12 - Missing ARIA Labels in Action Buttons
**Learning:** The application uses several icon-only buttons for actions like editing and deleting without providing an `aria-label`. This poses a significant accessibility challenge for screen readers since the intent of the button isn't announced.
**Action:** Add `aria-label`s to all icon-only buttons and buttons where context is not immediately obvious, primarily in `ReadOnlyRow.jsx`.
