import styled from "@emotion/styled"
import { Tabs } from "antd"
import { useAppSelector } from "store"
import { useSetShowPanel } from "store/test.slice"

import { TestCaseGroup } from "./test-case-group"
import { TestRusult } from "./test-result"

export const TestGroup = ()=>{
  const showPanel = useAppSelector(s=>s.test.showPanel);
  const setShowPanel = useSetShowPanel();

  return <Container>
    <Tabs type={"line"} size={"small"} onTabClick={(key)=>setShowPanel(key)} tabPosition="left" activeKey={showPanel} style={{height:160,padding:"20px 20px 0 0"}}
        // tabBarExtraContent={
        //   <Button type="link">^</Button>
        // }
      >
      <Tabs.TabPane tab="测试用例" key={"1"}>
        <TestCaseGroup></TestCaseGroup>
      </Tabs.TabPane>
      <Tabs.TabPane tab="执行结果" key={"2"}>
        <TestRusult style={{color:"red"}}></TestRusult>
      </Tabs.TabPane>
    </Tabs>
  </Container>

}

const Container = styled.div`
/* background-color: white; */
border-top: solid 1px var(--border-color);
`