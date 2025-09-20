import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react'

const Techstack = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const techCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="w-12 h-12" />,
      technologies: [
        { name: "React", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "HTML5", level: 95, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind CSS", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Next.js", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Vue.js", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-12 h-12" />,
      technologies: [
        { name: "Node.js", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Python", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Django", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        { name: "PHP", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Laravel", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { name: "REST APIs", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "GraphQL", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" }
      ]
    },
    {
      title: "Database & Cloud",
      icon: <Database className="w-12 h-12" />,
      technologies: [
        { name: "MongoDB", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Firebase", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "AWS", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Vercel", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
        { name: "Netlify", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
        { name: "Docker", level: 65, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-12 h-12" />,
      technologies: [
        { name: "React Native", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Flutter", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Ionic", level: 65, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
        { name: "PWA", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
        { name: "Expo", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg" }
      ]
    },
    {
      title: "Design & Tools",
      icon: <Palette className="w-12 h-12" />,
      technologies: [
        { name: "Figma", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Adobe XD", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
        { name: "Photoshop", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
        { name: "Git", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "VS Code", level: 95, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Webpack", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
        { name: "Vite", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % techCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + techCategories.length) % techCategories.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[60%] ">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Tech Stack
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative  max-w-6xl mx-auto">
        {/* Main Slider */}
        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {techCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="w-full flex-shrink-0">
                <div className="bg-gray-800 rounded-lg p-4 h-[450px]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-blue-400">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors">
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={tech.logo} 
                            alt={tech.name}
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-sm hidden">
                            {tech.name.charAt(0)}
                          </div>
                        </div>
                        <h3 className="text-white font-semibold mb-2">{tech.name}</h3>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-xs mt-1">{tech.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {techCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Learning Section */}
      {/* <div className="mt-12 text-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Technology evolves rapidly, and I'm committed to staying current with the latest trends and tools. 
            I'm currently exploring <span className="text-blue-400 font-semibold">Web3</span>, 
            <span className="text-blue-400 font-semibold"> Machine Learning</span>, and 
            <span className="text-blue-400 font-semibold"> Cloud Architecture</span> to expand my skill set further.
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default Techstack