# Logo Usage Guide

## Overview

The Quant Basket logo has been standardized across the website using a reusable `Logo` component. This ensures consistency and makes it easy to update the logo globally.

## Logo Files

- **`/public/qb_logoc.webp`** - Main logo file (used in Dashboard and main site)
- **`/public/qb_logo.webp`** - Alternative logo file (legacy)

## Logo Component

### Basic Usage

```tsx
import Logo from '@/components/Logo';

// Basic logo with text
<Logo />

// Logo without text
<Logo showText={false} />

// Different sizes
<Logo size="sm" />   // 24x24px
<Logo size="md" />   // 32x32px (default)
<Logo size="lg" />   // 48x48px
<Logo size="xl" />   // 64x64px

// With custom styling
<Logo className="text-white" />

// Without link
<Logo linkTo={null} />
```

### Usage Examples

#### 1. Dashboard Navigation
```tsx
<Logo size="md" linkTo="/" />
```

#### 2. Main Site Navigation
```tsx
<Logo size="lg" linkTo="/" className="text-white" />
```

#### 3. Footer
```tsx
<Logo size="md" showText={false} />
```

#### 4. Loading Screen
```tsx
<Logo size="xl" showText={true} linkTo={null} />
```

## Implementation Details

### Component Props

```tsx
interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';     // Logo size
  showText?: boolean;                    // Show/hide "Quant Basket" text
  linkTo?: string;                       // Link destination (null for no link)
  className?: string;                    // Additional CSS classes
}
```

### Size Mappings

- **sm**: 24x24px logo, 14px text
- **md**: 32x32px logo, 18px text (default)
- **lg**: 48x48px logo, 20px text
- **xl**: 64x64px logo, 24px text

### Styling

The logo component automatically handles:
- Responsive sizing
- Hover effects (when linked)
- Text color inheritance
- Proper spacing

## Current Implementation

### Dashboard
- **File**: `src/components/DashboardNavigation.tsx`
- **Usage**: `<Logo size="md" linkTo="/" />`
- **Purpose**: Navigation header in dashboard

### Main Site
- **File**: `src/components/Navigation.tsx`
- **Usage**: `<Logo size="lg" linkTo="/" className="text-white" />`
- **Purpose**: Main site navigation header

## Best Practices

1. **Consistency**: Always use the Logo component instead of direct img tags
2. **Sizing**: Use appropriate sizes for different contexts
3. **Accessibility**: The component includes proper alt text
4. **Performance**: The logo is optimized and cached

## Updating the Logo

To update the logo across the entire website:

1. Replace `/public/qb_logoc.webp` with your new logo file
2. Ensure the new file has the same dimensions or update the size classes
3. Test across different screen sizes

## Troubleshooting

### Logo Not Displaying
- Check if the file exists in `/public/qb_logoc.webp`
- Verify the file path is correct
- Check browser console for 404 errors

### Wrong Size
- Use the appropriate `size` prop
- Check if custom CSS is overriding the component styles

### Text Color Issues
- Use the `className` prop to override text color
- Example: `<Logo className="text-white" />`

## Future Enhancements

- [ ] Add support for different logo variants (dark/light themes)
- [ ] Implement SVG version for better scaling
- [ ] Add animation options
- [ ] Support for different aspect ratios 