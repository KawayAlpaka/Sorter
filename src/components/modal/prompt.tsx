import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { MyModal, useMyModal } from ".";
import { ModalFooter } from "./gen-testcase";

interface Props {
  message?:string,
  defaultValue?:string,
  onFinish:(value:string)=>void
}

const PromptContent = ({message,defaultValue,onFinish}:Props)=>{
  if(!message) message = "请输入信息";
  const [state,setState] = useState({
    value:defaultValue
  });
  const myModal = useMyModal();
  const confirm = ()=>{
    onFinish(state.value || "");
    myModal?.close();
  }
  return <>
    <Typography.Text>{message}</Typography.Text>
    <Input type="text" value={state.value} onChange={evt=>setState({value:evt.target.value})}></Input>
    <ModalFooter>
      <Button type="primary" htmlType={"button"} onClick={confirm}>确定</Button>
      <Button type="default" htmlType="button" onClick={()=>myModal?.close()}>取消</Button>
    </ModalFooter>
  </>
}

export const Prompt = ({...props}:Props)=>{
  return <MyModal>
    <PromptContent {...props}></PromptContent>
  </MyModal>
}