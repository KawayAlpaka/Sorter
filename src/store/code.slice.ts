import { createSlice } from '@reduxjs/toolkit'
import { defaultCode} from 'components/code-editor';
import { useAppDispatch } from 'store';
import { AppGlobal } from 'utils/global';


console.log("code.slice");

export interface Code {
  id:string,
  name:string,
  // code?:string,
}

export interface FullCode {
  id:string,
  name:string,
  code:string,
}

export interface CurrentCode {
  id?:string,
  name?:string,
  code:string,
}

interface State {
  // codes: {[key:string]:Code},
  list: Code[]
  // codeEditor:ICodeEditor|null,
  currentCode:CurrentCode
}

const CurrentCodeKey = "CurrentCode";
const currentCodeStr = localStorage.getItem(CurrentCodeKey);
const currentCode = currentCodeStr ? JSON.parse(currentCodeStr) : { code:defaultCode};
const saveCurrentCode = (code:CurrentCode)=>{
  localStorage.setItem(CurrentCodeKey,JSON.stringify(code));
  if(code.id){
    localStorage.setItem(getCodeKeyById(code.id),JSON.stringify(code));
  }
}



const CodeListKey = "CodeList";
const listStr = localStorage.getItem(CodeListKey);
const list = listStr ? JSON.parse(listStr) : [];
const saveList = (list:Code[])=>{
  localStorage.setItem(CodeListKey,JSON.stringify(list));
}

const initialState:State = {
  // codes:{},
  list,
  currentCode
}

export const getCodeKeyById = (id:string) => {
  return "code-" + id;
}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    add: (state,action) => {
      const code = {...action.payload};
      state.currentCode = action.payload;
      saveCurrentCode(state.currentCode);
      delete code.code;
      state.list.push(code);
      saveList(state.list)
    },
    del:(state,action)=>{
      const code = action.payload as Code;
      state.list = [...state.list.filter(c=>c.id !== code.id)];
      localStorage.removeItem(getCodeKeyById(code.id));
      saveList(state.list);
      if(state.currentCode.id === code.id){
        delete state.currentCode.id
        delete state.currentCode.name
        saveCurrentCode(state.currentCode);
      }
    },
    setCurrentCode:(state,action)=>{
      const code = action.payload as CurrentCode;
      state.currentCode = code;
      // AppGlobal.editor?.setValue(code.code);
      saveCurrentCode(code);
    },
    setName:(state,action)=>{
      const code = action.payload as Code;
      const list_code = state.list.find(item=>item.id === code.id);
      if(list_code){
        list_code.name = code.name;
        saveList(state.list);
      }
      if(state.currentCode.id === code.id){
        state.currentCode.name = code.name;
        saveCurrentCode(state.currentCode);
      }
    },
    resetCode:(state,action)=>{
      state.currentCode.code = defaultCode;
      saveCurrentCode(state.currentCode);
      AppGlobal.editor?.setValue(state.currentCode.code);
    }
  }
})

// Action creators are generated for each case reducer function
export const { add,del,setCurrentCode,setName,resetCode } = codeSlice.actions


const genCodeId = ()=>{
  return "" + Math.floor((Math.random() * 1000000000));
}

export const getFullCodeById = (id:string)=>{
  const fullCodeStr = localStorage.getItem(getCodeKeyById(id));
  return fullCodeStr ? JSON.parse(fullCodeStr) : { code:""};
} 

export const useAddCode = ()=>{
  const dispatch =  useAppDispatch();
  return ({...code}:CurrentCode)=>{
    dispatch(add({
      id:genCodeId(),
      ...code
    }));
  }
}
export const useDelCode = ()=>{
  const dispatch =  useAppDispatch();
  return ({...code}:Code)=>{
    dispatch(del(code));
  }
}

export const useSetCurrentCode = ()=>{
  const dispatch =  useAppDispatch();
  return ({...code}:CurrentCode)=>{
    dispatch(setCurrentCode(code));
  }
}

export const useSetCodeName = ()=>{
  const dispatch =  useAppDispatch();
  return ({...code}:Code)=>{
    dispatch(setName(code));
  }
}
export const useResetCode = ()=>{
  const dispatch =  useAppDispatch();
  return ()=>{
    dispatch(resetCode(""));
  }
}

export default codeSlice.reducer
