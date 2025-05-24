export default function TestPage() {
  return (
    <div className="min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">Tailwind CSS Test Page</h1>
        <p className="text-gray-700 mb-4">This is a test page to check if Tailwind CSS styles are being applied correctly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500 text-white p-4 rounded-lg">Red Box</div>
          <div className="bg-green-500 text-white p-4 rounded-lg">Green Box</div>
          <div className="bg-blue-500 text-white p-4 rounded-lg">Blue Box</div>
        </div>
        
        <div className="mt-8 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Button Tests</h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Purple Button
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Yellow Button
            </button>
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
              Pink Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
