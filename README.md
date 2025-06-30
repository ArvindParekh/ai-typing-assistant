# AI Typing Assistant

A smart writing companion that suggests text completions as you type. Built while learning modern web development patterns and AI integration.

## What it does

Start typing in the text area and watch as the app suggests continuations for your thoughts. The suggestions come from Google's Gemini AI model, which analyzes your writing context and offers relevant completions.

## Features

- **Real-time suggestions**: Get AI-powered text completions as you write
- **Smart debouncing**: Waits for you to pause typing before making API calls
- **Error handling**: Shows helpful messages when things go wrong  
- **Loading states**: Visual feedback while fetching suggestions
- **One-click apply**: Accept suggestions with a single button press
- **Character counter**: Keep track of your writing length

## Tech stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Google Gemini AI** - Text generation via the AI SDK
- **Lucide React** - Clean icons

## Getting started

First, you'll need a Google AI API key. Get one from [Google AI Studio](https://aistudio.google.com/).

```bash
# Clone and install
pnpm install

# Set up your environment
cp .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY to .env.local

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start typing to see the magic happen.

## How it works

The typing assistant uses a debounced approach to avoid hammering the API. When you stop typing for 300ms, it sends your current text to the `/api/autocomplete` endpoint. The backend calls Google's Gemini model with a simple prompt asking for text completion.

The React component handles loading states, errors, and suggestion display. When you like a suggestion, click "Apply" to add it to your text.

## Learning notes

This project helped me explore:
- Integrating AI APIs into web apps
- Proper debouncing techniques for user input
- Error boundaries and loading states in React
- Next.js API routes and server actions
- TypeScript patterns for props and state management

## What's next

Some ideas for improvements:
- Multiple suggestion options
- Different AI models to compare outputs
- Suggestion history and favorites
- Custom prompts and writing styles
- Keyboard shortcuts for faster workflow

## Environment variables

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

---

Built while learning modern web development. Contributions and suggestions welcome!
