# Wordle Solver API

An intelligent API service that automatically solves daily Wordle puzzles using a strategic approach based on letter frequency analysis and pattern matching.

## Features

- 🎯 Solves daily Wordle puzzles automatically
- 🔄 Supports custom word lengths (default: 5 letters)
- 📊 Uses letter frequency analysis for optimal guessing
- 🔍 Implements smart pattern matching with regex
- 🚫 Prevents duplicate guesses
- 📝 Maintains a dictionary of valid words

## Technical Stack

- Node.js with Express
- TypeScript
- Axios for HTTP requests
- Environment configuration with dotenv
- CORS enabled

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd technicaltest
```

2. Install dependencies:
```bash
npm install
```

3. Create a words.txt file in the root directory with your dictionary of words (one word per line)

4. Build the project:
```bash
npm run build
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### API Endpoints

#### GET /solve
Solves the daily Wordle puzzle.

Query Parameters:
- `size` (optional): Length of the word to solve (default: 5)

Example:
```bash
curl "http://localhost:3000/solve?size=5"
```

## How It Works

The solver uses a sophisticated strategy to find the solution:

1. **Dictionary Loading**: Loads and filters valid words from a text file based on word length and character validity.

2. **Vowel-First Approach**: Starts with common vowels to identify their presence in the word.

3. **Pattern Matching**: Uses regex patterns to find potential matches based on correct letter positions.

4. **Optimization**: 
   - Tracks used words to prevent duplicate guesses
   - Implements attempt limiting to prevent infinite loops
   - Uses letter frequency analysis for optimal initial guesses

## Development

### Available Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the TypeScript project
- `npm start`: Run the built project
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues

### Project Structure

```
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── words.txt            # Dictionary file
└── package.json
```

## Dependencies

### Production
- express: Web framework
- axios: HTTP client
- cors: Cross-origin resource sharing
- dotenv: Environment configuration

### Development
- TypeScript and related tools
- ts-node-dev: Development server
- ESLint: Code linting

### Future Improvement
- Improve the structure of the projects
- Adding some new packages to logs and tracking request
- Error Handling and Unit Test
- Improve the algorithms
- Automate run guess on every size
- Implement Guess Random and Guess Word

## Credit
- Thank to the english dictionary by [dwyl/english-words](https://github.com/dwyl/english-words)
