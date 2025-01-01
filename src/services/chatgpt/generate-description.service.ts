import { OpenAI } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

interface Params {
  prompt: string;
  chatModel: string;
  content: string;
}

export const getLocationsDescription = async (params: Params) => {
  const { prompt, chatModel, content } = params;

  try {
    const response: any = await openai.chat.completions.create({
      model: chatModel,
      messages: [
        {
          role: "system",
          content: content,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 4500,
      temperature: 0.3,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.log(error);
    return null;
  }
};
