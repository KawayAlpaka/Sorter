import { Button, Input, Typography } from "antd";
import { useMyModal } from ".";
import { ModalFooter } from "./gen-testcase";

export interface CopyPromptProps {
  title:string,
  copyData:string,
  tip?:string
  // onFinish:(value:string)=>void
}

export const CopyPrompt = ({title="需要复制的内容",copyData,tip}:CopyPromptProps)=>{
  const myModal = useMyModal();
  return <>
    <Typography.Text>{title}</Typography.Text>
    <Input.TextArea defaultValue={copyData} showCount autoSize={{ minRows: 6, maxRows: 24 }} bordered={true} ></Input.TextArea>
    { tip ? <Typography.Text type="danger">{tip}</Typography.Text> : null}
    <ModalFooter>
      <Button type="default" htmlType="button" onClick={()=>myModal?.close()}>退出</Button>
    </ModalFooter>
  </>
}