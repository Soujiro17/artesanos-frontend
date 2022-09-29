import React from 'react'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import styles from './styles.module.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor = ({ name, setValue, value }) => {
  const onEditorChange = (contentState) => setValue(name, JSON.stringify(contentState))

  return (
    <>
      <Editor
        contentState={value}
        onContentStateChange={onEditorChange}
        toolbarClassName={styles.text_editor_toolbar || 'toolbarClassName'}
        wrapperClassName={styles.text_editor_wrapper}
        editorClassName={styles.text_editor}
      />
    </>
  )
}

export default TextEditor
