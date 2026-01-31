
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
});



export async function POST(req: Request) {
    let idea = "";
    let vibe = "";

    try {
        const body = await req.json();
        idea = body.idea;
        vibe = body.vibe;

        if (!idea) {
            return new Response('Idea is required', { status: 400 });
        }

        const prompt = `
      Act as a world-class marketing strategist.
      Create a launch campaign for the following project:
      
      Project Idea: "${idea}"
      Vibe/Tone: "${vibe}"
      
      Output exactly 3 sections in markdown format:
      1. **Headline & Value Prop**: A catchy H1 and subheader.
      2. **Social Media Plan**: 3 tweet ideas and 1 LinkedIn post concept.
      3. **Landing Page Structure**: 5 key sections to include.
      
      Do not include any conversational filler. Just the output.
    `;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        // Create a ReadableStream from the OpenAI stream
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    controller.enqueue(new TextEncoder().encode(content));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });

    } catch (error) {
        console.error('Error in generate-campaign:', error);

        // Fallback for Demo if Quota Exceeded
        let mockResponse = "";

        const lowerIdea = idea.toLowerCase();

        if (lowerIdea.includes("coffee") || lowerIdea.includes("food") || lowerIdea.includes("cafe")) {
            mockResponse = `
# ☕ Sip: The Art of Coffee

## 1. Headline & Value Prop
**Headline:** Fresh Roasted Perfection, Delivered.
**Subheader:** Experience the world's finest beans without leaving your doorstep. Ethical sourcing, artisanal roasting, sustainable sipping.

## 2. Social Media Plan
**Twitter Thread:**
1/5 Most coffee is stale before you buy it. 🤢
2/5 We urge you to stop drinking bad coffee. Life is too short. 🛑
3/5 Introducing Sip: Beans roasted 24 hours before shipping. 🔥
4/5 Taste the difference of true freshness. 🌿
5/5 Get your first bag free. [Link] #CoffeeLover #SpecialtyCoffee

**LinkedIn Post:**
Productivity starts with a great cup of coffee.
But office coffee usually sucks.
We are changing that with Sip for Business.
Elevate your team's morning ritual. DM for a free tasting. ☕ 

## 3. Landing Page Structure
1. **Hero Section**: Close-up video of espresso pouring with steam.
2. **The Origin**: Map showing our direct-trade farms in Ethiopia and Colombia.
3. **The Roast**: Time-lapse of our small-batch roasting process.
4. **Subscription**: "Never run out" feature explanation.
5. **Final CTA**: "Order Sample Kit" button.
`;
        } else if (lowerIdea.includes("story") || lowerIdea.includes("kid") || lowerIdea.includes("book") || lowerIdea.includes("game")) {
            mockResponse = `
# 🎈 DreamWeaver: Stories That Live

## 1. Headline & Value Prop
**Headline:** Make Your Child the Hero.
**Subheader:** AI-generated bedtime stories where your kid saves the day. Personalized adventures, magical illustrations, endless imagination.

## 2. Social Media Plan
**Twitter Thread:**
1/5 Bedtime is a struggle. We fixed it. 🛌
2/5 Imagine a story where *your* child fights the dragon. 🐉
3/5 "My son asks for this every night now!" - Happy Mom 🌟
4/5 Create your first magical journey in seconds. ✨
5/5 [Link] #ParentingHacks #BedtimeStories #AI

**LinkedIn Post:**
Creativity is the most important skill for the future.
We built DreamWeaver to spark imagination in the next generation.
Not just a screen, but a portal to new worlds.
Download the beta today. 🚀

## 3. Landing Page Structure
1. **Hero Section**: Whimsical illustration of a child flying over a city.
2. **How It Works**: 3-step process (Upload photo, pick theme, generate).
3. **Gallery**: Showcase of stunning book covers.
4. **Safety First**: Explanation of child-safe content filters.
5. **Final CTA**: "Create Free Story".
`;
        } else if (lowerIdea.includes("crypto") || lowerIdea.includes("finance") || lowerIdea.includes("money") || lowerIdea.includes("invest")) {
            mockResponse = `
# 💸 Vault: Defi for Everyone

## 1. Headline & Value Prop
**Headline:** Your Wealth, Your Rules.
**Subheader:** The first crypto wallet that feels like a bank but acts like a fortress. Zero fees, instant swaps, total control.

## 2. Social Media Plan
**Twitter Thread:**
1/5 Banks are slow. Crypto is hard. Vault is neither. ⚡
2/5 Stop paying $20 to move your own money. 💸
3/5 Security doesn't have to be complicated. 🔒
4/5 Your keys, your coins, your future. 🔑
5/5 Join the waitlist. [Link] #DeFi #Crypto #Web3

**LinkedIn Post:**
The financial system is due for an upgrade.
Vault bridges the gap between traditional finance and Web3.
Institutional grade security with consumer grade UX.
Early access starts now. 💼

## 3. Landing Page Structure
1. **Hero Section**: Sleek 3D animation of the Vault card/app.
2. **Features**: Comparison table vs Traditional Banks.
3. **Security**: Audited by top firms (badges).
4. **Yield**: Live ticker showing APY rates.
5. **Final CTA**: "Download App".
`;
        } else {
            // Default Productivity Mock
            mockResponse = `
# 🚀 Launch: The Future of Productivity

## 1. Headline & Value Prop
**Headline:** Reclaim Your Time. Master Your Flow.
**Subheader:** The all-in-one workspace that adapts to your brain, not the other way around. Stop fighting your tools and start building your legacy.

## 2. Social Media Plan
**Twitter Thread:**
1/5 Feeling overwhelmed? You're not alone. The modern stack is broken. 🛑
2/5 We built a tool that thinks like you do. Fluid, fast, and distraction-free. 🧠
3/5 "It's like an extension of my mind." - Early Beta User 💭
4/5 Join the revolution. Sign up for early access today. 👇
5/5 [Link] #Productivity #FutureOfWork

**LinkedIn Post:**
Work shouldn't feel like a battle against your inbox.
Introducing [Project Name], the intelligent workspace designed for deep work.
We are rethinking how teams collaborate, removing the noise, and amplifying the signal.
Join us on this journey. Link in comments. 👇

## 3. Landing Page Structure
1. **Hero Section**: High-impact visual of the dashboard with a "Get Started" CTA.
2. **The Problem**: Show the chaos of current tools (too many tabs, notifications).
3. **The Solution**: Feature breakdown (Focus Mode, AI Assistant, Seamless Sync).
4. **Social Proof**: Testimonials from high-performing founders.
5. **Final CTA**: "Join the exclusive waitlist" with an email capture form.
`;
        }

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                const chunks = mockResponse.split(/(?=[ #\n])/); // Split by reasonable chunks
                for (const chunk of chunks) {
                    controller.enqueue(encoder.encode(chunk));
                    await new Promise(r => setTimeout(r, 20)); // Fast typing
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    }
}
