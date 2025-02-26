"use client";
import Link from "next/link";
import { useState } from "react";
import { useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import LoginCard from './LoginCard';

function Header() {
  const { isSignedIn } = useUser();

  // Logic to set active link
  const [activeLink, setActiveLink] = useState<string>("Home");

  const hanldeNavClick = (link: string) => {
    setActiveLink(link);
  };

  const [showLoginCard, setShowLoginCard] = useState(false);

  const toggleLoginCard = () => {
    setShowLoginCard(!showLoginCard);
  };

  return (
    <div className="w-full h-[15vh] flex items-center justify-between px-8 border-b border-gray-300">
      {/* Logo Section */}
      <div className="w-1/10 flex justify-center items-center mr-32">
        <Image src="/images/ai.png" alt="logo" width={60} height={60} className="w-full" />
      </div>

      {/* Navigation Menu */}
      <ul className="flex items-center list-none gap-8 p-4 rounded-lg">
        <Link href="/Home" className={`relative cursor-pointer transition duration-400 ${activeLink === "Home" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"}`} onClick={() => hanldeNavClick("Home")}>Home</Link>

        <Link href="/verify" className={`relative cursor-pointer transition duration-400 ${activeLink === "Verify" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"}`} onClick={() => hanldeNavClick("Verify")}>Verify</Link>

        <Link href="/explore" className={`relative cursor-pointer transition duration-400 ${activeLink === "Explore" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"}`} onClick={() => hanldeNavClick("Explore")}>Explore</Link>

        <Link href="/discover" className={`relative cursor-pointer transition duration-400 ${activeLink === "Discover" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"}`} onClick={() => hanldeNavClick("Discover")}>Discover</Link>

        <Link href="/about" className={`relative cursor-pointer transition duration-400 ${activeLink === "AboutUS" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"}`} onClick={() => hanldeNavClick("AboutUs")}>About Us</Link>
      </ul>

      {/* Profile & Auth Buttons */}
      <ul className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <div className="scale-70">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonTrigger: "focus:shadow-outline-purple"
                }
              }}
            />
            </div>
          </>
        ) : (
          <button onClick={toggleLoginCard} className="button">Log In</button>
        )}
      </ul>

      {showLoginCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          onClick={toggleLoginCard}
        >
          <LoginCard onClose={toggleLoginCard} />
        </div>
      )}
    </div>
  );
}

export default Header; 