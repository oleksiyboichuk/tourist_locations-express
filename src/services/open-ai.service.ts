import {OpenAI} from "openai";
import {ChatParams} from "../models/chat.model";
import {config} from "../configs/chat.config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export async function generateTranslation(params: ChatParams) {
    const {prompt, chatModel} = params;
    try {
        const response = await openai.chat.completions.create({
            model: chatModel,
            messages: [
                {
                    role: "system",
                    content: config.translationContent
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 4500,
            temperature: 0.7,
        });

        return response.choices[0].message.content?.trim();
    } catch (error) {
        throw new Error(`OpenAI Translation Error: ${error}`);
    }
}

export async function generateDescription(params: ChatParams){
    const {prompt, chatModel} = params;

    try {
        const response = await openai.chat.completions.create({
            model: chatModel,
            messages: [
                {
                    role: "system",
                    content: config.descriptionContent
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 4500,
            temperature: 0.3,
        });

        return response.choices[0].message.content?.trim();
    } catch (error) {
        throw new Error(`OpenAI Description Error: ${error}`);
    }
}
