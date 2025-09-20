import React from 'react'
import { Linkedin, FileUser, FolderKanban, Github } from "lucide-react";
import { useNavigate } from 'react-router';

const Dock = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, pageName) => {
    setCurrentPage(pageName);
    navigate(path);
  };

  return (
    <div>
      <div className="flex justify-center pb-[80px] items-end">
        <div className="absolute left-1/2 translate-x-[-50%] bottom-[20px] border w-[40%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex rounded-lg justify-evenly items-center h-[80px] border-white">
          <FileUser 
            className={`ease-in duration-100 linear hover:scale-[1.5] cursor-pointer transition-all ${
              currentPage === 'profile' ? 'text-blue-400 scale-110' : 'text-white'
            }`}
            onClick={() => handleNavigation('/profile', 'profile')}
          />
          <FolderKanban 
            className={`ease-in duration-100 linear hover:scale-[1.5] cursor-pointer transition-all ${
              currentPage === 'projects' ? 'text-blue-400 scale-110' : 'text-white'
            }`}
            onClick={() => handleNavigation('/projects', 'projects')}
          />
          <Github 
            className={`ease-in duration-100 linear hover:scale-[1.5] cursor-pointer transition-all ${
              currentPage === 'techstack' ? 'text-blue-400 scale-110' : 'text-white'
            }`}
            onClick={() => handleNavigation('/techstack', 'techstack')}
          />
          <Linkedin 
            className={`ease-in duration-100 linear hover:scale-[1.5] cursor-pointer transition-all ${
              currentPage === 'contact' ? 'text-blue-400 scale-110' : 'text-white'
            }`}
            onClick={() => handleNavigation('/contact', 'contact')}
          />
        </div>
      </div>
    </div>
  )
}

export default Dock