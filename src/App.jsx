import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router";
import Profile from "./components/pages/Profile";
import Contact from "./components/pages/Contact";
import Techstack from "./components/pages/Techstack";
import Projects from "./components/pages/Projects";
import Dock from "./components/Dock";
import Game from "./components/Game";
import { Button } from "@/components/ui/button"
import myimg from "./myimg.png"

const App = () => {
  const cursorRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('profile');
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursorEl.style.left = `${x}px`;
      cursorEl.style.top = `${y}px`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const handlePlayGame = () => {
    setShowGame(true);
  };

  const handleCloseGame = () => {
    setShowGame(false);
  };
  return (
    // side page
    <div className=" cursor-none h-[100vh]  grid grid-cols-3">
      <div className=" relative w-full border  flex flex-col items-center gap-[40px] border-r-white col-span-1 ">
        <div>
          <img
          className="border border-white pb-[0px] mt-[-100px] h-[600px] shadow-2xl shadow-white/20"
          src={myimg}
          alt=""
        />

        </div>

        <div>
                  <Button onClick={handlePlayGame}>Play a Game</Button>
        </div>
        <div>
          
        </div>
      </div>

      
      {/* Main page */}

      <div className="col-span-2 relative pb-[30px]">
        <div className="px-[30px] pt-[30px] min-h-[calc(100vh-120px)]">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/techstack" element={<Techstack />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <div
          ref={cursorRef}
          id="cursor"
          className="fixed pointer-events-none z-50 duration-50 bg-white h-[20px] w-[20px] rounded-[50%] translate-x-[-50%] translate-y-[-50%]"
        ></div>

        <div>
          <Dock currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      {/* Game Modal */}
      {showGame && <Game onClose={handleCloseGame} />}
    </div>
  );
};

export default App;
