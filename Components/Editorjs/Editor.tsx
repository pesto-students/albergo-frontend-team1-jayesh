import { FC, Fragment, useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const defaultEditorData: JSONContent = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Close to Udagamandalam Railway Station, this lavish property offers comfortable rooms, a stylish restaurant, outdoor activities and a range of upscale facilities."
                }
            ]
        }
    ]
};

interface IEditorProps {
    onUpdate?: (data: JSONContent) => void;
    initialData: JSONContent;
    editable: boolean;
}

const TiptapEditor: FC<IEditorProps> = ({ onUpdate, initialData, editable = false }) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: initialData ?? '<p>Hello World! 🌎️</p>',
        onUpdate: ({ editor }) => {
            const editorJSON = editor.getJSON();
            onUpdate !== undefined && onUpdate(editorJSON);
        }
    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);


    return (
        <Fragment>
            <EditorContent editor={editor} />
        </Fragment>
    );
};

export default TiptapEditor;