import { setCurrentCode } from "store/code.slice";
import { AppGlobal } from "utils/global";

export const useSetDemo = ()=>{

  const setDemo = (code:string)=>{
    const editor = AppGlobal.editor;
    if(editor){
      setCurrentCode({
        code
      });
      editor.setValue(code);
    }
  }

  return setDemo

}