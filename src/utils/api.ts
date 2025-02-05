import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://wordle.votee.dev:8000';

export interface WordleGuessResponse {
    slot: number;
    guess: string;
    result: string;
}

export const wordleAPI = {
    guessDaily: async (guess: string, size: number = 5): Promise<WordleGuessResponse[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/daily?guess=${guess}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error guessing daily:', (error as AxiosError).response?.data);
            return [];
        }
    }
}