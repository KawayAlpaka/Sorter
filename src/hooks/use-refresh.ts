import { useCallback, useState } from "react"

export const useRefresh = ()=>{
  const [,setData] = useState(true);
  return useCallback(()=>{
    setData((d)=>!d);
  },[]);
}
