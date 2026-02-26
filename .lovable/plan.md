
# Growth Trap Redesign + Copy Updates

## Overview
Restructure the Growth Trap into a left-right alternating slide layout with updated copy, modify the Pain Points section headings, update the Testimonials heading, and update the "Meet BizzyBee" copy. Pain Points section stays as a separate section below.

---

## 1. Rewrite GrowthTrapStory.tsx -- Alternating Slide Layout

Replace the entire pinned scroll storytelling with a new left-right alternating layout.

**New stages data (7 slides + 1 full-width):**

| # | Slide From | Heading | Content |
|---|-----------|---------|---------|
| 1 | Left | You started with a phone and a promise | (keep existing stage 1 description) |
| 2 | Right | Then the enquiries started flooding in | (keep existing stage 2 description) |
| 3 | Left | Growth = chaos. | "More leads should be exciting. Instead, each new customer adds more chaos to your plate." |
| 4 | Right | Busier -- not better. | Long-form poetic copy (the "People ask..." block provided) |
| 5 | Left | The buzz runs out. | Existing "Reputation at Risk" subtext about burnout |
| 6 | Right | Missed messages = missed honey | Keep existing subtext exactly |
| 7 | Left | Admin that steals your evenings | Keep existing subtext exactly |
| 8 | Full-width | BizzyBee gives you your buzz back. | New copy: "No more 10pm email marathons..." |

**Desktop behaviour:**
- Each slide animates into view with `whileInView` using framer-motion
- Odd slides: content starts offset left (`x: -60, opacity: 0` -> `x: 0, opacity: 1`)
- Even slides: content starts offset right (`x: 60, opacity: 0` -> `x: 0, opacity: 1`)
- Final "Meet BizzyBee" slide is centred full-width
- No pinning -- standard scroll with viewport-triggered reveals
- Easing: `[0.16, 1, 0.3, 1]` (existing site standard)
- No bounce, no spring -- clean `tween` transitions
- `viewport: { once: true, margin: "-80px" }` to prevent re-triggering on scroll-back
- Generous vertical spacing between slides (~120-160px)

**Mobile behaviour:**
- Same stacked layout with gentle fade-up reveals (`y: 30` -> `y: 0`)
- No left-right offset on mobile (all centred)
- Reduced vertical spacing

**Typography:**
- Stages 3-5 (tension): tighter line-height (1.3-1.5), heavier weight
- Stage 8 (relief): relaxed line-height (1.8), normal weight

**Background:**
- Keep warm-to-dark colour shifts as scroll progresses using CSS gradients on individual slide containers
- Notification pills and bee animation removed (not requested here)

**Progress indicator:**
- Retain the dot-based progress indicator, updated for 8 stages

---

## 2. Update PainPoints.tsx -- Two Heading Changes

Modify only two of the four pain point cards:

- Card 3 title: "Growth that doesn't scale" -> **"Growth = chaos."**  
  Subtext stays: "More leads should be exciting..."

- Card 4 title: "Reputation at risk" -> **"The buzz runs out."**  
  Subtext stays: "One slow reply..."

Cards 1 and 2 remain completely untouched.

---

## 3. Update Testimonials.tsx -- "Bzzznesses" Heading

Change the section heading from:
> "Trusted by UK service businesses"

To:
> "Trusted by UK service **Bzzznesses**"

The "Bzzznesses" will have:
- Capital B
- The three z's styled with a subtle golden colour (`hsl(35, 55%, 55%)` -- the site's primary) and a slight `translateY(-1px)` lift
- Achieved with a `<span>` wrapping "zzz" inside the word

---

## 4. Update FinalCTA.tsx -- No Changes

Already matches the requested copy. Confirmed:
- Heading: "Let BizzyBee give you your buzz back."
- Subtext: "Your evenings aren't a luxury. They're the whole point."
- No modifications needed.

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/GrowthTrapStory.tsx` | Full rewrite: alternating left-right slides, new stages data, new layout |
| `src/components/PainPoints.tsx` | Two title string changes (lines 17, 22) |
| `src/components/Testimonials.tsx` | Heading text + styled "zzz" span (line 31) |

No changes to `Index.tsx`, `Hero.tsx`, `FinalCTA.tsx`, or any other component.
