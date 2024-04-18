import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import youtube from "../assets/icons/youtube.svg";
import instagram from "../assets/icons/instagram.svg";

function Footer(){
    return (
        <div className="flex flex-col justify-center items-center w-full py-5 bg-gray-300 text-black">
            <div className="flex flex-col sm:flex-row w-10/12 py-8 justify-between items-center">
                <div className="grid grid-cols-2 sm:w-1/2 w-full">
                    <div className="flex flex-col gap-3 sm:w-1/2">
                        <h3 className="font-dmsans text-2xl font-bold">about</h3>
                        <Link className="text-black text-opacity-75 font-normal hover:font-semibold transition-all duration-200 w-fit" to={"/about"}>about us</Link>
                        <Link className="text-black text-opacity-75 font-normal hover:font-semibold transition-all duration-200 w-fit" to={"/about"}>our mission</Link>
                    </div>
                    <div className="flex flex-col gap-3 sm:w-1/2">
                        <h3 className="font-dmsans text-2xl font-bold">support</h3>
                        <Link className="text-black text-opacity-75 font-normal hover:font-semibold transition-all duration-200 w-fit" to={"/help"}>contact us</Link>
                        <Link className="text-black text-opacity-75 font-normal hover:font-semibold transition-all duration-200 w-fit" to={"/help"}>cookies policy</Link>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col sm:gap-3">
                        <div className="flex gap-3 py-8 sm:py-0 justify-center sm:justify-end">
                            <Link to={"https://www.facebook.com"} className="w-8 h-8rounded-full grayscale hover:-translate-y-1 hover:grayscale-0 transition-all duration-300"><img className="w-full" src={facebook}></img></Link>
                            <Link to={"https://www.twitter.com"} className="w-8 h-8 rounded-full grayscale hover:-translate-y-1 hover:grayscale-0 transition-all duration-300"><img className="w-full" src={twitter}></img></Link>
                            <Link to={"https://www.youtube.com"} className="w-8 h-8 rounded-full grayscale hover:-translate-y-1 hover:grayscale-0 transition-all duration-300"><img className="w-full" src={youtube}></img></Link>
                            <Link to={"https://www.instagram.com"} className="w-8 h-8 rounded-full grayscale hover:-translate-y-1 hover:grayscale-0 transition-all duration-300"><img className="w-full" src={instagram}></img></Link>
                        </div>
                        <div className="text-center sm:text-right">
                            <h3 className="font-montserrat text-2xl font-bold text-black">fundflow.</h3>
                            <p className="font-dmsans text-sm text-black text-opacity-75 font-normal">© 2024 Reasonable. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-9/12 sm:w-10/12 py-2 border-black border-opacity-25"/>
            <div className="py-2 font-dmsans text-black text-opacity-60 text-xl">by <span className="font-josefin font-extrabold text-3xl">Reasonable</span>™</div>
        </div>
    )
}

export default Footer;