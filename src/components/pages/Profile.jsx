import { School, School2, University } from "lucide-react";
import React from "react";
import { TypeAnimation } from "react-type-animation";
const Profile = () => {
  return (
    <div>
      <div className="  text-center">
        <p className="tracking-wide text-2xl font-bold">Hi, my name is</p>
        <h1 className="tracking-[8px] text-7xl font-bold ">Arun Bhagat.</h1>
      </div>
      <div className="flex justify-center">
        <div className="text-center w-fit mt-[20px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "I am a Student",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "I am a Software Developer",
              1000,
              "I am a wordpress Developer",
              1000,
              "I build thing for the Web",
              1000,
              "I solve Problems",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            repeat={Infinity}
          />
        </div>
      </div>

      <div className="flex gap-[20px] flex-col text-center mt-[30px]">
        <p className="font-bold text-3xl">About Me</p>
        <p className="text-xl leading-[30px] ">
          {" "}
          Hello! I'm Arun, a driven Full Stack Developer with a strong
          foundation in electronics & computer science and a knack for crafting
          efficient, user-centric applications.
          <br /> My journey into tech is fueled by a desire to learn, innovate,
          and contribute to projects that make a difference. I thrive in
          collaborative environments and am always excited to tackle new
          challenges.
        </p>
      </div>
      <div className=" mt-[30px]">
        <p className=" text-center text-2xl font-bold">Education</p>
        <div className="flex justify-evenly mt-[20px]">
          <div className="border hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]  w-[250px] p-[10px] rounded-lg bg-gray-200 text-black ">
            <div className="flex gap-[10px]">
              <University />
              <p>Atharva University</p>
            </div>
            <p>B.E Electronic & Computer Science</p>
            <p>Aug 2022 – Present</p>
            <p>CGPA: 7/10</p>
          </div>
          <div className="border w-[250px] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-[10px] rounded-lg bg-gray-200 text-black ">
            <div className="flex gap-[10px]">
              <School />
              <p>Durga Devi Saraf</p>
            </div>
            <p>Science</p>
            <p>Aug 2020 – 2022</p>
            <p>CGPA: 7.5/10</p>
          </div>
          <div className=" w-[250px] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-[10px] ease-in duration-75 linear rounded-lg bg-gray-200 text-black">
            <div className="flex gap-[10px]">
              <School2 />
              <p>St. Mathew's High School</p>
            </div>
            <p>SSC</p>
            <p>Aug 2019 – Aug 2020</p>
            <p>CGPA: 9/10</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
