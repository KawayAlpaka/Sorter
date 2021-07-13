import { SortItem } from "../types";
import { genRandom } from "../utils/test";
import { createSortList,  swap } from "../utils/tools";


export const quickSort = (propList:number[])=>{
  const list = createSortList(propList);
  const len = list.length;
  const sort = (list:SortItem[],startIndex:number,endIndex:number)=>{
    const res = partiton(list,startIndex,endIndex)
    for(let item of res){
      sort(list,item.startIndex,item.endIndex);
    }
  }
  sort(list,0,len-1);
  return list.map(item=>item.value);
}


 
const partiton = (list:SortItem[],startIndex:number,endIndex:number)=>{
  if(endIndex-startIndex < 1) return [];
  let targetIndex = genRandom(startIndex,endIndex);
  // let targetIndex = startIndex;
  let targetItem = list[targetIndex];
  swap(list,targetIndex,startIndex);
  targetIndex = startIndex;

  let leftIndex = startIndex + 1;
  let rightIndex = endIndex;
  let midIndex = leftIndex;
  while(true){
    if(rightIndex < midIndex) break;
    if( list[midIndex].value < targetItem.value ){
      swap(list,midIndex,leftIndex);
      midIndex++;
      leftIndex++;
    }else if(list[midIndex].value === targetItem.value){
      midIndex++;
    }else if(list[midIndex].value > targetItem.value){
      swap(list,midIndex,rightIndex);
      rightIndex--;
    }
  }
 
  swap(list,targetIndex,leftIndex-1);
  targetIndex = leftIndex-1;
  const tasts = [
    {startIndex:startIndex,endIndex:targetIndex-1},
    {startIndex:midIndex,endIndex:endIndex},
  ];
  return tasts;

}

export const quickSortWithoutRecursion = (propList:number[])=>{
  const list = createSortList(propList);
  const len = list.length;
  const stack = [];

  stack.push({startIndex:0,endIndex:len-1});
  while(true){
    const task = stack.pop();
    if(!task){
      break;
    }
    const res = partiton(list,task.startIndex,task.endIndex);
    stack.push(...res);
  }
  return list.map(item=>item.value);
}
