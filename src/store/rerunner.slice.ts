import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { IStep, Rerunner } from "utils/sort-rerunner";

console.log("rerunner.slice");

interface State {
  // rerunner?:Rerunner
  list?:number[],
  steps?:IStep[]
}

const initialState:State = {
  // list:[],
  // steps:[]
}

const rerunnerSlice = createSlice({
  name:"rerunner",
  initialState,
  reducers:{
    setRerunner(state,action){
      state.list = action.payload.list;
      state.steps = action.payload.steps;
    }
  }
});

const { setRerunner } = rerunnerSlice.actions;

export default rerunnerSlice.reducer;



export const useSetRerunner = ()=>{
  const dispatch = useAppDispatch();
  return ({...props}:State)=>{
    dispatch(setRerunner(props));
  }
}



export const useRerunner = () => {
  // const rerunnerList = useAppSelector(s=>{
  //   return s.rerunner.list;
  // });
  // const rerunnerSteps = useAppSelector(s=>{
  //   return s.rerunner.steps;
  // });
  const {list:rerunnerList,steps:rerunnerSteps} = useAppSelector(s=>{
      return s.rerunner;
    });
  const [rerunner,setRerunner] = useState(()=>{
    if(!rerunnerList || !rerunnerSteps) return null;
    return new Rerunner(rerunnerList,rerunnerSteps);
  });
  useEffect(()=>{
    if(!rerunnerList || !rerunnerSteps) return;
    setRerunner(new Rerunner(rerunnerList,rerunnerSteps));
  },[rerunnerList,rerunnerSteps]);

  const resetRerunner = ()=>{
    if(!rerunnerList || !rerunnerSteps) return null;
    setRerunner(new Rerunner(rerunnerList,rerunnerSteps))
  }

  return [rerunner,resetRerunner] as const;
}
