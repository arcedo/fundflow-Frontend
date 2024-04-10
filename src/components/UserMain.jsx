import React from 'react';
import Background from '../assets/animate.svg';
import logo from '../assets/icons/1.png';

function UserMain({ children }) {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gray-200'>
      <div className="flex flex-col font-dmsans justify-center items-center w-screen h-screen bg-no-repeat bg-bottom" style={{ backgroundImage: "url(" + Background + ")" }}>
        <a href='/' className='flex gap-3 justify-center items-center mb-5'>
          <img src={logo} alt="" className='w-10 h-10 rounded-md' />
          <h1 className='font-dmsans text-black text-5xl font-bold' >fundflow.</h1>
        </a>
        <div className="flex justify-center items-center flex-col p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-70 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default UserMain;
