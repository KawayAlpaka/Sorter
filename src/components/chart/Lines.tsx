import styled from "@emotion/styled";
import { Rerunner } from "utils/sort-rerunner";

export const Lines = ({lines,rerunner}:{lines?:number[],rerunner:Rerunner})=>{
  if(!lines){
    return null;
  }
  return <LinesWarp>
    {
      lines.map((line,index)=><div key={index} className={"line"} style={{left:line * rerunner.leftPerIndex + rerunner.barWidth + rerunner.space / 2 - 1 + rerunner.offsetLeft}}></div>)
    }
  </LinesWarp>
}
const LinesWarp = styled.div`
display: block;
.line{
  position: absolute;
  bottom: 60px;
  height: 70%;
  width: 2px;
  background-color: var(--chart-line-color);

}
`
