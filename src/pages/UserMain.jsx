import React from 'react';
import Background from '../assets/animate.svg';

function UserMain({ children }) {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-white'>
      <div className="flex flex-col font-dmsans justify-center items-center w-screen h-screen bg-no-repeat bg-bottom" style={{ backgroundImage: "url(" + Background + ")" }}>
        <h1 className='font-dmsans bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text text-5xl font-bold' >fundflow.</h1>
        <div className="flex justify-center items-center flex-col p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-60 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default UserMain;
