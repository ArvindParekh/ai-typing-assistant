import TypingAssistant from "@/components/typing-assistant"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Typing Assistant</h1>
          <p className="text-gray-600">Start typing to get intelligent autocomplete suggestions</p>
        </div>

        <TypingAssistant placeholder="Write your thoughts here..." debounceMs={300} />
      </div>
    </div>
  )
}
