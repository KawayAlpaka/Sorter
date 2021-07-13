


import { SortItem } from "../types";
import { createSortList, move } from "../utils/tools";


export const _insertionSort = (list:SortItem[],startIndex:number,endIndex:number)=>{
  
  for(let i = startIndex+1;i<=endIndex;i++){
    let p = startIndex;
    for(let j = i-1;j>=startIndex;j--){
      if(list[i].value >= list[j].value){
        p = j+1;
        break;
      }
    }
    move(list,i,p)
  }
}

export const insertionSort = (propList:number[])=>{
  const list = createSortList(propList);
  _insertionSort(list,0,list.length-1);
  return list.map(item=>item.value);
}

