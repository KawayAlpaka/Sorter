
import { MyModal } from "components/modal";
import { CopyPrompt, CopyPromptProps } from "components/modal/copy-prompt";
import { GenTestcase } from "components/modal/gen-testcase";
import { Prompt } from "components/modal/prompt";
import { GenCaseType } from "components/test-case-group";
import ReactDOM from "react-dom";
import { AppGlobal } from "./global";

console.log("modal")

export const openTestcaseGenter = ({caseType}:{caseType:GenCaseType})=>{
  return OpenMyModal(GenTestcase,{caseType}) as Promise<string>;
}

export const openPrompt = (message?:string,defaultValue?:string)=>{
  return new Promise<string>((resolve,reject)=>{
    const onFinish = (value:string)=>{
      resolve(value);
    }
    const div = document.createElement('div');
    ReactDOM.render(<Prompt message={message} defaultValue={defaultValue} onFinish={onFinish}></Prompt>,div);
  })
}


export const openPrompt2 = (message?:string,defaultValue?:string)=>{
  return AppGlobal.openPrompt(message,defaultValue);
}

export const OpenMyModal = <Props extends {}>(Component:(props:Props)=>JSX.Element,{...props}:Omit<Props,"onFinish">)=>{
  return new Promise<any>((resolve,reject)=>{
    const onFinish = (value:any)=>{
      resolve(value);
    }
    const div = document.createElement('div');
    const ps = {
      ...props,
      onFinish,
    } as any as Props;
    ReactDOM.render(<MyModal>
      {/* <Component {...props} onFinish={onFinish}></Component> */}
      <Component {...ps}></Component>
    </MyModal>,div);
  })
}

export const openCopyPrompt = ({...props}:CopyPromptProps)=>{
  return OpenMyModal(CopyPrompt,props)
}

