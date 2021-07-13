import { swap } from "./tools"

const createPropsValidate = (len:number,min:number,max:number)=>{
  if(len<0){
    throw new Error("len必须大等于0")
  }
  if(min<0){
    throw new Error("min必须大等于0")
  }
  if(max<0){
    throw new Error("max必须大等于0")
  }
  if(max<min){
    throw new Error("max必须大等于min")
  }
}

export const genRandom = (min:number,max:number)=>{
  return Math.floor( Math.random() * (max - min + 1) + min);
}

export const createNormalList = (len:number,min:number,max:number):number[]=>{
  createPropsValidate(len,min,max);
  const list = [];
  for(let i=0;i<len;i++){
    list.push(genRandom(min,max));
  }
  return list;
};

export const createNearlyOrderedList = (len:number,complexity:number):number[]=>{
  const list = [];
  for(let i=0;i<len;i++){
    list.push(i);
  }
  for(let i=0;i<complexity;i++){
    swap(list,genRandom(0,len-1),genRandom(0,len-1));
  }
  return list;
};


export type SortFn = (list:number[])=>number[];


export const sortTest = (caseName:string,sortFn:SortFn,cases:number[])=>{
  // console.log("输入参数：",cases);
  const startAt = Date.now();
  const res = sortFn(cases);
  // console.log("输出结果：",res);
  const dur = Date.now() - startAt;
  const testRes = validate(res);
  // console.log(res);
  caseName = caseName.substr(0,4);
  if(testRes){
    console.log(`【${caseName}】测试通过，用时${dur}ms`);
  }else{
    console.warn(`【${caseName}】测试失败，用时${dur}ms`);
  }
  // console.log(`------------------------------`);
  return testRes;
}

const validate = (list:number[])=>{
  const len = list.length;
  for(let i=0;i<len-1;i++){
    if(list[i] > list[i+1]) {
      console.log(`${i}:${list[i]} > ${list[i+1]}`);
      return false
    };
  }
  return true;
}
