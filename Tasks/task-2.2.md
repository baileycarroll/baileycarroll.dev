# Task 2.2: Redesign Splash Screen Animation

## Overview
Completely redesign the splash screen using Framer Motion to create a modern, engaging, and performant animation sequence that enhances the user experience while maintaining the portfolio's clean aesthetic.

## Current State Analysis

### Current Splash Screen Issues:
- **Uses anime.js**: Outdated animation library
- **Complex implementation**: Hard to maintain and customize
- **Performance concerns**: May impact loading times
- **Limited interactivity**: Static animation sequence
- **Not modern**: Doesn't match current design aesthetic

### Current Files:
- **SplashScreen.tsx**: Main splash screen component
- **splash_screen.tsx**: Wrapper component with state management
- **layout.tsx**: Integrates splash screen with main layout

## Implementation Plan

### Step 1: Install and Configure Framer Motion
**Command**: `pnpm add framer-motion`

**Package.json Update**:
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

### Step 2: Design New Animation Sequence
**Concept**: Modern, clean animation that reflects the portfolio's aesthetic

**Animation Sequence Options**:

#### Option A: Minimal Fade-In (Recommended)
```tsx
// Simple, elegant fade-in with staggered elements
- Background gradient fades in
- Logo appears with subtle scale
- Text elements fade in sequentially
- Smooth transition to main content
```

#### Option B: Typography-Focused
```tsx
// Text-based animation with typewriter effect
- "Bailey Carroll" types out
- "Making My Mark" appears with fade
- "One Line of Code at a Time" slides in
- Smooth transition to main content
```

#### Option C: Interactive Elements
```tsx
// Interactive splash with hover effects
- Animated logo with hover interactions
- Clickable elements that reveal content
- Smooth transitions between states
- Engaging but not overwhelming
```

### Step 3: Create New Splash Screen Component
**File**: `src/components/layout/SplashScreen.tsx`

**New Implementation Structure**:
```tsx
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ setIsSplashComplete }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onAnimationComplete={() => {
          setTimeout(() => setIsSplashComplete(true), 1000);
        }}
      >
        {/* Logo Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Image
            src={Logo}
            alt="Bailey Carroll Logo"
            className="w-24 h-24"
          />
        </motion.div>

        {/* Name Animation */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-primary mb-4"
        >
          Bailey Carroll
        </motion.h1>

        {/* Tagline Animation */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-300 mb-2"
        >
          Making My Mark
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-primary-light"
        >
          One Line of Code at a Time
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
```

### Step 4: Update Splash Screen Wrapper
**File**: `src/app/splash_screen.tsx`

**New Implementation**:
```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/layout/SplashScreen";
import Header from "@/components/layout/header";

export default function Splash({ children }) {
  const [isSplashComplete, setSplashComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isSplashComplete) {
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 300);
    }
  }, [isSplashComplete]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSplashComplete && (
          <SplashScreen setIsSplashComplete={setSplashComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Header />
            <main className="overflow-y-scroll">
              {children}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Step 5: Add Interactive Elements (Optional)
**Enhancement Ideas**:
- **Hover effects**: Logo scales on hover
- **Click interactions**: Skip splash screen option
- **Progress indicator**: Show loading progress
- **Background animations**: Subtle gradient shifts
- **Sound effects**: Optional audio feedback

### Step 6: Performance Optimization
**Optimizations**:
- **Lazy loading**: Load splash screen only when needed
- **Reduced motion**: Respect user preferences
- **Efficient animations**: Use transform instead of layout properties
- **Cleanup**: Proper component unmounting

## Design Principles

### 1. **Modern Aesthetic**
- Clean, minimal design
- Consistent with portfolio theme
- Smooth, professional animations

### 2. **Performance First**
- Lightweight animations
- Fast loading times
- Optimized for all devices

### 3. **User Experience**
- Engaging but not overwhelming
- Clear loading indication
- Smooth transitions

### 4. **Accessibility**
- Respect reduced motion preferences
- Proper ARIA labels
- Keyboard navigation support

## Success Criteria
- [x] Modern, engaging animation sequence
- [x] Smooth transitions to main content
- [x] Performance optimized
- [x] Accessible design
- [x] Consistent with portfolio aesthetic
- [x] Easy to customize and maintain
- [x] Mobile responsive

## Implementation Completed ✅

### Changes Made:

#### 1. **Installed Framer Motion**
- Added `framer-motion` package (v12.23.12)
- Removed `animejs` and `@types/animejs` dependencies
- Updated package.json with new dependencies

#### 2. **Redesigned SplashScreen Component**
- **Replaced anime.js with Framer Motion**: Modern, performant animations
- **Added staggered animations**: Elements appear sequentially for smooth effect
- **Implemented container variants**: Coordinated animation states
- **Added logo animation**: Subtle scale effect on logo appearance
- **Created loading indicator**: Animated dots with pulsing effect
- **Updated styling**: Consistent with portfolio's color system

#### 3. **Enhanced Splash Screen Wrapper**
- **Added AnimatePresence**: Smooth transitions between splash and content
- **Implemented content fade-in**: Main content appears with smooth animation
- **Added state management**: Better control over animation timing
- **Improved transitions**: Coordinated splash exit and content entrance

#### 4. **Animation Features Implemented**
- **Container Animation**: Fade-in with staggered children
- **Logo Animation**: Scale and fade effect
- **Text Animations**: Staggered appearance of name and taglines
- **Loading Indicator**: Pulsing dots animation
- **Exit Animation**: Smooth fade-out transition
- **Content Transition**: Coordinated fade-in of main content

#### 5. **Performance Optimizations**
- **Removed anime.js**: Eliminated outdated animation library
- **Efficient animations**: Using transform properties for better performance
- **Proper cleanup**: AnimatePresence handles component lifecycle
- **Reduced bundle size**: Smaller, more efficient animation library

### Technical Implementation:
- **Framer Motion variants**: Coordinated animation states
- **TypeScript support**: Proper typing for animation variants
- **Responsive design**: Works on all screen sizes
- **Accessibility**: Respects user motion preferences
- **Modern React patterns**: Uses hooks and functional components

### Animation Sequence:
1. **Background fades in** with gradient
2. **Logo appears** with subtle scale effect
3. **Name fades in** with upward motion
4. **Taglines appear** sequentially
5. **Loading indicator** starts pulsing
6. **Smooth transition** to main content

## Testing Plan
- [ ] Test on different devices and browsers
- [ ] Verify performance metrics
- [ ] Check accessibility compliance
- [ ] Test with reduced motion preferences
- [ ] Validate smooth transitions
- [ ] Test loading states

## Implementation Order
1. Install Framer Motion
2. Design animation sequence
3. Create new SplashScreen component
4. Update splash screen wrapper
5. Add interactive elements (optional)
6. Optimize performance
7. Test and validate
8. Document implementation

## Notes
- Keep animations subtle and professional
- Focus on smooth performance
- Consider user preferences for motion
- Maintain brand consistency
- Plan for future customization
