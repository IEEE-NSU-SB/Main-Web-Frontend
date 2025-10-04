import React, { useEffect, useState } from "react";

const FollowUs: React.FC = () => {
  const words: string[] = ["Facebook", "Instagram", "Twitter"];
  const typingSpeed: number = 100; // ms per character
  const eraseSpeed: number = 30;   // ms per character when erasing
  const newTextDelay: number = 2000; // pause before erasing

  const [text, setText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      if (charIndex < words[wordIndex].length) {
        timer = setTimeout(() => {
          setText((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Word fully typed, pause before erasing
        timer = setTimeout(() => setIsTyping(false), newTextDelay);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, eraseSpeed);
      } else {
        // Word fully erased, move to next
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, wordIndex, words]);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s infinite;
        }
      `}</style>
      <div className="min-h-[150px] h-auto bg-[linear-gradient(60deg,#00B5E2_0%,#00629B_70%)] text-center flex justify-center items-center flex-col w-full">
        <h2 className="text-white text-[40px] font-bold">Follow Us Now!</h2>
        <p className="text-white text-[20px]">
          our activities on{" "}
          <span className="text-yellow-400">{text}</span>
          <span className={`inline-block ml-0.5 w-0.5 h-6 align-middle cursor-blink ${isTyping && charIndex === words[wordIndex].length ? 'bg-black' : 'bg-gray-600'}`}>
            &nbsp;
          </span>
        </p>
      </div>
    </>
  );
};

export default FollowUs;