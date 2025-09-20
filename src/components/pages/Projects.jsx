import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/username/ecommerce",
      live: "https://ecommerce-demo.com",
      image: "https://via.placeholder.com/400x250"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "https://github.com/username/taskapp",
      live: "https://taskapp-demo.com",
      image: "https://via.placeholder.com/400x250"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      tech: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/username/weather",
      live: "https://weather-demo.com",
      image: "https://via.placeholder.com/400x250"
    }
  ];

  return (
    <div className="h-fit">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a different challenge and learning opportunity.
        </p>
      </div>

      <div className="grid border grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 pb-[10px] h-[400px] border border-amber-500 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="h-30 bg-gray-700 flex items-center justify-center">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-300 mb-4 text-sm  leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span className="text-sm">Code</span>
                </a>
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm">Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects