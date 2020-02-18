import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'

const EditorWrapper = styled.div`
  margin-bottom: 10px;
  .editorClassName{
    min-height: 300px;
    border: 1px solid #d9d9d9 !important;
    padding: 5px 15px !important;
    border-radius: 4px !important;
    line-height: normal;
  }
  .toolbarClassName{
    a{
      color: initial;
    }
  }
`
export default class Wysiwyg extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  componentDidMount() {
    const blocksFromHtml = htmlToDraft(this.props.value||'')
    const { contentBlocks, entityMap } = blocksFromHtml
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap))
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    }, () => {})
  }

  onChange = editorState => {
    if (typeof this.props.onChange === 'function'){
      this.props.onChange(draftToHtml(editorState))
    }
  }

  render () {
    const {editorState} = this.state
    return (
      <EditorWrapper>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          onChange={this.onChange}
        />
      </EditorWrapper>
    )
  }
}