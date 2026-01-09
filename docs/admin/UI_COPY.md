# Admin Dashboard UI Copy & Help Text

## Overview Page

### Page Header
- **Title:** Admin Dashboard
- **Subtitle:** Overview of your CPA Exam Blueprint platform

### Stat Cards
| Stat | Description |
|------|-------------|
| Total Users | Total registered accounts on the platform |
| Pending Feedback | Question issues awaiting review |
| Sessions Today | Practice sessions started in the last 24 hours |
| Active Users (7d) | Unique users who practiced in the last 7 days |

### Quick Actions Tooltips
- **Review Feedback:** Check user-reported question issues
- **View Analytics:** See platform usage and engagement metrics
- **Question Stats:** Review question difficulty and accuracy rates
- **Send Announcement:** Email updates to your users

---

## Feedback Page

### Page Header
- **Title:** Feedback Management
- **Subtitle:** Review and manage user-reported question issues

### Filter Labels
- **Status:** Filter by feedback status
- **Section:** Filter by exam section (FAR, AUD, REG, TCP)
- **Type:** Filter by issue type

### Feedback Types
| Type | Description | Typical Action |
|------|-------------|----------------|
| Wrong Answer | Correct answer marked as incorrect | Review question, update if needed |
| Unclear | Question text is confusing | Rewrite question for clarity |
| Outdated | Content no longer accurate | Update to current standards |
| Typo | Spelling or grammar error | Quick fix in question editor |
| Other | Doesn't fit other categories | Review case-by-case |

### Status Definitions
| Status | Meaning |
|--------|---------|
| Pending | Awaiting initial review |
| Reviewed | Looked at, may need action |
| Resolved | Issue fixed or addressed |
| Dismissed | Not a valid issue |

### Bulk Action Tooltips
- **Mark Reviewed:** Indicate you've seen these items
- **Mark Resolved:** Confirm issues have been fixed
- **Dismiss:** Close items that aren't valid issues

### Empty State
"No feedback submitted yet. Users can report issues while practicing."

---

## Users Page

### Page Header
- **Title:** User Management
- **Subtitle:** View and manage registered users

### Column Definitions
| Column | Description |
|--------|-------------|
| User | Name and email address |
| Subscription | Current subscription tier |
| Joined | Registration date |
| Last Active | Most recent practice session |
| Sessions | Total practice sessions completed |
| Streak | Current consecutive days of practice |

### Subscription Tiers
- **Free:** Basic access
- **Pro:** Enhanced features
- **Premium:** Full access

### Empty State
"No users found matching your filters."

---

## Analytics Page

### Page Header
- **Title:** Analytics
- **Subtitle:** Platform usage and engagement metrics

### Chart Descriptions

**Signups Over Time**
Shows daily new user registrations for the selected period.

**Practice Sessions**
Daily count of practice sessions started.

**Accuracy by Section**
Average correct answer rate per exam section. Green (>75%), Yellow (50-75%), Red (<50%).

**Subscription Breakdown**
Distribution of users across subscription tiers.

**Popular Topics**
Most frequently practiced topics.

**Peak Usage Times**
Hours when users are most active (in UTC).

**Study Streak Distribution**
How users are distributed across streak lengths.

### Date Range Options
- Last 7 days: Recent trends
- Last 30 days: Monthly view (default)
- Last 90 days: Quarterly patterns
- All time: Complete history

---

## Questions Page

### Page Header
- **Title:** Question Analytics
- **Subtitle:** Performance statistics for practice questions

### Summary Cards
| Card | Description |
|------|-------------|
| Questions with Data | Questions that have been answered at least once |
| Too Hard (<50%) | Questions with very low accuracy (may need review) |
| Too Easy (>95%) | Questions most users get right (consider difficulty) |
| Has Feedback | Questions with user-reported issues |

### Column Definitions
| Column | Description |
|--------|-------------|
| Question | Question ID and topic |
| Section | Exam section (FAR, AUD, REG, TCP) |
| Shown | Number of times presented to users |
| Accuracy | Percentage of correct answers |
| Avg Time | Average time to answer (seconds) |
| Feedback | Number of issue reports |
| Status | Quality indicators |

### Status Badges
- **Hard:** <50% accuracy with 10+ attempts
- **Easy:** >95% accuracy with 10+ attempts
- **Review:** Has feedback that needs attention
- **✓ (checkmark):** No issues detected

### Empty State
"No question data found. Question stats are collected as users answer questions."

---

## Activity Page

### Page Header
- **Title:** Activity Log
- **Subtitle:** Audit trail of admin and system actions

### Action Types
| Action | Description |
|--------|-------------|
| Admin Login | Admin accessed the dashboard |
| Feedback Updated | Single feedback item status changed |
| Bulk Feedback Update | Multiple feedback items updated |
| User Created | New user registration |
| User Updated | User profile or subscription changed |
| Export | Data exported to CSV |
| Announcement Sent | Email sent to users |
| Subscription Changed | User subscription modified |

### Empty State
"No activity logs found for the selected filters."

---

## Announcements Page

### Page Header
- **Title:** Announcements
- **Subtitle:** Send email announcements to users

### Recipient Options
| Option | Description |
|--------|-------------|
| All Users | Everyone with an account |
| Free Tier Only | Users without paid subscription |
| Paid Users Only | Pro and Premium subscribers |
| Inactive Users | No activity in 30+ days |

### Form Labels
- **Recipients:** Who should receive this email?
- **Subject:** Email subject line (keep it clear and engaging)
- **Message Body:** Email content (Markdown supported)

### Markdown Help
Supports basic Markdown:
- `**bold**` for **bold text**
- `*italic*` for *italic text*
- `[link text](url)` for links
- Bullet lists with `-` or `*`

### Preview Section
Shows how the email will appear to recipients.

### Previous Announcements
"No announcements sent yet. Your announcement history will appear here."

---

## Global Search (Cmd+K)

### Placeholder Text
"Search users, feedback, questions..."

### Help Text
"Start typing to search. Search users by email, feedback by question ID, or questions by content."

### No Results
'No results found for "[query]"'

---

## Error States

### Generic Error
"Something went wrong. Please try again."

### Unauthorized
"You don't have permission to access this page."

### Not Found
"The page you're looking for doesn't exist."

### Network Error
"Unable to connect. Check your internet connection."

---

## Success Messages

### Feedback Updated
"Feedback status updated successfully."

### Bulk Update
"[X] items updated successfully."

### Announcement Sent
"Announcement sent to [X] recipients."

### Export Complete
"CSV exported successfully."

---

## Confirmation Dialogs

### Send Announcement
"Are you sure you want to send this announcement to [X] users?"

### Bulk Dismiss
"Are you sure you want to dismiss [X] feedback items?"

### Delete Action (if applicable)
"This action cannot be undone. Are you sure?"
