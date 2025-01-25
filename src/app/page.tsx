"use client";

import { useState } from "react";
import { convertToMultiline, convertToSingleline } from "../utils/markdown-converter";

export default function Home() {
  const [multilineText, setMultilineText] = useState("");
  const [singlelineText, setSinglelineText] = useState("");
  const [debugInfo, setDebugInfo] = useState<{
    input?: string;
    processed?: string;
    copied?: string;
    action?: string;
  }>({});

  const handleConvertToSingleline = () => {
    const result = convertToSingleline(multilineText);
    setSinglelineText(result);
    setDebugInfo({
      action: "Convert to Single Line",
      input: `Input (${multilineText.length} chars):\n${JSON.stringify(multilineText)}`,
      processed: `Result (${result.length} chars):\n${JSON.stringify(result)}`
    });
  };

  const handleConvertToMultiline = () => {
    const result = convertToMultiline(singlelineText);
    setMultilineText(result);
    setDebugInfo({
      action: "Convert to Multi Line",
      input: `Input (${singlelineText.length} chars):\n${JSON.stringify(singlelineText)}`,
      processed: `Result (${result.length} chars):\n${JSON.stringify(result)}`
    });
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setDebugInfo({
        action: `Copy ${type}`,
        copied: `Copied text (${text.length} chars):\n${JSON.stringify(text)}`
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      setDebugInfo({
        action: `Copy ${type} Failed`,
        copied: `Error: ${err}`
      });
    }
  };

  return (
    <main className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Markdown Text Converter</h1>

        <div className="flex flex-col md:flex-row gap-4 items-stretch min-h-[75vh]">
          {/* Multiline Section */}
          <div className="flex-1 w-full">
            <div className="form-control w-full h-full">
              <label className="label">
                <span className="label-text">Multiline Text</span>
              </label>
              <textarea
                className="textarea textarea-bordered font-mono flex-1 h-[calc(75vh-6rem)]"
                value={multilineText}
                onChange={(e) => {
                  setMultilineText(e.target.value);
                  setDebugInfo({
                    action: "Multiline Input Changed",
                    input: `New value (${e.target.value.length} chars):\n${JSON.stringify(e.target.value)}`
                  });
                }}
                placeholder="Enter multiline text here..."
                spellCheck={false}
              />
              <button
                className="btn btn-outline btn-sm mt-2"
                onClick={() => handleCopy(multilineText, "Multiline")}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Conversion Buttons */}
          <div className="flex flex-col gap-2 justify-center">
            <button
              className="btn btn-primary"
              onClick={handleConvertToSingleline}
            >
              →
            </button>
            <button
              className="btn btn-primary"
              onClick={handleConvertToMultiline}
            >
              ←
            </button>
          </div>

          {/* Singleline Section */}
          <div className="flex-1 w-full">
            <div className="form-control w-full h-full">
              <label className="label">
                <span className="label-text">Singleline Text</span>
              </label>
              <textarea
                className="textarea textarea-bordered font-mono flex-1 h-[calc(75vh-6rem)]"
                value={singlelineText}
                onChange={(e) => {
                  setSinglelineText(e.target.value);
                  setDebugInfo({
                    action: "Singleline Input Changed",
                    input: `New value (${e.target.value.length} chars):\n${JSON.stringify(e.target.value)}`
                  });
                }}
                placeholder="Enter singleline text here..."
                spellCheck={false}
              />
              <button
                className="btn btn-outline btn-sm mt-2"
                onClick={() => handleCopy(singlelineText, "Singleline")}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
