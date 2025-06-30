"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Loader2, AlertCircle } from "lucide-react"

interface TypingAssistantProps {
  placeholder?: string
  debounceMs?: number
  className?: string
}

export default function TypingAssistant({
  placeholder = "Start typing to get suggestions...",
  debounceMs = 500,
  className = "",
}: TypingAssistantProps) {
  const [text, setText] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestion = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setSuggestion("")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setSuggestion(data.suggestion || "")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch suggestion")
      setSuggestion("")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced API call
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestion(text)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [text, debounceMs, fetchSuggestion])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const applySuggestion = () => {
    if (suggestion) {
      setText(text + suggestion)
      setSuggestion("")
    }
  }

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-4 ${className}`}>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          rows={6}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute top-2 right-2 text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Suggestion display */}
      {suggestion && !isLoading && !error && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Suggestion:</span>
            <button
              onClick={applySuggestion}
              className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors duration-200"
            >
              Apply
            </button>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-gray-600">{text}</span>
            <span className="text-gray-400 italic">{suggestion}</span>
          </div>
        </div>
      )}

      {/* Character count */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{text.length} characters</span>
        {isLoading && <span>Getting suggestions...</span>}
      </div>
    </div>
  )
}
