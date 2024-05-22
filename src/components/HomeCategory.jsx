import React from "react";
import { Link } from "react-router-dom";

function HomeCategory({ categoryImage, categoryName, categoryId, categoryCols, categoryRows }) {
    const gridStyle = window.innerWidth >= 1080 ? {
        gridColumn: `span ${categoryCols}`,
        gridRow: `span ${categoryRows}`
    } : {};

    return (
        <div className="flex flex-col w-full h-28 lg:h-full" style={gridStyle}>
            <Link to={`/search?query=&category=${categoryId}`} className="flex flex-col rounded-md overflow-hidden justify-center group items-center h-full w-full ">
                <img className="h-full w-full filter brightness-50 group-hover:brightness-75 object-cover transition-all duration-300 group-hover:scale-110" src={categoryImage} alt="" />
                <h3 className="absolute font-dmsans top-50 right-50 text-white text-3xl font-bold rounded-full">{categoryName}</h3>
            </Link>
        </div>
    )
}

export default HomeCategory;

