
import { SortItem } from "../types";
import { createSortList, swap } from "../utils/tools";


export const _selectionSort = (list:SortItem[],startIndex:number,endIndex:number)=>{
  
  for(let i = startIndex;i<=endIndex;i++){
    let min = list[i].value;
    let minIndex = i;
    for(let j = i+1;j<=endIndex;j++){
      if(list[j].value < min){
        min = list[j].value;
        minIndex = j;
      }
    }
    swap(list,i,minIndex);
  }
}

export const selectionSort = (propList:number[])=>{
  const list = createSortList(propList);
  _selectionSort(list,0,list.length-1)
  return list.map(item=>item.value);
}

