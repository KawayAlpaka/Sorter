import styled from "@emotion/styled"
import { Button } from "antd"
import { insertionSortStr, selectionSortStr } from "demo";
import { useRun } from "hooks/use-run";
import { useSetDemo } from "hooks/use-set-demo";
import { docUrl } from "utils/open";

export const HelpComponent = ()=>{
  const run = useRun();
  const setDemo = useSetDemo();

  return <Container>
    <h2 className="title">
      <span>运行排序代码请点击右下角的</span>
      <Button className="btn" type="primary" onClick={run}>Run</Button>
    </h2>
    <p>右侧可以编辑排序算法javascript代码和测试用例</p>
    <p>排序代码需要返回一个排序方法，方法输入一个待排序的列表对象<a href={docUrl} target="_blank" rel="noreferrer">SortList</a></p>
    <p>列表对象提供了如：交换位置 <strong>list.swap( i , j )</strong> ，移动位置 <strong>list.move( i , j )</strong>，对比大小 <strong>list.gt( i , j )</strong> 等方法。</p>
    <p>排序时请使用这些方法，编辑器有代码提示，<a href={docUrl} target="_blank" rel="noreferrer">完整文档</a></p>
    <p>可以通过右上角的示例按钮导入示例代码</p>
    <p><Button size="small" type="primary" onClick={()=>setDemo(selectionSortStr)}>导入选择排序示例</Button></p>
    <p><Button size="small" type="primary" onClick={()=>setDemo(insertionSortStr)}>导入插入排序示例</Button></p>
    <br />
    <br />
    {/* <p>代码会自动保存，请放心编辑</p> */}
  </Container>
}

const Container = styled.div`
.title{
  margin-bottom: 1.8;
  .btn{
    margin-left: 4px;
  }
  * {
    vertical-align: middle;
  }
}
padding: 20px;
min-width: 300px;
font-size: 17px;
`;
