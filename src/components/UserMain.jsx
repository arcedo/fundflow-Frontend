import React from 'react';
import { Link } from "react-router-dom";
import Background from '../assets/animate.svg';
import logo from '../assets/icons/logoLight.png';

function UserMain({ children }) {
  return (
    <div className='relative flex flex-col justify-center items-center w-full h-screen bg-gray-200 overflow-hidden'>
      <div className="flex flex-col font-dmsans justify-center items-center w-full h-full">
        <Link to={'/'} className='flex gap-3 justify-center items-center mb-5 fade-in'>
          <img src={logo} alt="" className='w-10 h-10 rounded-md' />
          <h1 className='font-dmsans text-black text-5xl font-bold' >fundflow.</h1>
        </Link>
        <div className="z-10 flex justify-center items-center flex-col p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-70 backdrop-blur-md fade-in">
          {children}
        </div>
      </div>
      <div className='absolute -bottom-8 w-full h-96 z-0 bg-no-repeat bg-cover'  style={{ backgroundImage: "url(" + Background + ")" }}>

      </div>
    </div>
  );
}

export default UserMain;
