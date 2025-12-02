import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
             <div className="w-8 h-8 bg-emerald-500 rounded-lg rotate-45 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs -rotate-45">Q</span>
             </div>
             <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Al-Qur'an Digital</h1>
                <p className="text-xs text-emerald-600 font-medium">Kelompok Kopi Liong Es 1</p>
             </div>
          </Link>
          
          <div className="hidden md:block text-sm text-gray-500">
              Lorem Ipsum
          </div>
        </div>
      </div>
    </nav>
  );
}