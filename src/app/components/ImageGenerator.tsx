'use client';

import { ImageIcon, Download, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  const handleDownloadImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fal/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images');
      }

      setImageUrls(data.images?.map((img: any) => img.url) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Input field */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-purple-50 text-gray-700 placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none relative disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-purple-400 before:to-purple-600 before:-z-10 before:content-['']"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </form>

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          // Loading placeholders
          Array(4).fill(null).map((_, index) => (
            <div
              key={`loading-${index}`}
              className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 animate-pulse"
            >
              <ImageIcon className="w-12 h-12 text-gray-300" />
            </div>
          ))
        ) : imageUrls.length > 0 ? (
          // Generated images
          imageUrls.map((url, index) => (
            <div
              key={`image-${index}`}
              className="aspect-square rounded-lg overflow-hidden border border-gray-200 relative group"
            >
              <Image
                src={url}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-cover"
                width={512}
                height={512}
                unoptimized
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopyImage(url, index)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Copy image"
                >
                  {copiedIndex === index ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 animate-scale" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => handleDownloadImage(url, index)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Download image"
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          // Initial placeholder state
          Array(4).fill(null).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200"
            >
              <ImageIcon className="w-12 h-12 text-gray-300" />
            </div>
          ))
        )}
      </div>
    </div>
  );
} 