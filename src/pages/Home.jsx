import React from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

function Home(){
    return (
        <div className="flex flex-col w-screen h-screen bg-white">
            <Header />
            <Slider />
            <Footer />
        </div>
    )
}

export default Home;