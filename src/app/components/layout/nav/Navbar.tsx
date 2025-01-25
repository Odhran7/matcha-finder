import React from 'react'
import { SiCoffeescript } from "react-icons/si"

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-3 pb-3 w-full border-b-2 border-matchaGreen tracking-wider'>
        <div className='flex sm:space-x-3 space-x-1 items-center cursor-pointer'>
            <SiCoffeescript color='#90EE90' size={55} />
            <p className='font-bold sm:text-2xl text-m text-matchaGreen'>Matcha Finder</p>
        </div>
        <div className='font-semibold sm:text-2xl text-xs text-matchaGreen'>
            The best matcha in Ireland.
        </div>
    </nav>
  )
}

export default Navbar;
