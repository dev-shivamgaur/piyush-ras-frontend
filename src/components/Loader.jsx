const Loader = () => {

return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50 cursor-not-allowed">
    
    <div className="bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-3">
      
      {/* Loader */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      <p className="text-gray-700 font-medium">
        Please wait... your request is processing
      </p>

    </div>
  </div>
)}

export default Loader;