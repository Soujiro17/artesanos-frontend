import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import styles from './styles.module.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor = ({ name, setValue, value }) => {
  const onEditorChange = (contentState) => setValue(name, JSON.stringify(contentState))

  return (
    <>
      <Editor
        contentState={value ? typeof value === 'string' ? JSON.parse(value) : value : value}
        onContentStateChange={onEditorChange}
        toolbarClassName={styles.text_editor_toolbar || 'toolbarClassName'}
        wrapperClassName={styles.text_editor_wrapper}
        editorClassName={styles.text_editor}
      />
    </>
  )
}

export default TextEditor
