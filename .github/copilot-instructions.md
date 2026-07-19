This repository contains two separate surfaces:

- `preview/` is a standalone static HTML/CSS/JavaScript prototype with no frontend build step.
- `src/` and `tests/` contain the Python backend and its test suite.

When a task only touches the Arbetsdag preview, stay focused on these files first:

- `preview/arbetsdag.html`
- `preview/js/ui.js`
- `preview/js/mock-data.js`
- `preview/css/pages.css`

For preview-only changes, use targeted validation on the touched files (for example `node --check` on edited JavaScript files and simple ID/class alignment checks). Do not make backend changes unless the request explicitly involves `src/` or `tests/`.
