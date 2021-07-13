import styled from "@emotion/styled";
import { Button, Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { GenCaseType, initGenCase, TestCaseForm } from "components/test-case-group";
import { useEffect, useState } from "react";
import { createNearlyOrderedList, createNormalList } from "utils/test";
import { MyModal, useMyModal } from ".";

console.log("gen-testcase.tsx");

export interface GenTestcaseProps {
  caseType:GenCaseType,
  onFinish:(caseStr:string)=>any
}

export const TestcaseModal = ({...props}:GenTestcaseProps)=>{
  return <MyModal>
    <GenTestcase {...props}/>
  </MyModal>
}

export const GenTestcase = ({...props}:GenTestcaseProps)=>{
  const [genCase] = useState<TestCaseForm>({
    ...initGenCase,
    caseType:props.caseType
  });
  const myModal = useMyModal();

  const [genCaseForm] = useForm();

  useEffect(()=>{
    genCaseForm.setFieldsValue(genCase);
  },[genCaseForm,genCase])

  const [modal] = Modal.useModal();
  const genTestCase = (values:TestCaseForm)=>{
    console.log(values);
    let testCase = "";
    if(props.caseType === GenCaseType.normal){
      initGenCase.caseType = props.caseType;
      initGenCase.caseLen = values.caseLen;
      initGenCase.caseMin = values.caseMin;
      initGenCase.caseMax = values.caseMax;
      testCase = JSON.stringify(createNormalList(values.caseLen,values.caseMin,values.caseMax));
    }else if(props.caseType === GenCaseType.nearly){
      initGenCase.caseType = props.caseType;
      initGenCase.caseLen = values.caseLen;
      initGenCase.caseComplexity = values.caseComplexity;
      testCase = JSON.stringify(createNearlyOrderedList(values.caseLen,values.caseComplexity));
    }
    if(!testCase){
      modal.info({
        title:"参数错误"
      });
    }else{
      props.onFinish(testCase);
      myModal?.close();
    }
  }

  return <Container>
  <Form form={genCaseForm} layout="horizontal" onFinish={genTestCase}>
      <Form.Item name="caseLen" label="用例长度"
        rules={[{required:true, message: "长度必填"},{type:"number", min: 0, message: "不能小于0" },{type:"number",max:100,message:"不能大于100"}]}>
        <InputNumber placeholder="用例长度"></InputNumber>
      </Form.Item>
      {
        genCase.caseType === GenCaseType.normal ?
        <>
          <Form.Item name="caseMin" label="用例最小值"
            rules={[{required:true, message: "最小值必填"},{type:"number", min: 0, message: "不能小于0" }]}>
            <InputNumber placeholder="最小值"></InputNumber>
          </Form.Item>
          <Form.Item name="caseMax" label="用例最大值"
            rules={[
              {required:true, message: "最大值必填"},
              ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('caseMin') < value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('最大值必须小于最小值'));
              },
            })]}>
            <InputNumber placeholder="最大值"></InputNumber>
          </Form.Item>
        </> : null
      }
      {
        genCase.caseType === GenCaseType.nearly ?
        <Form.Item name="caseComplexity" label="复杂度"
          rules={[{required:true, message: "最小值必填"},]}
        >
          <InputNumber placeholder="复杂度"></InputNumber>
        </Form.Item> : null
      }
      <br />
      <ModalFooter>
        <Button type="primary" htmlType={"submit"} >确定</Button>
        <Button type="default" htmlType="button" onClick={()=>myModal?.close()}>取消</Button>
      </ModalFooter>
    </Form>

  </Container> 
    
}

const Container = styled.div`
/* padding-bottom: 60px; */

`

export const ModalFooter = styled.div`
position: absolute;
right: 0;
bottom: 0;
text-align: right;
padding: 10px 20px;
`

