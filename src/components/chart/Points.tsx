import { ArrowUpOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Rerunner } from "utils/sort-rerunner";

export const Points = ({points,rerunner,transitionDur}:{points?:{name:string,index:number}[],transitionDur:number,rerunner:Rerunner})=>{
  if(!points){
    return null;
  }
  // 获取当前需要的元素的之前的left值，暂时用过度也酬和

  return <PointsWarp transitionDur={transitionDur}>
    {
      points.map((point,index)=><div id={`potint-${point.name}`} key={point.name} className={["point",`point-${index}`].join(" ")} style={{left:(point.index + 1) * rerunner.leftPerIndex + rerunner.barWidth / 2 + rerunner.offsetLeft}}>
          <ArrowUpOutlined />
          <div className="name">{point.name}</div>
        </div>)
    }
  </PointsWarp>
}

const PointsWarp = styled.div<{transitionDur:number}>`
.point{
  position: absolute;
  bottom: 0;
  transform: translate(-50%,0);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  transition: all ${({transitionDur})=>transitionDur}ms;
  .name{
    line-height: 1;
  }
  /* https://www.jianshu.com/p/e38768ac7740 参考【明亮配色方案】 */
  &.point-0{
    color: #3682be;
  }
  &.point-1{
    color: #45a776;
  }
  &.point-2{
    color: #f05326;
  }
  &.point-3{
    color: #eed777;
  }
  &.point-4{
    color: #334f65;
  }
  &.point-5{
    color: #b3974e;
  }
}
`