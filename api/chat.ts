export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    }),
  }
);
      

    const data = await response.json();
    console.log("Gemini RAW response:", JSON.stringify(data, null, 2));

    const reply =
  data?.candidates?.[0]?.content?.parts
    ?.map((p: any) => p.text)
    .join(" ") || "No response from AI";

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error connecting to AI" });
  }
}
