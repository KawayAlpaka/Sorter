import { useAppSelector } from "store";
import { useSetRerunner } from "store/rerunner.slice";
import { useSetTestResult } from "store/test.slice";
import { AppGlobal } from "utils/global";
import { createSandbox } from "utils/sandbox";
import { SortList } from "utils/sort-list";

export const useRun = ()=>{
  const testcase = useAppSelector(s=>s.test.testcase);
  const setRerunner = useSetRerunner();
  const setTestResult = useSetTestResult();
  const run = ()=>{
    const editor = AppGlobal.editor;
    if(editor){
      
      try{
        const code = editor.getValue();
        const fn = createSandbox(code)();
        // const fn = testSort2;
        let list;
        try{
          list = JSON.parse(testcase);
        }catch(e){
          setTestResult({
            type:"error",
            title:"测试用例解析失败",
            description: "示例: [1,2,3,3,2,1]，点击【自动生成】可自动生成测试用例",
            links:[
              {type:"autoGen"}
            ]
          });
          return;
        }
        if(!Array.isArray(list)){
          setTestResult({
            type:"error",
            title:"测试用例应该是数组格式",
            description: "示例: [1,2,3,4,5,6]，点击【自动生成】可自动生成测试用例",
            links:[
              {type:"autoGen"}
            ]
          });
          return;
        }
        
        if(typeof fn === "function"){
          const sortList = new SortList(list);
          try{
            sortList.run(fn);
            const resullt = sortList.validate();
            if(resullt.isSuccess){
              setTestResult({
                type:"success",
                title:"运行成功，并测试通过",
                description: "可以在左边栏查看每一个排序步骤"
              });
            }else{
              setTestResult({
                type:"warning",
                title:"运行完成，但排序结果不正确",
                description: resullt.message
              });
            }
          }catch(e){
            setTestResult({
              type:"error",
              title:"运行错误",
              description: e.toString()
            });
          }
          setRerunner({list:sortList.sourceList,steps:sortList.steps});
        }else{
          setTestResult({
            type:"error",
            title:"运行错误",
            description: "代码最后必须返回一个排序方法, (list) => void"
          });
        }
  
      }catch(e){
        setTestResult({
          type:"error",
          title:"编译错误",
          description: e.toString()
        });
      }
    }
  }
  return run;
}

