// import pako from "pako";


export const selectionSortStr = `
/**
* @param {SortList} list 封装过的数组对象，不能直接访问值，需要调用其中的方法，这样可以解析过程
* @return {void}  无需返回
*/
const sort = (list)=>{
  const len = list.length
  for(let i = 0;i< len;i++){
    let minIndex = i;
    list.lines([i,len]);
    for(let j = i+1;j< len;j++){
      list.points([{name:"i",index:i},{name:"m",index:minIndex},{name:"j",index:j}])
      list.explanation("当前区间最小值为"+ list.get(minIndex))
      if(list.lt(j,minIndex)){
        minIndex = j;
        list.points([{name:"i",index:i},{name:"m",index:minIndex},{name:"j",index:j}])
      }
    }
    list.swap(i,minIndex);
  }
}
return sort;
`;


export const insertionSortStr = `
/**
* @param {SortList} list 封装过的数组对象，不能直接访问值，需要调用其中的方法，这样可以解析过程
* @return {void}  无需返回
*/
const sort = (list) => {
  const len = list.length;
  for (let i = 1; i < len; i++) {
    let p = 0;
    for (let j = i - 1; j >= 0; j--) {
      list.points([{name:"j",index:j},{name:"i",index:i}]);
      if (list.gte(i, j)) {
        p = j + 1;
        break;
      }
    }
    list.move(i, p)
  }
}
return sort;
`;



export const quickSortStr = `
/**
* @param {SortList} list 封装过的数组对象，不能直接访问值，需要调用其中的方法，这样可以解析过程
* @param {number} sIdx 局部排序开始索引，闭区间
* @param {number} eIdx 局部排序结束索引，闭区间
*/
const partiton = (list,sIdx,eIdx)=>{
  if(eIdx-sIdx < 1) return [];
  list.lines([sIdx,eIdx+1]);
  let tIdx = list.random(sIdx,eIdx);
  // let tIdx = sIdx;
  list.explanation(\`随机选择位置【\${tIdx}】和位置【\${sIdx}】交换位置\`);
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

/**
* @param {SortList} list 封装过的数组对象，不能直接访问值，需要调用其中的方法，这样可以解析过程
*/
return (list)=>{
  const len = list.length;
  const sort = (list,sIdx,eIdx)=>{
    const res = partiton(list,sIdx,eIdx)
    for(let item of res){
      sort(list,item.sIdx,item.eIdx);
    }
  }
  sort(list,0,len-1);
  return list;
}
`

// console.log(quickSortStr.length);
// const s0 = encodeURIComponent(quickSortStr);
// console.log(s0);
// console.log(s0.length);
// const s1 = pako.gzip(encodeURIComponent(quickSortStr),{to:"string"});
// console.log(s1);
// const s2 = btoa(s1);
// console.log(s2);
// console.log(s2.length);

