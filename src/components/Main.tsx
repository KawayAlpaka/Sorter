import styled from "@emotion/styled"
import { useCallback, useRef } from "react"
import { Chart } from "./chart"
import { CodeEditor } from "./code-editor"
import { ResizeBar } from "./resize-bar"
import * as monaco from 'monaco-editor';
import { AppGlobal } from "utils/global"
import { TestGroup } from "./test-group"

export const Main = ()=>{
  console.log("main");

  const codeEditor = useRef<ReturnType<typeof monaco.editor.create>>(null);

  const onResize = useCallback(()=>{
    codeEditor.current?.layout();
    AppGlobal.chartContainer.resize();
  },[codeEditor]);
  
  return <Container>
    <LeftGroup>
      <Chart></Chart>
    </LeftGroup>
    <ResizeBar onResize={onResize}></ResizeBar>
    <RightGroup>
      <CodeEditor ref={codeEditor}></CodeEditor>
      <TestGroup></TestGroup>
    </RightGroup>
  </Container>
}

const LeftGroup = styled.div`
flex: 1;
position: relative;
display: flex;
flex-direction: column;
height: 100%;
overflow: hidden;
border-top: 1px solid var(--border-color);
border-bottom: 1px solid var(--border-color);
`

const Container = styled.div`
flex: 1;
display: flex;
flex-direction: row;
justify-content: space-between;
overflow: hidden;
`

const RightGroup = styled.div`
flex: 1;
display: flex;
flex-direction: column;
overflow: hidden;
border-top: 1px solid var(--border-color);
border-bottom: 1px solid var(--border-color);
`