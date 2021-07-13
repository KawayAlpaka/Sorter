import styled from "@emotion/styled"
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Rerunner } from "utils/sort-rerunner"

export const StepsPanel = ({rerunner,transitionDur}:{rerunner:Rerunner,transitionDur:number})=>{
  const [top,setTop] = useState(0);
  const showCount = useRef(rerunner.currentStepIndex + 10);
  const id = `step-${rerunner.currentStepIndex}`;
  useEffect(()=>{
    const stepEle = document.getElementById(id);
    if(stepEle){
      setTop(-stepEle.offsetTop + 22);
    }
  },[id]);

  useEffect(()=>{
    showCount.current = rerunner.currentStepIndex + 10;
  },[rerunner]);

  const StepPanels = [];
  if(showCount.current < rerunner.currentStepIndex + 5){
    showCount.current += 5;
  }
  for(let i=0;i<rerunner.steps.length && i< showCount.current;i++){
    StepPanels.push(<StepPanel key={i} label={""+i} rerunner={rerunner} stepIndex={i} ></StepPanel>)
  }
  return <Container>
  {
    rerunner ? <>
      <div className={"step-messages"}>
        <div className="message">上一步：</div>
        <div className="message">当前步：</div>
        <div className="message">下一步：</div>
      </div>
      <Panel transitionDur={transitionDur}>
        <div className={"step-group"} style={{top:top}} >
          <StepPanel key={-1} label={""} rerunner={rerunner} stepIndex={-1} ></StepPanel>
          { StepPanels }
          <StepPanel key={rerunner.steps.length} label={""} rerunner={rerunner} stepIndex={rerunner.steps.length}></StepPanel>
        </div>
      </Panel></> : null
  }
  </Container>
}


const Container = styled.div`
display: flex;
margin-left: 10px;
margin-top: 10px;
`

const Panel = styled.div<{transitionDur:number}>`
flex: 1;
position: relative;
height: 66px;
overflow: hidden;

.step-messages{
  .message{
    height: 22px;
  }
}
.step-group{
  position: absolute;
  top: 0;
  transition: top ${({transitionDur})=>transitionDur}ms;
}
`


const StepPanel = React.memo( ({rerunner,stepIndex,label}:{rerunner:Rerunner,stepIndex?:number,label?:string}) => {
  if(rerunner.steps.length <=0 ){
    return null
  }
  if(rerunner.list.length <= 0){
    return null
  }
  
  if(stepIndex === undefined){
    stepIndex = rerunner.currentStepIndex;
  }
  let content = null;
  let isCurrentStep = stepIndex === rerunner.currentStepIndex;
  // let isNextStep = stepIndex > rerunner.currentStepIndex;
  // let isPrevStep = stepIndex < rerunner.currentStepIndex;
  if(stepIndex === -1){
    content = <span>开始</span>
  }
  
  if(stepIndex >= rerunner.steps.length){
    content = <span>"结束"</span>
  }
  label = stepIndex as any;

  const step = rerunner.steps[stepIndex];

  const id = `step-${stepIndex}`;
  // const oldEle = document.getElementById(id);
  // // console.log(document.getElementById(id));
  // if(oldEle){
  //   const oldTop = oldEle.getBoundingClientRect().top;
  //   console.log(id,"oldTop",oldTop);
  //   Promise.resolve().then(()=>{
  //     const newEle = document.getElementById(id);
  //     if(newEle){
  //       const newTop = newEle.getBoundingClientRect().top;
  //       console.log(id,"newTop",newTop);
  //       const change = newTop-oldTop;
  //       console.log(id,"change",change)
  //       console.log("newEle === oldEle:",newEle === oldEle)
  //       if(change !== 0){
  //         const keyframes = [
  //           {
  //             transform: `translate(0,${-change}px)`,
  //           },
  //           { transform: "translate(0,0)" },
  //         ];
  //         const options = {
  //           duration: 500,
  //           easing: "cubic-bezier(0,0,0.32,1)",
  //         };
  //         newEle.animate(keyframes,options)
  //       }
  //     }
  //   });
  // }else{
  //   Promise.resolve().then(()=>{
  //     const newEle = document.getElementById(id);
  //     if(newEle){
  //       const newTop = newEle.getBoundingClientRect().top;
  //       console.log(id,"newTop",newTop);
  //       const change = 22;
  //       console.log(id,"change",change)
  //       console.log("newEle === oldEle:",newEle === oldEle)
  //       const keyframes = [
  //         {
  //           transform: `translate(0,${change}px)`,
  //         },
  //         { transform: "translate(0,0)" },
  //       ];
  //       const options = {
  //         duration: 500,
  //         easing: "cubic-bezier(0,0,0.32,1)",
  //       };
  //       newEle.animate(keyframes,options)
  //     }
  //   });
  // }

  if(!step){
    if(content){
      return <StepWarp id={id} className={isCurrentStep? "iscruent" : "notcruent"}>
        <div className={"content"}>
          {/* { label && <label>{label}:</label>} */}
          {content}
        </div>

      </StepWarp>
    }
    return null;
  }
  switch(step.type){
    case "swap": 
    content = <span>位置 <span className="step-index-message">{step.from}</span>和位置<span className="step-index-message">{step.to}</span>交换</span>
    break;
    case "move":
    content = <span>位置<span className="step-index-message">{step.from}</span>移动到<span className="step-index-message">{step.to}</span></span>
    break;
    case "isEq":
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>和位置<span className="step-index-message">{step.index2}</span>的值是否相等,结果为 <span className="step-result-message">{step.result ? "真" : "假"}</span> </span>
    break;
    case "isNeq": 
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>和位置<span className="step-index-message">{step.index2}</span>的值是否相等,结果为 <span className="step-result-message">{step.result ? "真" : "假"}</span></span>
    break;
    case "isGt": 
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>的值是否大于 位置<span className="step-index-message">{step.index2}</span>的值，结果为： <span className="step-result-message">{step.result ? "真" : "假"}</span></span>
    break;
    case "isGte": 
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>的值 是否大于等于 位置<span className="step-index-message">{step.index2}</span>的值，结果为： <span className="step-result-message">{step.result ? "真" : "假"}</span></span>
    break;
    case "isLt": 
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>的值 是否小于 位置<span className="step-index-message">{step.index2}</span>的值，结果为： <span className="step-result-message">{step.result ? "真" : "假"}</span></span>
    break;
    case "isLte": 
    content = <span>判断位置<span className="step-index-message">{step.index1}</span>的值 是否小于等于 位置<span className="step-index-message">{step.index2}</span>的值，结果为： <span className="step-result-message">{step.result ? "真" : "假"}</span></span>
    break;
    default:
    return null;
  }

  return <StepWarp id={id} className={isCurrentStep? "iscruent" : "notcruent"}>
    <div className={"content"}>
    {/* { label && <label>{label}:</label>} */}
    {content}
    </div>

  </StepWarp>
},(prevProps,nextProps)=>{
  if(prevProps.rerunner === nextProps.rerunner){
    return true
  }
  return false
});

const StepWarp = styled.div`
display: flex;
justify-content: left;
transition: all 1s;
&.notcruent{
  /* .content{
    transform: scale(0.8);
    filter: opacity(0.8);
  } */
}
.content{
  transition: all 0.5;
}
label{
  display: inline-block;
  color:red;
}
span{
  display: inline-block;
}

.step-index-message{
  color: var(--step-index-message-color);
  font-weight: bold;
}
.step-result-message{
  color: var(--step-result-message-color);
  font-weight: bold;
}
`