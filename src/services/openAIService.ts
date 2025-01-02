import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
    new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

export const translateLocation = async (location: { Name: string; Address: string }) => {
    const prompt = `Translate "${location.Name}" and "${location.Address}"...`;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 500,
        });

        return JSON.parse(response.data.choices[0].text || '{}');
    } catch (error) {
        throw new Error(`OpenAI Translation Error: ${error.message}`);
    }
};

export const describeLocation = async (location: { Name: string }) => {
    const prompt = `Describe location "${location.Name}"...`;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 500,
        });

        return JSON.parse(response.data.choices[0].text || '{}');
    } catch (error) {
        throw new Error(`OpenAI Description Error: ${error.message}`);
    }
};
