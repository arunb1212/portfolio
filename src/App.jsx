import React from 'react'
import { Button } from "@/components/ui/button"
import { Linkedin,FileUser,FolderKanban,Github } from 'lucide-react'

const App = () => {

const cursor= document.getElementById("cursor")
  window.addEventListener("mousemove",(e)=>{
    // console.log(e.clientX,e.clientY)
    const x=e.clientX
    const y=e.clientY

    // cursor.style.left=`${x-10}px`
    // cursor.style.top=`${y-10}px`
    cursor.animate({
      left:`${x}px`,
      top:`${y}px`
    },{duration:5000,fill:"forwards"})

  }
    
  )
return(
  <div className= ' cursor-none  h-[100vh]  grid grid-cols-3'>
    
    <div className=' relative w-full border  border-r-white col-span-1 '>
<img className='absolute top-0 left-0  border  border-white pb-[0px] mt-[-100px]  h-[600px]' src="./src/assets/PHOTO-2025-09-18-20-34-52-removebg-preview.png" alt="" />
    </div>
    
    <div className='col-span-2 flex justify-center  items-end pb-[30px] '>
    <div id='cursor' className='absolute linear  duration-100 ease-in-out bg-white h-[20px] w-[20px] rounded-[50%]'>
      
    </div>
    
        <div className='border w-[40%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  flex rounded-lg justify-evenly items-center h-[80px] border-white '>
        <FileUser className=' ease-in duration-100 linear hover:scale-[1.5] cursor-pointer' />
        <FolderKanban className=' ease-in duration-100 linear hover:scale-[1.5] cursor-pointer ' />
        <Github  className=' ease-in duration-100 linear hover:scale-[1.5] cursor-pointer'/>
        <Linkedin className=' ease-in duration-100 linear hover:scale-[1.5] cursor-pointer'/>
        </div>
    </div>
  </div>
)
}

export default App