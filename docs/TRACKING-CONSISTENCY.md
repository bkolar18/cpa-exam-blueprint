# Tracking Consistency Guide

This document outlines the tracking conventions and known considerations in the CPA Exam Blueprint system.

## Question ID Formats

### MCQ (Multiple Choice Questions)
- **Format**: `{section-code}-{topic-code}-{sequence}`
- **Example**: `far-000-001`, `aud-002-015`
- **Storage**: `practice_attempts.question_id` (TEXT)
- **Pattern**: 3-digit zero-padded numbers for topic and sequence

### TBS (Task-Based Simulations)
- **Format**: UUID
- **Example**: `550e8400-e29b-41d4-a716-446655440000`
- **Storage**: `tbs_attempts.tbs_id` (UUID references tbs_questions)

## Section Names

### Database Convention (UPPERCASE)
All database tables enforce UPPERCASE section values via CHECK constraints:
```sql
section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'))
```

### URL Convention (lowercase)
- `/dashboard/practice/far`
- `/dashboard/exam-simulation/tcp`

### Code Conversion
Always convert to UPPERCASE before database operations:
```typescript
const section = sectionParam.toUpperCase();
```

## Tracking Tables

### practice_attempts
Records individual MCQ question attempts:
```typescript
{
  user_id: UUID,
  question_id: TEXT,        // e.g., "far-000-001"
  section: TEXT,            // UPPERCASE: "FAR"
  topic: TEXT,
  selected_answer: TEXT,    // "A", "B", "C", "D"
  is_correct: BOOLEAN,
  time_spent_seconds: INTEGER,
  explanation_view_seconds: INTEGER
}
```

### tbs_attempts
Records TBS attempt and completion:
```typescript
{
  user_id: UUID,
  tbs_id: UUID,
  section: TEXT,            // UPPERCASE: "FAR"
  tbs_type: VARCHAR(50),    // "journal_entry", "reconciliation", etc.
  responses: JSONB,
  is_complete: BOOLEAN,
  score_earned: INTEGER,
  max_score: INTEGER,
  score_percentage: DECIMAL,
  time_spent_seconds: INTEGER,
  grading_details: JSONB
}
```

### exam_simulation_history
Records complete exam sessions:
```typescript
{
  user_id: UUID,
  section: TEXT,            // UPPERCASE: "FAR"
  exam_type: TEXT,          // "mini", "mixed", "realistic"
  mcq_count: INTEGER,
  mcq_correct: INTEGER,
  mcq_score_percentage: DECIMAL,
  tbs_count: INTEGER,
  tbs_score_percentage: DECIMAL,
  total_score_percentage: DECIMAL,
  time_limit_seconds: INTEGER,
  time_spent_seconds: INTEGER,
  mcq_responses: JSONB,     // Full response data
  tbs_responses: JSONB,     // Full response data
  mcq_question_ids: TEXT[],
  tbs_question_ids: TEXT[]
}
```

## TBS Types

Valid TBS types (stored in `tbs_attempts.tbs_type`):
- `journal_entry` - Journal entry creation
- `document_review` - Document analysis
- `reconciliation` - Account reconciliation
- `dropdown` - Dropdown/selection tasks
- `numeric_entry` - Numeric data entry
- `calculation` - Complex calculations
- `research` - Research simulations
- `general` - General/uncategorized

## Time Tracking

All time values are stored as INTEGER seconds:
- `time_spent_seconds` - Actual time spent
- `time_limit_seconds` - Allowed time (for exams)
- `explanation_view_seconds` - Time viewing explanations (MCQ only)

## Best Practices

1. **Always validate section names** before database operations
2. **Convert to UPPERCASE** before storing sections
3. **Use the correct ID format** for each question type
4. **Include all required fields** when creating attempts
5. **Update completion fields** when TBS/exams are finished

## Analytics Queries

For consistent analytics, always:
1. Use service role client to bypass RLS for admin queries
2. Filter by date range using `created_at` or `started_at`
3. Calculate completion rates from `is_complete` field
4. Calculate accuracy from actual scores, not just `is_correct`

## Known Considerations

1. **ID Format Difference**: MCQ uses string IDs, TBS uses UUIDs - this is intentional
2. **Section Case**: DB enforces UPPERCASE, URLs use lowercase - convert appropriately
3. **Scoring**: MCQ is binary (correct/incorrect), TBS has partial credit via score_percentage
