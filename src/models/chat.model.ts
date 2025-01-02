export interface ChatParams {
    chatModel: string;
    locationName: string;
    language: string;
}

export interface ChatTranslationParams extends ChatParams {
    prompt: string;
    locationAddress: string;
}

export interface ChatDescriptionParams extends ChatParams {
    prompt: string;
    cityName: string;
}