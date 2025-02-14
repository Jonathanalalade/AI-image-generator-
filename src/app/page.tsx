import ImageGenerator from './components/ImageGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>

      {/* Top navigation bar */}
      <div className="relative z-10 bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1">
              <span className="text-xl font-semibold text-white">Home</span>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold text-white">AI Image Generator</h1>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageGenerator />
      </main>
    </div>
  );
}
