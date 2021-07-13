import { Unsubscribe } from "@reduxjs/toolkit";
import { ICodeEditor } from "components/code-editor";
import { createStore } from "redux";
import { openPrompt } from "./modal";

console.log("AppGlobal")

interface G{
  editor?: ICodeEditor | null,
  chartContainer: {
    resize:()=>void,
    subscribe:(fn:()=>void)=>Unsubscribe
  },
  openPrompt:(message?:string,defaultValue?:string)=>Promise<string>
}

const chartResize = createStore(()=>{
  return null;
});

window.addEventListener("resize",()=>{
  chartResize.dispatch({type:"change"});
},false);

export const AppGlobal:G = {
  chartContainer:{
    resize: ()=>{
      chartResize.dispatch({type:"change"});
    },
    subscribe(fn){
      return chartResize.subscribe(fn);
    }
  },
  openPrompt
}
