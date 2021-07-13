import { SortItem } from "../types";

export const createSortList = (list:number[]):SortItem[]=>{
  let index = 1;
  return list.map((value)=>({id:index++,value}));
}

export const swap = <T>(list:T[],index1:number,index2:number)=>{
  if(index2 === index1) {
    return false;
  }
  if(index1 >= list.length || index1 < 0) {
    throw new Error(`swap index1越界,index1:${index1}-index2:${index2}-length:${list.length}`);
  }
  if(index2 >= list.length || index2 < 0) {
    throw new Error(`swap index2越界,index1:${index1}-index2:${index2}-length:${list.length}`);
  }
    

  const _list = list;
  const item1 = _list[index1];
  const item2 = _list[index2];
  _list[index2] = item1;
  _list[index1] = item2;
  return true;
}

export const move = <T>(list:T[],from:number,to:number)=>{
  if(from === to) return false;
  if(from >= list.length || from < 0) throw new Error(`move from越界,from:${from}-to:${to}-length:${list.length}`);
  if(to >= list.length || to < 0) throw new Error(`move to越界,from:${from}-to:${to}-length:${list.length}`);

  const fromItem = list[from];
  if(from < to){
    for(let i = from;i<to;i++){
      list[i] = list[i+1];
    }
  }else{
    for(let i = from;i>to;i--){
      list[i] = list[i-1];
    }
  }
  list[to] = fromItem;
  return true;
}
