# Project Development Guidelines

## Project Requirements

### API Integration
- Kakao Search API - Books
- API Key MUST be in `.env` file
- `.env` MUST be in `.gitignore`

### Evaluation Criteria Focus
- **Reusable component design**
- **Follow Figma design accurately**

## Project Structure

### Naming Convention
- **MUST use kebab-case for ALL files and folders**
- Examples:
  - Components: `search-bar.tsx`, `book-card.tsx`
  - Folders: `/components/search-bar/`
  - Test files: `search-bar.test.tsx`
  - Stories: `search-bar.stories.tsx`

### Component Structure
- Only shared components in `/components`
- Each component follows this structure:
  ```
  /components/search-bar/
    ├── search-bar.tsx
    ├── search-bar.stories.tsx
    ├── search-bar.test.tsx
    └── index.ts (barrel export)
  ```

## Development Rules

### Package Manager
- **MUST** use `pnpm` (never use npm or yarn)

### Code Quality
After every modification, verify:
1. `pnpm lint` passes
2. `pnpm test` passes
3. No TypeScript errors

### TypeScript Rules
- **NEVER** use `any` type
- All variables and functions must have explicit types

### Code Principles
- Keep code concise and clean
- No unnecessary features beyond requirements
- Fix root causes, never patch symptoms
- Always use standard solutions

## Submission Requirements
- Repository name: `cdri-books-hyojun`
- Include comprehensive `README.md`
- Submit `.env` file separately to `shawn@cdri.pro`