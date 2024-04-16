import React from "react";

function HomeCategory({ categoryImage, categoryName, categoryCols, categoryRows }) {
    const gridStyle = window.innerWidth >= 640 ? {
        gridColumn: `span ${categoryCols}`,
        gridRow: `span ${categoryRows}`
    } : {};

    return (
        <div className="flex flex-col w-full h-28 sm:h-full" style={gridStyle}>
            <a href="#" className="flex flex-col justify-center items-center h-full w-full">
                <img className="h-full w-full rounded-md transition-all duration-200 filter brightness-50 hover:brightness-75 object-cover" src={categoryImage} alt="" />
                <h3 className="absolute font-dmsans top-50 right-50 text-white text-3xl font-bold rounded-full">{categoryName}</h3>
            </a>
        </div>
    )
}

export default HomeCategory;

