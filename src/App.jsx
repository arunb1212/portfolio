import React, { useEffect, useRef } from "react";
import { Linkedin, FileUser, FolderKanban, Github } from "lucide-react";
import Profile from "./components/pages/Profile";

const App = () => {
  const cursorRef = useRef(null);

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
  return (
    // side page
    <div className=" cursor-none h-[100vh]  grid grid-cols-3">
      <div className=" relative w-full border  border-r-white col-span-1 ">
        <img
          className="absolute top-0 left-0  border  border-white pb-[0px] mt-[-100px]  h-[600px]"
          src="./src/assets/PHOTO-2025-09-18-20-34-52-removebg-preview.png"
          alt=""
        />
      </div>
      {/* Main page */}

      <div className="col-span-2 relative  pb-[30px] ">

<div className="px-[30px] pt-[30px]">
  <Profile/>
</div>

        <div
          ref={cursorRef}
          id="cursor"
          className="fixed pointer-events-none z-50   duration-50  bg-white h-[20px] w-[20px] rounded-[50%] translate-x-[-50%] translate-y-[-50%]"
        ></div>

 <div className="   flex justify-center  pb-[80px] items-end">
           <div className=" absolute left-1/2 translate-x-[-50%] bottom-[20px]  border  w-[40%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  flex rounded-lg justify-evenly items-center h-[80px] border-white ">
          <FileUser className=" ease-in duration-100 linear hover:scale-[1.5] cursor-pointer" />
          <FolderKanban className=" ease-in duration-100 linear hover:scale-[1.5] cursor-pointer " />
          <Github className=" ease-in duration-100 linear hover:scale-[1.5] cursor-pointer" />
          <Linkedin className=" ease-in duration-100 linear hover:scale-[1.5] cursor-pointer" />
        </div>
</div>

      </div>
    </div>
  );
};

export default App;
