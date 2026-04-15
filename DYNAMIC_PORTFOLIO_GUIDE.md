## 📌 DYNAMIC PORTFOLIO SYSTEM

Your portfolio is now fully dynamic! Instead of creating new HTML files for each project, you can now simply add **Markdown files** in the `/portfolios/` directory.

---

## ✨ How It Works

### **Old Way** ❌
- Create individual HTML files for each portfolio: `real-estate-saas.html`, `reddit-lead-gen.html`, etc.
- Update `data.js` with each new project
- Duplicate HTML structure repeatedly

### **New Way** ✅  
- Create markdown files in `portfolios/` directory
- Add metadata in YAML frontmatter at the top
- `portfolio.html` loads and renders them dynamically
- One single dynamic page handles all projects

---

## 🚀 Adding a New Portfolio

### **Step 1:** Create a new markdown file

Create a file like `portfolios/your-awesome-project.md` with this structure:

```markdown
---
mission_id: MISSION_06
code: YOUR CODE
title: Your Project Title
tagline: A short, punchy description of what you built.
tags: ['Tech1', 'Tech2', 'Tech3', 'Tool1']
chips: ['Result 1', 'Result 2', 'Result 3']
theme: red
prev_mission: reddit-lead-gen
next_mission: null
---

# Mission Brief

Write your project overview here...

---

## The Problem

Describe the client's challenge...

## The Solution

Describe what you built...

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Your tech stack |
| **Backend** | More tech |

---

## Performance Data

- **Metric 1** Value
- **Metric 2** Value

---

## Mission Outcomes

- Outcome 1
- Outcome 2
- Outcome 3

---

## Want This For Your Biz?

I can build the same system — customised to your workflow.
```

### **Step 2:** Update mission linking

If adding between existing missions, update the `prev_mission` and `next_mission` fields to chain them together.

**Example:** If adding MISSION_06 after MISSION_05:
- In `reddit-lead-gen.md`: Change `next_mission: null` → `next_mission: your-awesome-project`
- In `your-awesome-project.md`: Set `prev_mission: reddit-lead-gen`

### **Step 3:** Add to `data.js`

Add an entry to the `PANKAJ_DB.projects` array in `js/data.js`:

```javascript
{
  id: 'MISSION_06',
  code: 'YOUR CODE',
  name: 'Your Project Title',
  chips: ['Result 1', 'Result 2', 'Result 3'],
  url: 'portfolio.html?portfolio=your-awesome-project'
}
```

### **Step 4:** Done! ✨

Your new project will now appear on:
- **`missions.html`** - In the mission log listing
- **`portfolio.html?portfolio=your-awesome-project`** - The dynamic portfolio page

---

## 🎨 Frontmatter Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `mission_id` | String | Unique mission identifier (e.g., `MISSION_06`) |
| `code` | String | Short code name (e.g., `SAAS`, `LEAD AI`) |
| `title` | String | Full project title |
| `tagline` | String | One-liner description shown under title |
| `tags` | Array | Tech stack tags shown in hero (wrap in quotes: `['Next.js', 'FastAPI']`) |
| `chips` | Array | Achievement chips shown in hero (wrap in quotes) |
| `theme` | String | Color theme: `red`, `cyan`, `blue`, `green`, `amber` |
| `prev_mission` | String or null | Previous mission filename (without `.md`), or `null` if first |
| `next_mission` | String or null | Next mission filename (without `.md`), or `null` if last |

---

## 🎨 Theme Colors Available

- `theme: red` - Red/crimson accent
- `theme: cyan` - Cyan/turquoise accent
- `theme: blue` - Blue accent
- `theme: green` - Green accent
- `theme: amber` - Yellow/amber accent

---

## 📝 Markdown Formatting Tips

The markdown is rendered with styling that matches your portfolio aesthetic:

- **Headers** (`##`, `###`) - Styled as section headings
- **Tables** - Formatted with accent colors
- **Code blocks** - Styled with monospace font
- **Links** - Work normally
- **Lists** - Styled with accent bullet points
- **Bold/Italic** - Supported with accent colors

---

## ✅ Current Projects

All existing portfolios have been converted to markdown:
- `portfolios/lead-qualification.md` → MISSION_01
- `portfolios/email-automation.md` → MISSION_02
- `portfolios/ai-chief-of-staff.md` → MISSION_03
- `portfolios/real-estate-saas.md` → MISSION_04
- `portfolios/reddit-lead-gen.md` → MISSION_05

---

## 🔧 File Structure

```
/portfolio
├── portfolio.html           ← Dynamic portfolio viewer
├── portfolios/
│   ├── lead-qualification.md
│   ├── email-automation.md
│   ├── ai-chief-of-staff.md
│   ├── real-estate-saas.md
│   └── reddit-lead-gen.md
├── js/
│   ├── data.js              ← Update with new projects
│   └── portfolio-loader.js  ← Markdown parser & renderer
└── css/
    └── case-study.css       ← Markdown styling
```

---

## 💡 Why This System?

✅ **DRY** - No more duplicate HTML
✅ **Easy to scale** - Add projects in seconds
✅ **Markdown-friendly** - Write content, not code
✅ **SEO prepared** - Dynamic pages still get proper titles/meta
✅ **Consistent styling** - All projects look cohesive
✅ **One source of truth** - Edit markdown, see changes instantly

Enjoy! 🚀
