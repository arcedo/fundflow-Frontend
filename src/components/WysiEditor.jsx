import React, { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function WysiEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const updateTextDescription = (state) => {
        setEditorState(state);
    };

    const handleSubmit = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        console.log(rawContentState);
        localStorage.setItem('content', JSON.stringify(rawContentState));
    };

    const loadContent = () => {
        const content = localStorage.getItem('content');
        if (content) {
            const rawContentState = JSON.parse(content);
            const contentState = convertFromRaw(rawContentState);
            setEditorState(EditorState.createWithContent(contentState));
        }
    };

    useEffect(() => {
        loadContent();
    }, []);

    const toolbarOptions = {
        options: ['inline', 'blockType', 'list'],
        inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
        blockType: { options: ['Normal', 'H2', 'H3'] },
        list: { options: ['unordered', 'ordered', 'indent', 'outdent'] },
    };

    return (
        <>
            <Editor
                editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                toolbar={toolbarOptions}
                onEditorStateChange={updateTextDescription}
            />
            <button className="w-40 h-12 mt-5 bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold" onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default WysiEditor;
