import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { GenCaseType, initGenCase } from "components/test-case-group";
import { useAppDispatch } from "store";
import { createNearlyOrderedList, createNormalList } from "utils/test";


// type ShowPanel = "1" | "2";

type TestResultType = "success" | "error" | "info" | "warning";

type TestResultLinkType = "autoGen"

export interface TestResultLink{
  type:TestResultLinkType
}

interface TestResult {
  type:TestResultType,
  title:string,
  description:string,
  links?: TestResultLink[]
}

interface State {
  testcase:string,
  showPanel:string,
  testResult:TestResult
}


const TestCaseKey = "TestCase";



const initialState:State = {
  testcase:localStorage.getItem(TestCaseKey) || JSON.stringify(createNormalList(8,1,10)),
  showPanel:"1",
  testResult:{
    type: "info",
    title: "运行测试后才会有结果显示",
    description: ""
  }
}

const testCaseSlice = createSlice({
  name:"test",
  initialState,
  reducers:{
    setTestcase(state,action){
      state.testcase = action.payload;
      localStorage.setItem(TestCaseKey,state.testcase);
    },
    setShowPanel(state,action){
      state.showPanel = action.payload;
    },
    setTestResult(state,action){
      state.testResult = action.payload;
      state.showPanel = "2";
      const tr = state.testResult
      message[tr.type]?.(tr.title);
    }
  }
})

export default testCaseSlice.reducer

const { setTestcase,setShowPanel,setTestResult } = testCaseSlice.actions;

export const useSetTestcase = ()=>{
  const dispatch = useAppDispatch();
  return (testcase:string)=>{
    dispatch(setTestcase(testcase));
  }
}


export const useSetShowPanel = ()=>{
  const dispatch = useAppDispatch();
  return (showPanel:string)=>{
    dispatch(setShowPanel(showPanel));
  }
}

export const useSetTestResult = ()=>{
  const dispatch = useAppDispatch();
  return (testResult:TestResult)=>{
    dispatch(setTestResult(testResult));
  }
}


export const useAutoGen = ()=>{
  const setTestCase = useSetTestcase();
  return ()=>{
    let testCase = "";
    if(initGenCase.caseType === GenCaseType.normal){
      testCase = JSON.stringify(createNormalList(initGenCase.caseLen,initGenCase.caseMin,initGenCase.caseMax));
    }else if(initGenCase.caseType === GenCaseType.nearly){
      testCase = JSON.stringify(createNearlyOrderedList(initGenCase.caseLen,initGenCase.caseComplexity));
    }
    if(!testCase){
      message.warning({
        content: "生成过程出错"
      });
    }else{
      setTestCase(testCase);
    }
  };
}
