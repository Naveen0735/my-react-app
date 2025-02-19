import React from 'react';
import { Box } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import './RichTextEditor.css';

const RichTextEditor: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const handleEditorChange = (e: any) => {
    console.log(e.target.getContent());
  };

  return (
    <Box className="rich-text-editor">
      <Editor
        apiKey="l1o6p0p0fc93qsvo3d0mi88ypmk6ry3ohd9m58a3gua6c2l1"
        init={{
          height: 280,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'placeholder'
          ],
          toolbar:
            'undo redo | formatselect | bold italic underline | bullist numlist outdent indent | removeformat',
          placeholder: placeholder,
        }}
        onChange={handleEditorChange}
      />
    </Box>
  );
};

export default RichTextEditor;
