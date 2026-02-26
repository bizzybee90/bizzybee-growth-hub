

# Fix GrowthTrapStory: Text Overlap, Scroll Distance, and Stage Timing

## Problem
The current GrowthTrapStory has several technical issues:
- The intro headline overlaps with Stage 1 content (fade-out timing is wrong)
- 600vh scroll height creates too much dead space between stages
- Stage transitions have dead zones where nothing happens
- Background colors and notifications are misaligned with stage content

## Changes (single file: `src/components/GrowthTrapStory.tsx`)

### 1. Updated copy
Remove `title` from each stage object, replace with `icon`. Update all five stage descriptions to the approved v2 copy (longer, more narrative text). Stage 4 icon changes from the lightbulb to a trap emoji.

### 2. Fix text overlap (the main visual bug)
- Intro headline: fade out completely by progress 0.10 and translate up 40px
- Stage content: fade in starting at progress 0.06, fully visible by 0.12
- This creates a clean handoff with no overlap

### 3. Reduce scroll height: 600vh to 400vh
Cuts a third of the dead space so each stage takes one comfortable scroll.

### 4. Simplify stage boundaries
Remove the complex intro/outro zones (old: 0-0.08 and 0.88-1). Each stage gets exactly 20% of the scroll: `Math.min(4, Math.floor(v * 5))`.

### 5. Align background colors to stages
- Progress 0-0.2: warm white (Stage 0)
- Progress 0.2-0.4: barely tinted (Stage 1)
- Progress 0.4-0.6: deep brown (Stages 2-3, tipping point/reversal)
- Progress 0.75-0.9: sunrise glow (Stage 4, the way out)

### 6. Align notifications to dark stages
Visible from progress 0.35-0.78 (covering Tipping Point and Reversal). Bee clearing moves to progress 0.74-0.9.

### 7. Replace font-mono-label class
Use inline Tailwind: `text-xs font-semibold tracking-[0.2em] uppercase` to guarantee correct rendering.

### 8. Mobile version
Updated to match the new copy (icon instead of emoji, no title, just label + description).

