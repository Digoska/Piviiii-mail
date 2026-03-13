import { Email } from "@/types/email";

export const mockEmails: Email[] = [
  {
    id: "1",
    from: {
      name: "Sarah Chen",
      email: "sarah.chen@stripe.com",
      avatar: "SC",
    },
    to: "nikodem@nikodemmail.ai",
    subject: "Re: API Integration — Final Review Needed",
    preview: "Hey Nikodem, I've pushed the updated webhook handlers to the staging branch. Can you take a look before we...",
    body: `Hey Nikodem,

I've pushed the updated webhook handlers to the staging branch. Can you take a look before we deploy to production on Friday?

The main changes are:
• Refactored the payment intent flow to handle 3D Secure callbacks
• Added retry logic for failed webhook deliveries (max 3 attempts with exponential backoff)
• Updated the idempotency key generation to prevent duplicate charges

I've also attached the load test results — we're seeing ~2.3ms p99 latency which is well within our SLA.

Let me know if you have any questions. Happy to hop on a call if needed.

Best,
Sarah`,
    timestamp: "2 min ago",
    read: false,
    starred: true,
    labels: ["Engineering", "Urgent"],
  },
  {
    id: "2",
    from: {
      name: "Marcus Williams",
      email: "marcus@figma.com",
      avatar: "MW",
    },
    to: "nikodem@nikodemmail.ai",
    subject: "Design System v3.0 — Component Library Ready",
    preview: "The new component library is ready for handoff. I've exported all tokens and added Storybook documentation...",
    body: `Hi Nikodem,

The new component library is ready for handoff. I've exported all tokens and added Storybook documentation for every component.

Key highlights:
• 47 new components with dark mode variants
• Figma variables synced with your Tailwind config
• Interactive prototypes for the onboarding flow

You can access everything at figma.com/file/nikodemmail-ds-v3

Let me know when you'd like to schedule the design review!

Cheers,
Marcus`,
    timestamp: "18 min ago",
    read: false,
    starred: false,
    labels: ["Design"],
  },
  {
    id: "3",
    from: {
      name: "Elena Rodriguez",
      email: "elena.r@ycombinator.com",
      avatar: "ER",
    },
    to: "nikodem@nikodemmail.ai",
    subject: "YC W25 — Interview Schedule Confirmation",
    preview: "Congratulations! We'd like to confirm your interview slot for next Tuesday at 2:00 PM PST. Please prepare...",
    body: `Dear Nikodem,

Congratulations! We'd like to confirm your interview slot for next Tuesday at 2:00 PM PST.

Please prepare a 3-minute demo of NikodemMail AI focusing on:
1. The real-time collaboration features
2. Your AI-powered email composition engine
3. Growth metrics and user retention data

The panel will include myself, Dalton Caldwell, and Jared Friedman. The interview will be conducted via Zoom — link will be sent 30 minutes prior.

Looking forward to meeting you!

Best regards,
Elena Rodriguez
Partner, Y Combinator`,
    timestamp: "1 hour ago",
    read: true,
    starred: true,
    labels: ["Important"],
  },
  {
    id: "4",
    from: {
      name: "Alex Kim",
      email: "alex.kim@vercel.com",
      avatar: "AK",
    },
    to: "nikodem@nikodemmail.ai",
    subject: "Edge Function Optimization — 40% Latency Reduction",
    preview: "Great news! After implementing the streaming SSR changes we discussed, cold start times dropped from 120ms...",
    body: `Hey Nikodem,

Great news! After implementing the streaming SSR changes we discussed, cold start times dropped from 120ms to 72ms globally.

Here's what we changed:
• Moved to edge runtime for all API routes
• Implemented incremental static regeneration for the inbox view
• Added regional caching for frequently accessed threads

The dashboard at vercel.com/nikodemmail shows the full breakdown. Your users in EU and APAC should see significant improvements.

Want to co-author a blog post about the optimization journey? Could be great for both our communities.

Best,
Alex`,
    timestamp: "3 hours ago",
    read: true,
    starred: false,
    labels: ["Engineering"],
  },
  {
    id: "5",
    from: {
      name: "Priya Sharma",
      email: "priya@anthropic.com",
      avatar: "PS",
    },
    to: "nikodem@nikodemmail.ai",
    subject: "Claude API — Custom Model Fine-tuning Access",
    preview: "Your application for early access to Claude fine-tuning has been approved! We're excited to see how you'll...",
    body: `Hi Nikodem,

Your application for early access to Claude fine-tuning has been approved! We're excited to see how you'll integrate this into NikodemMail AI.

Your access includes:
• Custom fine-tuning on Claude Sonnet for email tone matching
• 10M tokens/month for training
• Priority support from our solutions engineering team
• Access to the new function calling beta

API keys and documentation have been added to your Anthropic dashboard. Our team would love to feature NikodemMail AI as a case study — would you be open to that?

Excited to see what you build!

Best,
Priya Sharma
Developer Relations, Anthropic`,
    timestamp: "Yesterday",
    read: true,
    starred: false,
    labels: ["AI", "Partnership"],
  },
];
