import styled from "@emotion/styled";
import { Alert, Button } from "antd"
import React from "react";
import { useAppSelector } from "store";
import { TestResultLink, useAutoGen, useSetShowPanel } from "store/test.slice";

interface Props{
  style?: React.CSSProperties
}

export const TestRusult = ({...props}:Props)=>{
  const testResult = useAppSelector(s=>s.test.testResult);
  console.log(testResult);
  return <Container>
    <Alert
      message={testResult.title}
      description={testResult.description}
      type={testResult.type}
      showIcon
    />
    {
      <Links links={testResult.links}></Links>
    }
  </Container>

}

const Links = ({links}:{links?:TestResultLink[]})=>{
  const autoGen = useAutoGen();
  const setShowPanel = useSetShowPanel();
  const autoGen2 = ()=>{
    autoGen();
    setShowPanel("1");
  }
  if(!links){
    return null;
  }
  return <div className="links-warp">
    {
      links.map((link,index)=>{
        switch(link.type){
          case "autoGen":return <Button key={index} onClick={autoGen2} type="primary">自动生成</Button>;
        }
        return null;
      })
    }
  </div>
}

const Container = styled.div`
text-align: left;
.links-warp{
  margin-top: 6px;
}
`