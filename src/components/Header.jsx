import React from "react";
import fundLogo from "../assets/icons/2.png"
import plus from "../assets/icons/plus.svg"

function Header() {
    return (
        <div className="flex flex-col justify-center items-center w-full bg-white shadow-md">
            <div className="flex justify-between items-center w-11/12 h-20">
                <a href="/home" className="flex justify-center items-center gap-4">
                    <img className="w-10 rounded-md" src={fundLogo} alt="" />
                    <h1 className='font-dmsans text-black hover:bg-gradient-to-r from-primary to-secondary inline-block hover:text-transparent bg-clip-text text-3xl font-bold transition-colors duration-200' >fundflow.</h1>
                </a>
                <div className="flex gap-16">
                    <a href="/login" className="text-black font-dmsans font-semibold">who we are</a>
                    <a href="/signup" className="text-black font-dmsans font-semibold">help</a>
                </div>
                <input type="text" className="p-2 px-4 h-11 bg-white rounded-full font-dmsans border border-gray-500 border-opacity-30 w-6/12 text-black outline-none focus:border-opacity-80 transition-all duration-200" placeholder="what are you looking for?"/>
                <button className="flex justify-center items-center gap-1 h-11 font-semibold text-lg rounded-full bg-gradient-to-r from-primary to-secondary border-none"><img src={plus} alt="" />new</button>
                <a href="/login" className="h-11 w-11 rounded-full bg-black"></a>
            </div>
            <div className="flex justify-center items-center h-9 w-full bg-gray-300 gap-24">
                <a className=" text-gray-500" href="/art">art</a>
                <a className=" text-gray-500" href="/dev">dev</a>
                <a className=" text-gray-500" href="/games">games</a>
                <a className=" text-gray-500" href="/music">music</a>
                <a className=" text-gray-500" href="/books">books</a>
                <a className=" text-gray-500" href="/innove">innove</a>
            </div>    
        </div>
    );
}

export default Header;