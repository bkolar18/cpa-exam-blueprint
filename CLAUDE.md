# Claude Code Development Guidelines

## TBS Question Development Rules

### Batch Size Limit
When adding TBS questions, **add them in batches of 10 or fewer** to avoid exceeding output token limits. This applies to all sections (FAR, AUD, REG, TCP, BAR, ISC).

### Type System Reference
Key types from `src/lib/data/tbs/types.ts`:
- **ExhibitType**: `'memo' | 'email' | 'financial_statement' | 'table' | 'invoice' | 'contract' | 'bank_statement' | 'ledger' | 'tax_form' | 'audit_report' | 'image' | 'text'`
- **RequirementType**: `'numeric' | 'dropdown' | 'journal_debit' | 'journal_credit' | 'text' | 'citation' | 'checkbox' | 'matching'`
- **TableContent**: Requires `rows: TableRow[]` where `TableRow` has `{ cells: [...] }` format
- **TextContent**: Requires `{ type: 'text', title: string, paragraphs: string[] }`

### Content Areas by Section
- **FAR**: FAR-I, FAR-II, FAR-III, FAR-IV
- **AUD**: AUD-I, AUD-II, AUD-III, AUD-IV (no AUD-V)
- **REG**: REG-I, REG-II, REG-III, REG-IV, REG-V
- **TCP**: TCP-I, TCP-II, TCP-III, TCP-IV
- **BAR**: BAR-I, BAR-II, BAR-III
- **ISC**: ISC-I, ISC-II, ISC-III

### File Paths
Always use complete absolute Windows paths with backslashes for ALL file operations.

## Current TBS Status
Target: 50 questions per section (350 total)
