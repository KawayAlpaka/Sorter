import { CaretRightFilled, PauseOutlined, StepBackwardFilled, StepForwardFilled } from "@ant-design/icons"
import styled from "@emotion/styled"
import { Dropdown, Menu, Progress} from "antd"
import { Rerunner } from "utils/sort-rerunner"
import { ReactComponent as Stop } from "image/stop.svg"

interface SortToolsPanelProps {
  rerunner:Rerunner,
  prev:()=>void,
  next:()=>void,
  autoRun:boolean,
  setAutoRun:(b:boolean)=>void,
  resetRerunner:()=>void,
  autoRunInterval:number,
  setAutoRunInterval:(n:number)=>void
}


export const SortToolsPanel = ({autoRunInterval,setAutoRunInterval,...props}:SortToolsPanelProps) => {
  const percent = ((props.rerunner.currentStepIndex+1) / props.rerunner.steps.length) * 100;
  const format = ()=>{
    return `${props.rerunner.currentStepIndex+1}/${props.rerunner.steps.length}`;
  }

  const SpeedMenu = <Menu>
    <Menu.Item disabled={autoRunInterval === 2000} key={1} onClick={()=>setAutoRunInterval(2000)}>
      2000
    </Menu.Item>
    <Menu.Item disabled={autoRunInterval === 1000} key={2} onClick={()=>setAutoRunInterval(1000)}>
      1000
    </Menu.Item>
    <Menu.Item disabled={autoRunInterval === 500} key={3} onClick={()=>setAutoRunInterval(500)}>
      500
    </Menu.Item>
    <Menu.Item disabled={autoRunInterval === 200} key={4} onClick={()=>setAutoRunInterval(200)}>
      200
    </Menu.Item>
    <Menu.Item disabled={autoRunInterval === 100} key={5} onClick={()=>setAutoRunInterval(100)}>
      100
    </Menu.Item>
  </Menu>

  const resetHandler = ()=>{
    props.setAutoRun(false);
    props.resetRerunner();
  }

  return <Container>
      <StepBackwardFilled className={"icon"} onClick={props.prev} disabled={!props.rerunner.canPrev}/>
      <Dropdown overlay={SpeedMenu} placement="topLeft" arrow>
        { props.autoRun ? <PauseOutlined className={"icon"} onClick={()=>props.setAutoRun(!props.autoRun)}/> : <CaretRightFilled className={"icon"} onClick={()=>props.setAutoRun(!props.autoRun)}/>}
      </Dropdown>
      <Stop title="重置" className={"stop-icon icon"} onClick={resetHandler}></Stop>
      <Progress className={"progress"} percent={ percent } format={format} />
      <StepForwardFilled className={"icon"} onClick={props.next} disabled={!props.rerunner.canNext}/>
    </Container>

}
const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 12px;
background-color: var(--background-color);
border-top: 1px solid var(--border-color);
/* contain: content; */
.icon{
  will-change: transform,filter;
  font-size: 30px;
  transition: all 0.3s;
  &:hover{
    transform: scale(1.2);
  }
  &[disabled]{
    filter: invert(0.6);
  }
  &[disabled]:hover{
    transform: scale(1);
  }
}
.stop-icon{
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: var(--color);
  fill: currentColor;
}
.progress{
  flex: 1;
  margin-bottom: 2px;
  margin-right: 20px;
  margin-left: 10px;
}
`
