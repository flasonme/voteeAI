import fs from 'fs';
import { wordleAPI } from '../utils/api';
export class WordleService {

  /** Array to store valid words loaded from file */
  private words: string[] = [];
  /** Length of the word to guess (default 5 for standard Wordle) */
  private WORD_LENGTH: number = 5;
  /** Most common vowels in English, ordered by frequency */
  private FREQUENCY_LETTERS: string[] = ['a', 'e', 'u', 'i', 'o'];
  constructor() {
  }

  /**
   * Loads valid words from a text file into memory
   * Words are filtered to match the required length and contain only letters
   */
  public loadWord() {
    try {
        const wordTxt = fs.readFileSync('./words.txt', 'utf8');
        this.words = wordTxt.split('\n').map(word => word.trim().toLowerCase())
        .filter(word => word.length === this.WORD_LENGTH)  // Only keep words of correct length
        .filter(word => /^[a-z]+$/.test(word))            // Only keep words containing letters
    } catch (error) {
        console.error('Error loading words:', error);
    }
  }

  /**
   * Solve the daily wordle puzzle
   * @param size - Length of the word to guess
   * @returns The correct word if found, empty string if not
   * 
   * @description Strategy:
   * 1. Load the dictionary of valid words
   * 2. Start with vowels: Try words made of single repeated vowels (e.g., 'aaaaa')
   *    This helps identify if these common letters are present
   * 3. Track correct letters and their positions
   * 4. Once some letters are found, use regex to find matching words
   * 5. Try these matching words until solution is found
   * 6. Implements guess limiting and word tracking to prevent infinite loops
   */
  public async solveDaily(size: number) {
    this.WORD_LENGTH = size;
    let attempt = 0;
    let correctLetters: { [key: number]: string } = {};
    let correctGuess: string = '';
    let matchingWords: string[] = [];
    let currentGuess = '';
    let usedWords: Set<string> = new Set();

    while (Object.keys(correctLetters).length !== this.WORD_LENGTH && attempt < 100) {
        if(attempt === 0) {
            this.loadWord();
            // First guess: repeated most common vowel
            currentGuess = this.FREQUENCY_LETTERS[attempt].repeat(this.WORD_LENGTH);
        }

        console.log(currentGuess);
        
        const dailyWordle = await wordleAPI.guessDaily(currentGuess, this.WORD_LENGTH);

        usedWords.add(currentGuess);

        for(const guess of dailyWordle) {
            if(guess.result === 'correct') {
                // Store correct letters with their positions
                correctLetters[guess.slot] = guess.guess;
            }
        }

        attempt++;

        if(Object.keys(correctLetters).length === 0) {
            // If no correct letters found, try next vowel
            currentGuess = this.FREQUENCY_LETTERS[attempt].repeat(this.WORD_LENGTH);
        } else if(Object.keys(correctLetters).length === this.WORD_LENGTH) {
            // All letters found - we have the answer
            correctGuess = currentGuess;
            break;
        } else {
            // Some letters found - use regex to find matching words
            const regex = this.createRegex(correctLetters);
            matchingWords = this.words
                .filter(word => regex.test(word))
                .filter(word => !usedWords.has(word));  // Avoid repeating guesses
            currentGuess = matchingWords[0] || '';
        }
    }

    return correctGuess;
  }

  /**
   * Creates a regex pattern based on known correct letters
   * @param correctLetters - Object mapping position to correct letter
   * @returns RegExp that matches words with correct letters in known positions
   * 
   * Example: If we know position 0 is 'a' and position 2 is 't',
   * for a 5-letter word, returns /^a.t..$/
   */
  private createRegex(correctLetters: { [key: number]: string }) {
    const regexParts: string[] = [];

    for(let i = 0; i < this.WORD_LENGTH; i++) {
        if(correctLetters[i]) {
            regexParts.push(correctLetters[i]);
        } else {
            regexParts.push('.');
        }
    }

    return new RegExp(`^${regexParts.join('')}$`);
  }
} 