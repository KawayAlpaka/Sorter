import { SortList } from "../utils/sort-list";
import * as monaco from 'monaco-editor';
import { useCallback, useEffect, useImperativeHandle, useState } from "react";
import styled from "@emotion/styled";
import React from "react";
import { AppGlobal } from "utils/global";
import { useDebounceFn } from "hooks/use-debounce";
import { useAppSelector } from "store";
import { useSetCurrentCode } from "store/code.slice";


export const defaultCode = `/**
* @param {SortList} list 封装过的数组对象，不能直接访问值，需要调用其中的方法，这样可以解析过程
* @return {void}  无需返回
*/
const Sorter = (list) => { 
  // 冒泡排序(Bubble Sort)
  const len = list.length
  for (let i = 0; i < len - 1; i++) {
    let flag = true;
    list.explanation(\`第\${i + 1}次循环\`);
    for (let j = 0; j < len - 1; j++) {
      list.points([{ name: "p1", index: j }, { name: "p2", index: j + 1 }])
      if (list.gt(j, j + 1)) {
        list.swap(j, j + 1)
        flag = false;
      }
    }
    if (flag) break;
  }
}
return Sorter;
`;


interface CodeEditorProps {
  onFinish?:(props:SortList)=>void,
  ref?:any
}

export type ICodeEditor = ReturnType<typeof monaco.editor.create>;

export const CodeEditor:React.FC<CodeEditorProps> = React.forwardRef((props:CodeEditorProps,ref:React.ForwardedRef<any>)=>{
  console.log("CodeEditor");
  const currentCode = useAppSelector(state=>{
    return state.code.currentCode;
  });
  const setCurrentCode = useSetCurrentCode();
  const [editor,setEditor] = useState<ICodeEditor | null>(null);
  useEffect(()=>{
    editor?.setValue(currentCode.code);
  },[currentCode.id,editor]);

  const saveCode = useCallback(()=>{

    if(editor){
      const code = editor.getValue();
      setCurrentCode({
        ...currentCode,
        code
      });
    }
  },[currentCode.id,editor]);

  const debounceSaveCode = useDebounceFn(saveCode,500);
  useEffect(()=>{
    const disposable = editor?.onDidChangeModelContent((evt)=>{
      if(!evt.isFlush){
        debounceSaveCode();
        // saveCode();
      }
    });
    AppGlobal.editor = editor;
    return ()=>{
      disposable?.dispose();
    }
  },[editor,debounceSaveCode]);
  const theme = useAppSelector(s=>s.theme.theme)
  useEffect(()=>{
    if(theme === "dark"){
      monaco.editor.setTheme('vs-dark');
    }else{
      monaco.editor.setTheme('vs');
    }
  },[editor,theme]);

  useEffect(()=>{
    const container = document.getElementById('code-editor');
    if(container){
      const editor = monaco.editor.create(container, {
        value: currentCode.code || defaultCode,
        language: 'javascript',
        minimap:{
          enabled: false
        },
        scrollBeyondLastLine:false,
        tabSize: 2,
        // automaticLayout:true
      });
      setEditor(editor);
      
      return ()=>{
        editor.dispose();
      }
    }
  },[]);

  useImperativeHandle(ref, () => {
    return editor;
  });

  useEffect(()=>{
    editor?.layout();
    const onReszie = ()=>{
      editor?.layout();
    }
    window.addEventListener("resize",onReszie,false);
    return ()=>window.removeEventListener("resize",onReszie);
  },[editor])

  return (
    <>
      <Editor id="code-editor"></Editor>
    </>

    )

  
}) 


const Editor = styled.div`
flex: 1;
display: block;
text-align: left;
overflow: hidden;
`

