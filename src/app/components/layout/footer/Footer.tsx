import React from 'react'
import { CiHeart } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className='w-full px-3 border-t-2 border-matchaGreen'>
        <div className='flex text-matchaGreen tracking-wider items-center justify-between'>
            <p className='flex'>Made with <CiHeart size={20} color='#90EE90' /> by Sip&Serve.</p>
            <p className='cursor-pointer'>Submit a rating!</p>
        </div>
    </footer>
  )
}

export default Footer;
