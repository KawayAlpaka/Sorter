import styled from "@emotion/styled"
import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "store"
import { useRerunner } from "store/rerunner.slice"
import { AppGlobal } from "utils/global"
import { useRefresh } from "../hooks/use-refresh"
import { SortShowItem } from "../types"
import { SortToolsPanel } from "./chart/SortToolsPanel"
import { Points } from "./chart/Points"
import { StepsPanel } from "./chart/StepsPanel"
import { Lines } from "./chart/Lines"
import { throttleFn } from "hooks/use-debounce"
import { HelpComponent } from "./chart/Help"

console.log("chart.ts")

const animation = (list:SortShowItem[],duration:number=500)=>{
  Promise.resolve().then(()=>{
    console.log("nextTick");
    list.forEach((item)=>{
      if(!item.leftChange){
        return
      }

      const dom = document.getElementById("BarItem"+item.id);
      const y = item.leftChange > 100 ? -100 : item.leftChange < -100 ? 100 : 0;
      const keyframes = [
        {
          transform: `translate(${-item.leftChange}px)`,
        },
        {
          transform: `translate(${-item.leftChange/2}px,${y}px)`,
        },
        { transform: "translate(0)" },
      ];
      const options = {
        duration: duration,
        easing: "cubic-bezier(0,0,0.32,1)",
      };
      dom?.animate(keyframes, options)
    });
  });
}


export const Chart = ()=>{

  const refresh = useRefresh();
  const [rerunner,resetRerunner] = useRerunner();
  const theme = useAppSelector(s=>s.theme.theme);

  useEffect(()=>{
    const throttleUpdate = throttleFn(()=>{
      rerunner?.updateListItem();
      refresh();
    },100);
    const unsubscribe = AppGlobal.chartContainer.subscribe(throttleUpdate);
    return unsubscribe
  },[refresh,rerunner]);

  const [autoRun,setAutoRun] = useState(false);
  const [autoRunInterval,setAutoRunInterval] = useState(1000);

  const transitionDur = (autoRunInterval < 300 && autoRun) ? autoRunInterval : 300;

  const prev = ()=>{
    if(rerunner?.canPrev){
      rerunner.backStep();
      refresh();
      animation(rerunner.list);
      return true;
    }else{
      return false;
    }
  }
  const next = useCallback((duration:number=500)=>{
    if(typeof duration !== "number"){
      duration = 500
    }
    if(rerunner?.canNext){
      rerunner.nextStep();
      refresh();
      // console.log(rerunner.list);
      animation(rerunner.list,duration);
      return true;
    }else{
      if(autoRun){
        setAutoRun(false);
      }
      return false;
    }
  },[rerunner,refresh,autoRun]);
  useEffect(()=>{
    console.log("useEffect autoRun")
    if(autoRun){
      const timer = setInterval(()=>{
        if(!next(autoRunInterval > 500 ? 500 : autoRunInterval)){
          clearInterval(timer)
        }
      },autoRunInterval);
      return ()=>clearInterval(timer);
    }
  },[autoRun,next,autoRunInterval])
  if(!rerunner) {
    return <Container id="chart-container" className={theme}>
      <HelpComponent></HelpComponent>
    </Container>
  }

  // console.log(list);

  return <Container id="chart-container" className={theme}>
    <ChartWarp>
      <StepsPanel rerunner={rerunner} transitionDur={transitionDur}></StepsPanel>
      {
        <Lines lines={rerunner?.currentStep?.lines} rerunner={rerunner}></Lines>
      }
      {
        <Points transitionDur={transitionDur} points={rerunner?.currentStep?.points} rerunner={rerunner}></Points>
      }
      {
        <Explanation >{rerunner?.currentStep?.explanation}</Explanation>
      }
      <div></div>
      {
        rerunner?.list.map((item,index)=>(
        <BarItem key={item.id} id={"BarItem"+item.id} change={item.leftChange !== 0} width={rerunner.barWidth} style={{height:item.height,left:item.left}}>
          { <div className={["baritem-value",!rerunner.isShowIndex ? "hidden" : ""].join(" ")}>{item.value}</div>}
          { <div className={["baritem-index",!rerunner.isShowIndex ? "hidden" : ""].join(" ")}>{index}</div>}
        </BarItem>
        ))
      }
    </ChartWarp>

    { rerunner && <SortToolsPanel 
        prev={prev} next={next} autoRun={autoRun} 
        setAutoRun={setAutoRun} resetRerunner={resetRerunner}  
        autoRunInterval={autoRunInterval} setAutoRunInterval={setAutoRunInterval}
        rerunner={rerunner}></SortToolsPanel> }
  </Container>
}


const Explanation = styled.div`
position: absolute;
/* left: 0; */
right: 16px;
top:10px;
font-weight: bold;
font-size: 17px;
`

const Container = styled.div`
display: flex;
flex-direction: column;
flex: 1;
background-color: var(--editor-background-color);
color: var(--color);
user-select: none;
overflow: hidden;
contain: layout;
`

const ChartWarp = styled.div`
flex: 1;
position: relative;
`
const BarItem = styled.div<{width:number,change:boolean}>`
position: absolute;
bottom: 60px;
display: block;
width: ${(p)=>p.width}px;
border-top-left-radius: 50% ${(p)=>p.width/2}px;
border-top-right-radius: 50% ${(p)=>p.width/2}px;
background-color: var(--baritem-background-color);
transition: background-color 0.3s;
will-change: ${(p)=>p.change ? "transform" : "auto"};
&:hover{
  background-color: var(--baritem-background-hover-color);
  cursor: pointer;
  .baritem-value{
    filter: opacity(1);
    font-size: 24px;
    font-weight: bold;
    top:-30px;
  }
  .baritem-index{
    bottom:-30px;
    font-size: 24px;
    font-weight: bold;
  }
}
.baritem-index{
  position: absolute;
  bottom:-20px;
  left: 50%;
  transform: translate(-50%,0);
  transition: all 0.3s;
}
.baritem-value{
  position: absolute;
  top:-20px;
  left: 50%;
  transform: translate(-50%,0);
  transition: all 0.3s;
}
.hidden{
  filter: opacity(0);
}
`
