import { SortList } from "../utils/sort-list";



const partiton = (list:SortList,sIdx:number,eIdx:number)=>{
  if(eIdx-sIdx < 1) return [];
  list.lines([sIdx,eIdx+1]);
  let tIdx = list.random(sIdx,eIdx);
  // let tIdx = sIdx;
  list.explanation(`随机选择位置【${tIdx}】和位置【${sIdx}】交换位置`);
  list.swap(tIdx,sIdx);
  tIdx = sIdx;
  let lp = sIdx + 1;
  let rp = eIdx;
  let mp = lp;
  list.points([{name:"t",index:tIdx},{name:"l",index:lp},{name:"m",index:mp},{name:"r",index:rp}]);
  list.explanation();
  while(true){
    if(rp < mp) break;
    if( list.lt(mp,tIdx)){
      list.swap(mp,lp);
      mp++;
      lp++;
      list.points([{name:"t",index:tIdx},{name:"l",index:lp},{name:"m",index:mp},{name:"r",index:rp}]);
    }else if( list.eq(mp,tIdx)){
      mp++;
      list.points([{name:"t",index:tIdx},{name:"l",index:lp},{name:"m",index:mp},{name:"r",index:rp}]);
    }else if(list.gt(mp,tIdx)){
      list.swap(mp,rp);
      rp--;
      list.points([{name:"t",index:tIdx},{name:"l",index:lp},{name:"m",index:mp},{name:"r",index:rp}]);
    }else{
      throw new Error("无限循环了");
    }
  }
  list.swap(tIdx,lp-1);
  tIdx = lp-1;
  list.lines();
  list.points();
  const tasts = [
    {sIdx:sIdx,eIdx:tIdx-1},
    {sIdx:mp,eIdx:eIdx},
  ];
  return tasts;
}

export const testSort2 = (list:SortList)=>{
  const len = list.length;
  const sort = (list:SortList,sIdx:number,eIdx:number)=>{
    const res = partiton(list,sIdx,eIdx)
    for(let item of res){
      sort(list,item.sIdx,item.eIdx);
    }
  }
  sort(list,0,len-1);
  return list;
}
