import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Search() {
    
    const location = useLocation();
    const search = decodeURIComponent(location.search.split('?')[1]);

    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 pt-28">
                <div className="w-11/12 flex items-center justify-center">
                    <h2 className="font-dmsans text-3xl font-semibold text-opacity-70 text-black">Search results for <span className="text-black text-opacity-100 font-bold">{search}</span></h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;