import styled from "@emotion/styled";
import { useDebounceFn } from "hooks/use-debounce";
import { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "store";
import { Theme } from "utils/switch-theme";
import { ReactComponent as MoreIcon } from "image/more.svg"


const ResizePrevFlexKey = "ResizePrevFlex";
const ResizeNextFlexKey = "ResizeNextFlex";

export const ResizeBar = ({onResize}:{onResize?:()=>void})=>{
  console.log("ResizeBar");

  const saveFlex = useCallback((prevFlex:string,nextFlex:string)=>{
    console.log("setFlex");
    localStorage.setItem(ResizePrevFlexKey,prevFlex);
    localStorage.setItem(ResizeNextFlexKey,nextFlex);
  },[]);

  const debounceSaveFlex = useDebounceFn(saveFlex,200);

  useEffect(()=>{
    const prevFlexStr = localStorage.getItem(ResizePrevFlexKey);
    const nextFlexStr = localStorage.getItem(ResizeNextFlexKey);
    if(prevFlexStr && nextFlexStr){
      const dom = ref.current as HTMLDivElement;
      const prev = dom.previousElementSibling as HTMLElement;
      const next = dom.nextElementSibling as HTMLElement;
      if(prev && next){
        prev.style.flex = prevFlexStr;
        next.style.flex = nextFlexStr;
        onResize?.();
      }
    }
  },[onResize]);


  const move = (movementX:number)=>{
    if(movementX === 0){
      return;
    }
    const dom = ref.current as HTMLDivElement;
    const prev = dom.previousElementSibling as HTMLElement;
    const next = dom.nextElementSibling as HTMLElement;

    if(prev && next){
      const prevRect = prev.getBoundingClientRect();
      const prevWidth = prevRect.width;
      const nextRect = next.getBoundingClientRect();
      const nextWidth = nextRect.width;
      const perPix = 2 / (prevWidth + nextWidth);
      
      const newPrevFlex = perPix *  (prevWidth + movementX );
      const newNextFlex = perPix *  (nextWidth - movementX );
      const newPrevFlexStr = `${newPrevFlex} 0 0px`;
      const newNextFlexStr = `${newNextFlex} 0 0px`;
      prev.style.flex = newPrevFlexStr;
      next.style.flex = newNextFlexStr;
      debounceSaveFlex(newPrevFlexStr,newNextFlexStr);
    }
    onResize?.()
  }
  const onMouseDown = (evt:SyntheticEvent<HTMLDivElement,MouseEvent>)=>{
    console.log("onMouseDown");
    console.log(evt);
    const onUp = ()=>{
      console.log("mouseup");
      document.removeEventListener("mouseup",onUp);
      document.removeEventListener("mousemove",onMove);
    };

    const onMove = (evt:MouseEvent)=>{
      // console.log("onMove");
      evt.stopPropagation();
      evt.preventDefault();
      move(evt.movementX);
    }

    document.addEventListener("mouseup",onUp,false);
    document.addEventListener("mousemove",onMove,false);
  }
  const onTouchStart = (evt:SyntheticEvent<HTMLDivElement,TouchEvent>)=>{
    console.log("onTouchStart");
    const touch = evt.nativeEvent.touches[0];
    if(touch){
      let prevPageX = touch.pageX;
      const onUp = ()=>{
        console.log("touchup");
        document.removeEventListener("touchend",onUp);
        document.removeEventListener("touchmove",onTouchMove);
      };
      const onTouchMove = (evt:TouchEvent)=>{
        // console.log("onTouchMove");
        evt.stopPropagation();
        evt.preventDefault();
        const touch = evt.touches[0];
        if(touch){
          const movementX = touch.pageX - prevPageX;
          prevPageX = touch.pageX;
          move(movementX);
        }
      }
      document.addEventListener("touchend",onUp,false);
      document.addEventListener("touchmove",onTouchMove,false);
    }
  }

  const theme = useAppSelector(s=>s.theme.theme)

  const ref = useRef<HTMLDivElement>(null);
  return <ResizeBarContainer theme={theme} ref={ref} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
    <MoreIcon className="more"></MoreIcon>
    <MoreIcon className="more"></MoreIcon>
  </ResizeBarContainer>
}




const ResizeBarContainer = styled.div<{theme?:Theme}>`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
width: 14px;
border-right: 1px solid var(--border-color);
border-left: 1px solid var(--border-color);
touch-action: none;
/* background-color: ${({theme})=> theme ==="dark" ? "transparent" : "transparent" }; */
/* color: ${({theme})=> theme ==="dark" ? "#919191" : "#505050" }; */

cursor: col-resize;
transition: all 0.3s;
/* filter: brightness(0); */
.more{
  width: 12px;
  height: 12px;
  color: var(--color);
  path{
    /* color: currentColor; */
    fill: currentColor;
  }
}
/* transform: scale(1.01); */
&:hover{
  background-color: var(--background-color-hover);
  /* filter: brightness(1.1); */
}
`