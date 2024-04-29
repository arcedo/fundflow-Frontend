import React from "react";
import WysiEditor from "./WysiEditor";

function ProjectAbout({ project }) {
    return (
        <div className="w-full flex flex-col gap-5 fade-in">
            <WysiEditor />
        </div>
    );
}

export default ProjectAbout;