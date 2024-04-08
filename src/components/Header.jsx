import React from "react";
import fundLogo from "../assets/icons/1.png"
import plus from "../assets/icons/plus.svg"
import search from "../assets/icons/search.svg"

function Header() {
    return (
        <div className="flex flex-col justify-center w-full items-center shadow-md fixed z-50">
            <div className="flex justify-center items-center w-full bg-white">
                <div className="flex justify-between items-center w-11/12 h-20 bg-white">
                    <a href="/home" className="group flex justify-center items-center gap-4">
                        <img className="w-10 rounded-md" src={fundLogo} alt="" />
                        <h1 className='font-dmsans text-black group-hover:bg-gradient-to-r from-primary to-secondary hidden sm:inline-block group-hover:text-transparent bg-clip-text text-3xl font-bold transition-all duration-500' >fundflow.</h1>
                    </a>
                    <div className="hidden sm:flex gap-16">
                        <a href="/about" className="text-black font-dmsans font-semibold">who we are</a>
                        <a href="/help" className="text-black font-dmsans font-semibold">help</a>
                    </div>
                    <div className="flex gap-2 w-6/12">
                        <input type="text" className="hidden sm:block p-2 px-4 h-11 w-full bg-white rounded-full font-dmsans border border-gray-500 border-opacity-30 text-black outline-none focus:border-opacity-80 transition-all duration-200" placeholder="what are you looking for?"/>
                        <button className="hidden sm:block h-11 w-11 rounded-full bg-white" style={{backgroundImage: `url(${search})`, backgroundSize: `1.5rem 1.5rem`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`}}></button>
                    </div>                    
                    <button className="hidden sm:flex justify-center items-center gap-1 h-11 font-semibold text-lg rounded-full bg-gradient-to-r from-primary to-secondary border-none"><img src={plus} alt="" />new</button>
                    <button className="block sm:hidden h-11 w-11 rounded-full bg-white" style={{backgroundImage: `url(${search})`, backgroundSize: `2rem 2rem`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`}}></button>
                    <a href="/login" className="h-11 w-11 rounded-full bg-black"></a>
                </div>
            </div>
            <div className="hidden sm:flex justify-center items-center h-9 w-full bg-gray-300 gap-24 bg-opacity-50 backdrop-blur-lg">
                <a className=" text-black opacity-75" href="/art">art</a>
                <a className=" text-black opacity-75" href="/dev">dev</a>
                <a className=" text-black opacity-75" href="/games">games</a>
                <a className=" text-black opacity-75" href="/music">music</a>
                <a className=" text-black opacity-75" href="/books">books</a>
                <a className=" text-black opacity-75" href="/innove">innove</a>
            </div>    
        </div>
    );
}

export default Header;