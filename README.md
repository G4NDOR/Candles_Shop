## Citations & Academic Integrity Attribution

### AI Tool Usage
- **Tool**: Google Gemini
- **Usage Scope**:
  - Code generation, refactoring, and debugging assistance for Next.js (App Router), Redux Toolkit state slices, and TypeScript typing errors.
  - Form state recalculation logic (dynamic `unitPrice` computation based on selected candle and quantity).
  - MySQL PL/SQL triggers for maintaining derived attributes (`Sales.totalAmount`).
- **Human Contribution**:
  - Architecture design, relational database schema design, UI layout, prompt specification, integration, and manual system testing.

### External Libraries & Documentation
- [Next.js Documentation](https://nextjs.org/docs) - App Router and dynamic routing structure.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - Slice structure and store configuration.
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/) - Trigger and Stored Procedure syntax.

For JavaScript / TypeScript Files (.ts, .tsx, .js)
/**
 * Author: Gandor & Zander
 * Date: 2026-08-14
 * 
 * Sources / Citations:
 * - AI Assistance: Google Gemini (Gemini 1.5 Pro / Advanced)
 *   - Scope: Assisted with TypeScript type fixes, dynamic schema mapping, Redux state synchronization, and build error debugging.
 *   - Prompts / Guidance: Prompted and directed by the author for architecture, state handling, and specific component requirements.
 * - Reference Material: Next.js Documentation (https://nextjs.org/docs), Redux Toolkit (https://redux-toolkit.js.org/)
 * - Based on / Adapted from: OSU CS340 Starter Templates & Schema Registry specifications.
 */

 For SQL Files (.sql)

 -- ============================================================================
-- Title: Database Triggers and Stored Procedures (PL.sql)
-- Author: [Your Name] / [Partner's Name if applicable]
-- Date: 2026-08-14
-- 
-- Citations:
-- - AI Assistance: Google Gemini
--   - Scope: Formatted trigger syntax for recalculating Sales.totalAmount on SalesItems INSERT/UPDATE/DELETE.
--   - Logic & Design: Conceived and specified by the author for CS340 Project requirements.
-- ============================================================================

