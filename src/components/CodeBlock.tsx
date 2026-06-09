import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = 'bash', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-gray-700/50">
      {title && (
        <div className="bg-gray-800/80 px-4 py-2 text-xs text-gray-400 flex items-center justify-between border-b border-gray-700/50">
          <span>{title}</span>
          <span className="text-cyan-500/60 font-mono text-[10px]">{language}</span>
        </div>
      )}
      <div className="relative bg-[#0d1117] p-4">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
        <pre className="text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
