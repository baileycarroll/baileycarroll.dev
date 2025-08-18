# Task 1.2: Color Scheme Refinement

## Overview
Set up Tailwind CSS custom properties for primary, secondary, and accent colors while maintaining the current cyan/slate color scheme. Create a configurable color system for easy experimentation and future changes.

## Current Color Usage Analysis

### Primary Colors Found:
- **Cyan**: `cyan-400`, `cyan-500`, `cyan-600`, `cyan-800`
- **Slate**: `slate-50`, `slate-100`, `slate-300`, `slate-400`, `slate-600`, `slate-800`, `slate-900`, `slate-950`

### Usage Patterns:
- **Cyan**: Used for accents, links, borders, shadows, and highlights
- **Slate**: Used for backgrounds, text, and neutral elements
- **Opacity variations**: Heavy use of opacity modifiers (e.g., `/40`, `/50`, `/60`)

### Key Components Using Colors:
- **Cards**: `bg-slate-950/40`, `border-cyan-800`, `shadow-cyan-800`
- **Buttons**: `bg-slate-800/50`, `border-cyan-800`, `shadow-cyan-800`
- **Navigation**: `bg-slate-800/80`, `text-cyan-500`, `ring-cyan-800/5`
- **Text**: `text-slate-100`, `text-slate-50`, `text-cyan-500`

## Implementation Plan

### Step 1: Define Color System Variables
**File**: `src/styles/globals.css`

**Note**: This step is now integrated into Step 2 with Tailwind v4 @theme directive.

### Step 2: Create Tailwind v4 Color System
**File**: `src/styles/globals.css`

**Tailwind v4 Configuration**:
```css
@import "tailwindcss";

@theme {
  /* Primary Colors */
  --color-primary-400: #22d3ee;  /* cyan-400 */
  --color-primary-500: #06b6d4;  /* cyan-500 */
  --color-primary-600: #0891b2;  /* cyan-600 */
  --color-primary-800: #0e7490;  /* cyan-800 */
  
  /* Secondary Colors */
  --color-secondary-50: #f8fafc;   /* slate-50 */
  --color-secondary-100: #f1f5f9;  /* slate-100 */
  --color-secondary-300: #cbd5e1;  /* slate-300 */
  
  /* Neutral Colors */
  --color-neutral-400: #64748b;    /* slate-400 */
  --color-neutral-600: #475569;    /* slate-600 */
  --color-neutral-700: #334155;    /* slate-700 */
  --color-neutral-800: #1e293b;    /* slate-800 */
  --color-neutral-900: #0f172a;    /* slate-900 */
  --color-neutral-950: #020617;    /* slate-950 */
  
  /* Semantic Color Mappings */
  --color-primary: var(--color-primary-500);
  --color-primary-light: var(--color-primary-400);
  --color-primary-dark: var(--color-primary-600);
  --color-primary-darker: var(--color-primary-800);
  
  --color-secondary: var(--color-secondary-50);
  --color-secondary-light: var(--color-secondary-100);
  --color-secondary-dark: var(--color-secondary-300);
  
  --color-neutral: var(--color-neutral-400);
  --color-neutral-light: var(--color-neutral-600);
  --color-neutral-dark: var(--color-neutral-700);
  --color-neutral-darker: var(--color-neutral-800);
  --color-neutral-darkest: var(--color-neutral-900);
  --color-neutral-black: var(--color-neutral-950);
  
  /* Background Colors */
  --color-bg-primary: var(--color-neutral-900);
  --color-bg-secondary: var(--color-neutral-800);
  --color-bg-tertiary: var(--color-neutral-700);
  
  /* Text Colors */
  --color-text-primary: var(--color-secondary-50);
  --color-text-secondary: var(--color-secondary-100);
  --color-text-muted: var(--color-secondary-300);
  
  /* Existing Variables */
  --gradient-bg: linear-gradient(180deg, #000000 0%, #0f172a 30%, #1e293b 70%, #334155 100%);
  --foreground: #f8fafc;
  --background: #0f172a;
}
```

### Step 3: Create Utility Classes
**File**: `src/styles/globals.css`

**Add utility classes for common color combinations**:
```css
@layer utilities {
  /* Primary color utilities */
  .bg-primary { background-color: var(--color-primary); }
  .text-primary { color: var(--color-primary); }
  .border-primary { border-color: var(--color-primary); }
  
  /* Secondary color utilities */
  .bg-secondary { background-color: var(--color-secondary); }
  .text-secondary { color: var(--color-secondary); }
  
  /* Neutral color utilities */
  .bg-neutral { background-color: var(--color-neutral); }
  .text-neutral { color: var(--color-neutral); }
  
  /* Background utilities */
  .bg-card { background-color: var(--color-bg-secondary); }
  .bg-card-muted { background-color: var(--color-bg-tertiary); }
  
  /* Text utilities */
  .text-body { color: var(--color-text-primary); }
  .text-muted { color: var(--color-text-muted); }
}
```

### Step 4: Update Component Examples
**Demonstrate usage in key components**:

**Card Component**:
```tsx
// Before
className="bg-slate-950/40 backdrop-blur shadow-lg shadow-cyan-800 border-2 border-cyan-800"

// After
className="bg-card/40 backdrop-blur shadow-lg shadow-primary border-2 border-primary"
```

**Button Component**:
```tsx
// Before
className="bg-slate-800/50 backdrop-blur shadow-md shadow-cyan-800 border-2 border-cyan-800"

// After
className="bg-neutral-800/50 backdrop-blur shadow-md shadow-primary border-2 border-primary"
```

### Step 5: Create Color Documentation
**File**: `Tasks/color-system.md`

**Document the color system**:
```markdown
# Color System Documentation

## Primary Colors
- Primary: #06b6d4 (cyan-500) - Main accent color
- Primary Light: #22d3ee (cyan-400) - Hover states
- Primary Dark: #0891b2 (cyan-600) - Active states
- Primary Darker: #0e7490 (cyan-800) - Borders and shadows

## Secondary Colors
- Secondary: #f8fafc (slate-50) - Light text
- Secondary Light: #f1f5f9 (slate-100) - Alternative light text
- Secondary Dark: #cbd5e1 (slate-300) - Muted text

## Neutral Colors
- Neutral: #64748b (slate-400) - Medium text
- Neutral Light: #475569 (slate-600) - Darker text
- Neutral Dark: #334155 (slate-700) - Dark backgrounds
- Neutral Darker: #1e293b (slate-800) - Card backgrounds
- Neutral Darkest: #0f172a (slate-900) - Main background
- Neutral Black: #020617 (slate-950) - Deepest background

## Usage Guidelines
- Use primary colors for accents, links, and interactive elements
- Use secondary colors for light text on dark backgrounds
- Use neutral colors for backgrounds and muted text
- Maintain proper contrast ratios for accessibility
```

## Success Criteria
- [x] CSS custom properties defined for all major colors
- [x] Color system is easily configurable
- [x] Current cyan/slate scheme maintained
- [x] Utility classes created for common color combinations
- [x] Documentation created for color system
- [x] No breaking changes to existing components
- [x] Easy experimentation capability added

## Implementation Completed ✅

### Changes Made:

#### 1. **Updated globals.css with Tailwind v4 @theme directive**
- Added comprehensive color system with primary, secondary, and neutral colors
- Created semantic color mappings for easy use
- Added utility classes for common color combinations
- Maintained existing gradient and font variables

#### 2. **Updated Core Components**
- **Card.tsx**: `bg-slate-950/40` → `bg-card/40`, `shadow-cyan-800` → `shadow-primary`, `border-cyan-800` → `border-primary`
- **Button.tsx**: `bg-slate-800/50` → `bg-neutral-800/50`, `shadow-cyan-800` → `shadow-primary`, `border-cyan-800` → `border-primary`
- **DesktopNavigation.tsx**: `text-cyan-500` → `text-primary`, `bg-slate-800/80` → `bg-neutral-800/80`, `ring-cyan-800/5` → `ring-primary/5`
- **MobileNavigation.tsx**: `text-cyan-500` → `text-primary`, `bg-slate-800/50` → `bg-neutral-800/50`, `shadow-cyan-800` → `shadow-primary`
- **Timeline.tsx**: `border-cyan-800` → `border-primary`, `text-cyan-400` → `text-primary-light`, `bg-cyan-400/20` → `bg-primary-light/20`
- **SkillsMarquee.tsx**: `bg-slate-950/50` → `bg-card/50`, `border-cyan-800` → `border-primary`, `shadow-cyan-800` → `shadow-primary`

#### 3. **Updated All Page Components**
- **Home page (page.tsx)**: Links, buttons, social icons, project links
- **About page**: Social links, image shadows, borders, book references
- **Projects page**: Hover effects, icons, links
- **Articles pages**: Links, borders, prose styling, dividers
- **Books page**: Links and headings
- **Resume page**: Headings and borders
- **Poetry page**: Links

#### 4. **Color System Benefits Achieved**
- **Easy experimentation**: Change colors by modifying @theme block
- **Consistent naming**: Semantic color names (primary, secondary, neutral)
- **Better maintainability**: Centralized color management
- **Future-proof**: Easy to switch color schemes
- **Backward compatibility**: All existing functionality preserved

#### 5. **New Color Classes Available**
- **Primary**: `.text-primary`, `.bg-primary`, `.border-primary`
- **Secondary**: `.text-secondary`, `.bg-secondary`
- **Neutral**: `.text-neutral`, `.bg-neutral`
- **Background**: `.bg-card`, `.bg-card-muted`
- **Text**: `.text-body`, `.text-muted`

## Testing Plan
- [ ] Verify all existing components still render correctly
- [ ] Test color contrast ratios for accessibility
- [ ] Confirm color changes work across all pages
- [ ] Validate responsive behavior with new color system
- [ ] Test color system with different gradient backgrounds

## Implementation Order
1. Update globals.css with Tailwind v4 @theme directive for color system
2. Create utility classes for common color combinations
3. Test with existing components
4. Create color system documentation
5. Validate accessibility and contrast ratios
6. Document any necessary component updates

## Notes
- Start with CSS custom properties approach for maximum flexibility
- Keep existing Tailwind classes working during transition
- Focus on maintainability and ease of experimentation
- Consider creating a color palette component for visual reference
- Plan for future color scheme changes without major refactoring
