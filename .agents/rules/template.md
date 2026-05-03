---
trigger: always_on
---

# Gemini AI Instructions: Payload CMS Architecture

This file contains context and architectural decisions for this Payload CMS project. Please read this before modifying pages, blocks, or routing logic.

## Hybrid Page Templates (Bypassing Modularity)

**Context:** The project uses a hybrid approach to page building to balance editor control with developer velocity. While standard pages are built using modular blocks (Hero, Content, CTAs, etc.), highly customized pages (like "Personal Lines", complex calculators, or unique promotional pages) bypass this block system.

### When to use Blocks vs. Templates
- **Use Blocks (`src/blocks/`):** For repeatable, standard content layouts that editors need to mix and match (e.g., standard text columns, generic CTAs, simple image galleries).
- **Use Templates (`src/templates/`):** For complex, unique, "one-off" pages that involve highly specific UI, intricate component grids, or unique database interactions (e.g., a multi-step quote form).

### How the Hybrid Template System Works
1. **Payload Schema (`src/collections/Pages/index.ts`):** The `Pages` collection has a `template` select field. 
   - Options include `default` (which uses the standard block layout) and specific templates like `personal-lines`.
   - When a specific template is selected, the admin UI conditionally hides the standard "Hero" and "Content" tabs to prevent editor confusion.
2. **Next.js Routing (`src/app/(frontend)/[slug]/page.tsx`):** The dynamic route checks the `page.template` value.
   - If `template === 'default'`, it renders `<RenderHero />` and `<RenderBlocks />`.
   - If a specific template is selected (e.g., `personal-lines`), it intercepts the render and returns the hardcoded React template (e.g., `<PersonalLinesTemplate />`) instead.
3. **Template Location (`src/templates/`):** Hardcoded page templates are stored in this directory. They inherit global styles and can import standard UI components from `src/components/`.

### Adding a New Hardcoded Page
If a user requests to add a new mockup or a highly custom page, follow these steps:
1. Add the new template string to the `template` select field options in `src/collections/Pages/index.ts`.
2. Create the corresponding template folder and component in `src/templates/`.
3. Update the `if (template === 'your-new-template')` logic in `src/app/(frontend)/[slug]/page.tsx` to render the new component.
4. Run `npm run generate:types` in the `payload` directory.
