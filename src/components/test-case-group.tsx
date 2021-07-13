import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useAppSelector } from "store";
import { useAutoGen, useSetTestcase } from "store/test.slice";
import { openTestcaseGenter } from "utils/modal";


console.log("test-case-group");

export interface TestCaseForm {
  caseLen:number,
  caseMin:number,
  caseMax:number,
  caseComplexity:number,
  caseType:number
}

export const TestCaseStoreKey = "test_case";
 
export enum GenCaseType {
  normal = 1,
  nearly = 2,
} 

export const initGenCase = {
  caseLen:8,
  caseMin:0,
  caseMax:9,
  caseComplexity:3,
  caseType:GenCaseType.normal
};

export const TestCaseGroup = ()=>{

  const testcase = useAppSelector((s)=>{
    return s.test.testcase;
  });
  const setTestCase = useSetTestcase();

  const gen = (type:GenCaseType)=>{
    openTestcaseGenter({caseType:type}).then((data)=>{
      console.log(data);
      setTestCase(data);
    });
  }
  
  const autoGen = useAutoGen();

  return <Container>
    <Dropdown.Button onClick={autoGen} className="gen-btn" type="primary" placement="topRight" overlay={
      <Menu>
        <Menu.Item key="1" onClick={()=>gen(GenCaseType.normal)}>
          常规数组
        </Menu.Item>
        <Menu.Item key="2" onClick={()=>gen(GenCaseType.nearly)}>
          近乎排序好的数组
        </Menu.Item>
      </Menu>
    }>
      自动生成
    </Dropdown.Button>
    <TextArea placeholder="测试用例" value={testcase} onChange={evt=>setTestCase(evt.currentTarget.value)}></TextArea>
  </Container>
}

const Container = styled.div`
/* padding: 10px; */
text-align: left;
.gen-btn{
  margin-bottom: 10px;
}

`