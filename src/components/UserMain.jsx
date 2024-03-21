import React from 'react';
import Background from '../assets/animate.svg';

function UserMain({ children }) {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-slate-100'>
      <div className="flex justify-center items-center w-screen h-screen bg-no-repeat bg-bottom" style={{ backgroundImage: "url(" + Background + ")" }}>
        <div className="flex justify-center items-center flex-col p-8 bg-slate-100 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

export default UserMain;
