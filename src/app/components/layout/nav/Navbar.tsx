'use client';

import React from "react";
import { SiCoffeescript } from "react-icons/si";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import AddPlace from "../modal/AddPlace";
const Navbar = () => {
    const { openModal } = useModal()
  return (
    <nav className="flex justify-between items-center px-3 pb-3 w-full border-b-2 border-matchaGreen tracking-wider">
      <div className="flex sm:space-x-3 space-x-1 items-center cursor-pointer">
        <SiCoffeescript color="#90EE90" size={55} />
        <p className="font-bold sm:text-2xl text-m text-matchaGreen">
          Matcha Finder
        </p>
      </div>
      <div className="font-semibold sm:text-2xl text-xs text-matchaGreen">
        <div className="flex space-x-5 items-center cursor-pointer" onClick={() => openModal(<AddPlace />)}>
          <span className="sm:block hidden">Add a place!</span>
          <IoIosAddCircleOutline size={50} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
