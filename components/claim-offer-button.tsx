'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ClaimOfferButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {!isClicked ? (
        <button
          onClick={handleClick}
          className="transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <Image
            src="/claim.png"
            alt="Claim Offer"
            width={200}
            height={100}
            className="cursor-pointer"
            priority
          />
        </button>
      ) : (
        <div className="animate-fade-in">
          <Image
            src="/scene1.png"
            alt="Scene 1"
            width={300}
            height={200}
            priority
          />
        </div>
      )}
    </div>
  );
}