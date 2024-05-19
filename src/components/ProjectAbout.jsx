import React, { useState, useEffect } from "react";
import WysiEditor from "./WysiEditor";
import { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js';

function ProjectAbout({ project, editMode }) {
    const [headingList, setHeadingList] = useState([]);

    const getSavedContent = () => {
        const content = localStorage.getItem('content');
        if (content) {
            const rawContentState = JSON.parse(content);
            const contentState = convertFromRaw(rawContentState);
            return EditorState.createWithContent(contentState);
        }
        return null;
    };

    const savedEditorState = getSavedContent();

    useEffect(() => {
        if (!editMode && savedEditorState) {
            const contentState = savedEditorState.getCurrentContent();
            const blocks = contentState.getBlockMap();
            const headings = [];

            blocks.forEach(block => {
                const text = block.getText();
                const type = block.getType();
                if (type === 'header-two' || type === 'header-three') {
                    headings.push({ text, type });
                }
            });
            setHeadingList(headings);
        }
    }, [editMode]);

    const renderHeadings = () => {
        return (
            <ul className="flex flex-col gap-2">
                {headingList.map((heading, index) => (
                    <li key={index} className={`font-dmsans ${heading.type === 'header-three' ? 'ml-4' : ''}`}>
                        <a href={`#${heading.text}`}>{heading.text}</a>
                    </li>
                ))}
            </ul>
        );
    };  

    return (
        <div className="w-full flex gap-5 fade-in min-h-96">
            <div className="w-1/12">
                <h2 className="font-dmsans text-2xl font-bold mt-6 text-black text-opacity-75">about</h2>
                {editMode ? (
                    <p className="font-dmsans text-md text-black text-opacity-75 mt-3">edit the details of your project</p>
                ) : (
                    <>
                        {!editMode && headingList.length > 0 && (
                            <div className="mt-3">
                                {renderHeadings()}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="bg-555 opacity-40 mx-10" style={{ width: "1px" }}></div>
            <div className="w-10/12">
                {editMode ? (
                    <WysiEditor />
                ) : savedEditorState ? (
                    <Editor
                        editorState={savedEditorState}
                        wrapperClassName="wrapperClassName"
                        readOnly={true}
                        toolbarHidden={true}
                    />
                ) : (
                    <p className="font-dmsans text-md mt-2">This project has no more details.</p>
                )}
            </div>
        </div>
    );
}

export default ProjectAbout;
