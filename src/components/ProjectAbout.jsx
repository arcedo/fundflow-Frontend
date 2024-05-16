import React from "react";
import WysiEditor from "./WysiEditor";

function ProjectAbout({ project, editMode }) {
    return (
        <div className="w-full flex flex-col gap-5 fade-in">
            <h2 className="font-dmsans font-bold text-3xl">About this project</h2>
            {/* {editMode ? <WysiEditor /> : "This project has no description."} */}
        </div>
    );
}

export default ProjectAbout;