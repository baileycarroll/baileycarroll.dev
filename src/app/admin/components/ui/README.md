# Admin UI Components

This directory contains reusable UI components for the admin interface.

## DateSelector

A reusable date selector component that matches the site's styling and can be used across all admin forms.

### Features

- ✅ Consistent styling with the site's design system
- ✅ Calendar icon for better UX
- ✅ Support for labels, help text, and error messages
- ✅ Required field indicators
- ✅ Disabled state support
- ✅ Min/max date constraints
- ✅ Two usage patterns: standalone and with label

### Usage

#### Basic DateSelector (without label)

```tsx
import { DateSelector } from '../components/ui/AdminForm';

<DateSelector
  value={formData.date}
  onChange={(value) => setFormData({ ...formData, date: value })}
  placeholder="Select date"
  error={formErrors.date}
  disabled={false}
  required={true}
  min="2020-01-01"
  max="2030-12-31"
/>
```

#### DateField (with label - recommended for forms)

```tsx
import { DateField } from '../components/ui/AdminForm';

<DateField
  label="Published Date"
  value={formData.date}
  onChange={(value) => setFormData({ ...formData, date: value })}
  error={formErrors.date}
  required={true}
  helpText="Select the publication date"
  disabled={false}
  min="2020-01-01"
  max="2030-12-31"
/>
```

### Props

#### DateSelectorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The current date value (YYYY-MM-DD format) |
| `onChange` | `(value: string) => void` | - | Callback when date changes |
| `placeholder` | `string` | `"Select date"` | Placeholder text |
| `error` | `string` | - | Error message to display |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the field is required |
| `label` | `string` | - | Label text (if provided, renders with label wrapper) |
| `helpText` | `string` | - | Help text to display below the input |
| `min` | `string` | - | Minimum allowed date (YYYY-MM-DD format) |
| `max` | `string` | - | Maximum allowed date (YYYY-MM-DD format) |
| `className` | `string` | `""` | Additional CSS classes |

#### DateFieldProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `value` | `string` | - | The current date value (YYYY-MM-DD format) |
| `onChange` | `(value: string) => void` | - | Callback when date changes |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether the field is required |
| `helpText` | `string` | - | Help text to display below the input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `min` | `string` | - | Minimum allowed date (YYYY-MM-DD format) |
| `max` | `string` | - | Maximum allowed date (YYYY-MM-DD format) |

### Styling

The component uses the site's design system with enhanced date input styling:

- **Background**: `bg-neutral-700/50` with backdrop blur
- **Border**: `border-neutral-600` (red when error)
- **Text**: `text-neutral-200`
- **Focus**: `ring-primary/50` and `border-primary/50`
- **Icon**: Calendar icon from Heroicons
- **Border radius**: `rounded-lg`
- **Dark theme support**: Custom CSS overrides for browser date picker styling
- **Browser compatibility**: Webkit-specific styling for Chrome/Safari date inputs

#### Browser Date Input Styling

The component includes custom CSS to override the default browser styling for date inputs:

- Sets `color-scheme: dark` for dark theme support
- Styles the calendar picker indicator to match the theme
- Ensures all date field text (month, day, year) uses the correct text color
- Maintains consistent appearance across different browsers

### Migration from FormInput

Replace:
```tsx
<FormField label="Date" required error={formErrors.date}>
  <FormInput
    type="date"
    value={formData.date}
    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
    error={formErrors.date}
    required
  />
</FormField>
```

With:
```tsx
<DateField
  label="Date"
  value={formData.date}
  onChange={(value) => setFormData({ ...formData, date: value })}
  error={formErrors.date}
  required
/>
```

### Examples

#### Articles Form
```tsx
<DateField
  label="Published Date"
  value={formData.date}
  onChange={(value) => setFormData({ ...formData, date: value })}
  error={formErrors.date}
  required
/>
```

#### Experiences Form
```tsx
<DateField
  label="Start Date"
  value={formData.startDate}
  onChange={(value) => setFormData({ ...formData, startDate: value })}
  required
/>

<DateField
  label="End Date"
  value={formData.endDate || ''}
  onChange={(value) => setFormData({ ...formData, endDate: value || null })}
/>
```

#### Projects Form
```tsx
<DateField
  label="Start Date"
  value={formData.startDate}
  onChange={(value) => setFormData({ ...formData, startDate: value })}
  required
/>

<DateField
  label="End Date"
  value={formData.endDate || ''}
  onChange={(value) => setFormData({ ...formData, endDate: value || null })}
/>
```
