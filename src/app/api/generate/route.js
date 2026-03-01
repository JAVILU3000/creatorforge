import OpenAI from "openai";

export async function POST(req) {
    try {
        const { niche } = await req.json();

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Eres un experto en crecimiento de canales de YouTube y TikTok.",
                },
                {
                    role: "user",
                    content: `Dame 10 ideas virales de contenido para este nicho: ${niche}. 
          Incluye título atractivo y breve explicación por cada idea.`,
                },
            ],
        });

        return Response.json({ result: completion.choices[0].message.content });
    } catch (error) {
        return Response.json({ error: "Error generando ideas" }, { status: 500 });
    }
}