import React, { useState } from 'react';
import { Link } from "react-router-dom";
import UserMain from '../components/UserMain';

function Recover() {
    return (
        <UserMain>
            <form className="flex flex-col w-64 gap-4" action="">
                <div className='text-black'>
                    <h2 className='text-xl font-bold'>Recover your password</h2>
                    <p className='opacity-70'>We will send you an email to reset your password.</p>
                </div>
                <div className='w-full'>
                    <label htmlFor="email" className='text-black font-semibold tracking-tighter opacity-70'>Email</label>
                    <input id='email' className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text" />
                </div>
                <button className="p-2 mt-2 mb-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-bold hover:opacity-75 transition-all duration-200" type="submit">Send email</button>
            </form>
            <Link to={"/login"} className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Go back to login</Link>
        </UserMain>
    )
}

export default Recover;