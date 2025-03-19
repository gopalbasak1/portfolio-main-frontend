const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-20 h-20">
        {/* Outer Glowing Ring */}
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent border-t-[#00ff99] animate-spin"></div>

        {/* Middle Soft Glow */}
        <div className="absolute inset-2 w-full h-full rounded-full border-4 border-transparent animate-spin-slow"></div>

        {/* Inner Core */}
        <div className="w-8 h-8 bg-[#00ff99] rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default Spinner;
