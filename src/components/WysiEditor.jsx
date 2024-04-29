import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MyEditor extends Component {
    render() {
        const wrapperStyle = { /* Define your styles here */ };
        const editorStyle = { minHeight: '400px', border: '1px solid black' };  // Example style
        const toolbarStyle = { /* Define your styles here */ };

        return (
            <Editor
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                toolbarStyle={toolbarStyle}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                    blockType: {
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96],
                    },
                    fontFamily: {
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                    },
                    list: {
                        options: ['unordered', 'ordered', 'indent', 'outdent'],
                    },
                    textAlign: {
                        options: ['left', 'center', 'right', 'justify'],
                    },
                    colorPicker: {
                        popupClassName: 'color-picker-popup',
                    },
                    link: {
                        popupClassName: 'link-popup',
                    },
                    embedded: {
                        popupClassName: 'embedded-popup',
                    },
                    emoji: {
                        popupClassName: 'emoji-popup',
                    },
                    image: {
                        popupClassName: 'image-popup',
                    },
                    remove: {
                        options: ['clear'],
                    },
                    history: {
                        options: ['undo', 'redo'],
                    },
                }}
            />
        );
    }
}

export default MyEditor;
