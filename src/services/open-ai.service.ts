import {OpenAI} from "openai";
import {ChatDescriptionParams, ChatTranslationParams} from "../models/chat.model";
import {chatConfig} from "../configs/chat.config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export async function generateDescription(params: ChatDescriptionParams){
    const {prompt, chatModel, locationName, cityName, language} = params;

    const newPrompt = `${prompt}${cityName},${locationName}`;

    try {
        const response = await openai.chat.completions.create({
            model: chatModel,
            messages: [
                {
                    role: "system",
                    content: chatConfig.descriptionContent
                },
                { role: "user", content: newPrompt },
            ],
            max_tokens: 4500,
            temperature: 0.3,
        });

        return response.choices[0].message.content?.trim();
    } catch (error) {
        throw new Error(`OpenAI Description Error: ${error}`);
    }
}

export async function generateTranslation(params: ChatTranslationParams) {
    const {prompt, chatModel} = params;
    try {
        const response = await openai.chat.completions.create({
            model: chatModel,
            messages: [
                {
                    role: "system",
                    content: chatConfig.translationContent
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