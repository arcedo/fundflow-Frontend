import React from "react";
import Header from "../components/Header";

function Home(){
    return (
        <div className="flex flex-col w-screen h-screen bg-white">
            <Header />
            <div className="flex justify-center items-center w-full h-full">
                <h1 className="text-4xl font-bold text-black">Welcome to fundflow.</h1>
            </div>
        </div>
    )
}

export default Home;