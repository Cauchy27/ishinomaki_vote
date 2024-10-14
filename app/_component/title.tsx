"use client";

import * as React from 'react';
import { useState } from 'react';

const Title2 = ({ setTitle }) => {
  const [color, setColor] = useState('bg-fuchsia-500');
  
  const toggleColor = () => {
    setColor(prevColor => (prevColor === 'bg-fuchsia-500' ? 'bg-pink-400' : 'bg-fuchsia-500'));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-200 to-blue-200 flex justify-center items-center flex-col">
      <div>
        <p className="text-center text-6xl font-comic-sans text-blue-900 drop-shadow-[2px_2px_5px_rgba(255,182,193,0.5)]">
        ❤️ぱふぇぱはれ❤️
        </p>
        <p className="text-center text-6xl font-comic-sans text-blue-900 drop-shadow-[2px_2px_5px_rgba(255,182,193,0.5)]">
        〜きゅん とうひょう〜
        </p>
      </div>
      <button
        onClick={() => { toggleColor(); setTitle(); }}
        className={`${color} text-white px-12 py-5 rounded-full text-2xl font-bold cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110`}
      >
        スタート
      </button>
    </div>
  );
};

export default Title2;