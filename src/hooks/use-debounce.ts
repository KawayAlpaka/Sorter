import { useCallback, useEffect, useRef, useState } from "react"

export const useDebounce = <T>(value:T,delay:number=2000)=>{
  const [debounceValue,setDebounceValue] = useState(value);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounceValue(value);
    },delay)
    return ()=>clearTimeout(timer);
  },[value,delay]);

  return debounceValue;
}


export const useDebounceFn = <T extends (...args:any[])=>any>(fn:T,delay:number=2000)=>{
  // console.log("useDebounceFn");
  let timer = useRef<NodeJS.Timeout>();
  return useCallback((...args:Parameters<T>)=>{
    if(timer.current){
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(()=>{
      fn(...args)
    },delay);
  },[delay,fn]);
}


export const debouceFn = (fn:Function,delay:number=2000)=>{
  let timer:any;
  const fn1 = (...args:any[])=>{
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      fn(...args)
    },delay);
  }
  return fn1;
}


export const throttleFn = (fn:Function,delay:number=2000)=>{
  let timer:any;
  const fn1 = (...args:any[])=>{
    if(!timer){
      timer = setTimeout(()=>{
        timer = null;
        fn(...args)
      },delay);
    }
  }
  return fn1;
}
