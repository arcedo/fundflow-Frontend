import React from "react";
import { Link } from "react-router-dom";
import noDataFound from "../assets/icons/no_data_found.svg";
import UserThumb from "./UserThumb";

function GridUserSection({ sectionTitle, usersFound, seeMore, onEmptyMessage, imageEmptyVisible }) {
    const numberOfColumns = 6;

    const placeholdersCount = usersFound ? usersFound.length % numberOfColumns : 0;
    const placeholdersNeeded = placeholdersCount > 0 ? numberOfColumns - placeholdersCount : 0;
    return (
        <section className="flex justify-center items-center fade-in w-full">
            <div className="w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4 fade-in">{sectionTitle}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 w-full">
                    {usersFound && !usersFound.message && usersFound.length > 0 ? usersFound.map((user, index) => {
                        const delay = index * 0.05;
                        return (
                            <div key={user.id} style={{ animationDelay: `${delay}s` }} className="fade-in">
                                <UserThumb user={user} />
                            </div>
                        );
                    }) : <div className="col-span-8 flex flex-col gap-2.5 justify-center items-center fade-in">
                        {imageEmptyVisible ? <img src={noDataFound} alt="No projects found" className="w-72" /> : null}
                        <p className="text-black text-opacity-75 font-dmsans py-10 font-semibold text-xl">{onEmptyMessage ?? 'No users found'}</p>
                    </div>
                    }
                    {Array.from({ length: placeholdersNeeded }).map((_, index) => {
                        const delay = (usersFound.length + index) * 0.05;
                        return (
                            <div key={`placeholderUser-${index}`} style={{ animationDelay: `${delay}s` }} className="fade-in flex flex-col items-center justify-center gap-4">
                                <div className="h-28 w-28 rounded-full bg-gray-200"></div>
                                <div className="h-8 w-28 bg-gray-200 rounded-md"></div>
                            </div>
                        );
                    })}
                </div>
                {seeMore && (
                    <div className="flex justify-center items-center mt-6 gap-3">
                        <hr className="w-6/12 border-black border-opacity-25" />
                        <Link to={"/projects"} className="font-dmsans w-6/12 sm:w-1/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">see more</Link>
                        <hr className="w-6/12 border-black border-opacity-25" />
                    </div>
                )}
            </div>
        </section>
    );
}

export default GridUserSection;
