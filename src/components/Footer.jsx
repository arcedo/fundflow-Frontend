import React from "react";
import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import youtube from "../assets/icons/youtube.svg";
import instagram from "../assets/icons/instagram.svg";

function Footer(){
    return (
        <div className="flex flex-col justify-center items-center w-full py-5 bg-gray-300 text-black">
            <div className="flex flex-col sm:flex-row w-8/12 py-8 justify-between items-center">
                <div className="flex justify-between gap-14 sm:justify-normal sm:gap-52">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-dmsans text-2xl font-bold">about</h3>
                        <a className="text-black text-opacity-75 font-normal" href="/about">about us</a>
                        <a className="text-black text-opacity-75 font-normal" href="/about">our mission</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-dmsans text-2xl font-bold">support</h3>
                        <a className="text-black text-opacity-75 font-normal" href="/help">contact us</a>
                        <a className="text-black text-opacity-75 font-normal" href="/help">cookies policy</a>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col sm:gap-3">
                        <div className="flex gap-3 py-8 sm:py-0 justify-center sm:justify-end">
                            <a href="/facebook" className="w-8 h-8rounded-full"><img className="w-full" src={facebook}></img></a>
                            <a href="/twitter" className="w-8 h-8 rounded-full"><img className="w-full" src={twitter}></img></a>
                            <a href="/youtube" className="w-8 h-8 rounded-full"><img className="w-full" src={youtube}></img></a>
                            <a href="/instagram" className="w-8 h-8 rounded-full"><img className="w-full" src={instagram}></img></a>
                        </div>
                        <div className="text-center sm:text-right">
                            <h3 className="font-dmsans text-2xl font-bold text-black">fundflow.</h3>
                            <p className="font-dmsans text-sm text-black text-opacity-75 font-normal">© 2024 Reasonable. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-9/12 sm:w-8/12 py-2 border-black border-opacity-25"/>
            <div className="py-2 font-dmsans text-black text-opacity-60 text-2xl">by <span className="font-extrabold">Reasonable</span></div>
        </div>
    )
}

export default Footer;