


import { SortItem } from "../types";
import { createSortList} from "../utils/tools";


const merge = (list:SortItem[],startIndex:number,gap:number,endIndex:number)=>{
  let leftIndex = startIndex;
  let rightIndex = gap + 1;
  let _list = [];
  while(true){
    if(leftIndex > gap && rightIndex > endIndex){
      break;
    }
    if(rightIndex <= endIndex){
      if(list[leftIndex].value > list[rightIndex].value){
        _list.push(list[rightIndex]);
        rightIndex++;
      }else{
        if(leftIndex <= gap){
          _list.push(list[leftIndex]);
          leftIndex++;
        }else{
          _list.push(list[rightIndex]);
          rightIndex++;
        }
      }
    }else{
      _list.push(list[leftIndex]);
      leftIndex++;
    }
  }
  list.splice(startIndex,endIndex-startIndex+1,..._list);
}

export const _mergeSort = (list:SortItem[],startIndex:number,endIndex:number)=>{
  // let runCount = 0;
  let dur = endIndex - startIndex;
  if(dur < 1){
    return;
  }
  let gap = Math.floor( dur / 2 ) + startIndex;
  // console.log(gap);
  _mergeSort(list,startIndex,gap);
  _mergeSort(list,gap+1,endIndex);
  if(list[gap].value <= list[gap+1].value) return;
  merge(list,startIndex,gap,endIndex);
  // console.log("O:",runCount);
}

export const mergeSort = (propList:number[])=>{
  const list = createSortList(propList);
  _mergeSort(list,0,list.length-1);
  return list.map(item=>item.value);
}

