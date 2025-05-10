import React from 'react';
import { Ghost, Skull, Zap, Eye, Moon } from 'lucide-react';

function Logout() {
  return (
    <div className="min-h-screen bg-black text-red-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background fog */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/20 to-black opacity-30 animate-pulse z-0" />

      {/* Creepy header */}
      <div className="z-10 flex flex-col items-center space-y-4 text-center">
        <Skull className="w-16 h-16 animate-bounce text-red-700" />
        <h1 className="text-5xl font-black tracking-widest text-red-700 animate-pulse">
          YOU CAN NEVER ESCAPE
        </h1>
        <p className="text-xl text-gray-300 italic animate-fade-in">
          The logout failed... something is watching.
        </p>
      </div>

      {/* Scary icons row */}
      <div className="z-10 mt-12 flex gap-6 animate-flicker">
        <Ghost className="w-10 h-10 text-gray-400" />
        <Eye className="w-10 h-10 text-red-500" />
        <Zap className="w-10 h-10 text-yellow-400" />
        <Moon className="w-10 h-10 text-purple-500" />
      </div>

      {/* Whispering message */}
      <p className="absolute bottom-10 text-sm text-gray-700 animate-fade-in">
        It’s too late to turn back...
      </p>
    </div>
  );
}

export default Logout;
