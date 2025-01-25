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
      <div className="container mx-auto relative">
        {/* GitHub Link */}
        <a
          href="https://github.com/jameschan617/oneline-md-processer"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-0 top-0 btn btn-ghost btn-sm normal-case gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>

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
