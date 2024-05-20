import React, { useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { updateProjectAbout } from "../services";

function WysiEditor({ projectId, aboutContent, setAboutContent }) {
    const [submitMessage, setSubmitMessage] = useState({ message: '', isOk: false });
    const handleSubmit = async () => {
        const rawContent = convertToRaw(aboutContent.getCurrentContent());
        await updateProjectAbout(localStorage.getItem('token'), projectId, JSON.stringify(rawContent))
            .then((res) => {
                if (res.code === 200) {
                    setSubmitMessage({ message: 'Changes saved', isOk: true });
                    setTimeout(() => setSubmitMessage({ message: '', isOk: false }), 3000);
                } else {
                    setSubmitMessage({ message: 'Error saving changes', isOk: false });
                    setTimeout(() => setSubmitMessage({ message: '', isOk: false }), 3000);
                }
            });
    };

    const toolbarOptions = {
        options: ['inline', 'blockType', 'list'],
        inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
        blockType: { options: ['Normal', 'H2', 'H3'] },
        list: { options: ['unordered', 'ordered', 'indent', 'outdent'] },
    };

    return (
        <>
            <Editor
                editorState={aboutContent}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                toolbar={toolbarOptions}
                onEditorStateChange={setAboutContent}
            />
            <div className="flex gap-3 items-end">
                <button
                    className="w-40 h-12 mt-5 bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <p className={`font-dmsans ${submitMessage.isOk ? 'text-green-600' : 'text-red-600'}`}>{submitMessage.message}</p>
            </div>
        </>
    );
}

export default WysiEditor;
