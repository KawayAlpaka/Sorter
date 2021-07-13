import { IStep} from "./sort-rerunner";
import { genRandom } from "./test";
import { move, swap } from "./tools";

const defauleStep:IStep = {
  type:"swap",
  from:-1,
  to:-1,
  index1:-1,
  index2:-1,
  lines:[],
  points:[],
  explanation:"",
  result:false
}

export class SortList {
  sourceList:number[] = [];
  list:number[] = [];
  steps:IStep[] = [];
  private _lines:number[] = [];
  private _points:{name:string,index:number}[] = [];
  private _explanation:string = "";
  constructor(list:number[]){
    this.sourceList = [...list];
    this.list = [...list];
  }
  private addStep(step:Partial<IStep>){
    if(!step.type){
      throw new Error("step 必须要有 type")
    }
    this.steps.push({
      ...defauleStep,
      lines:[...this._lines],
      points:[...this._points],
      explanation:this._explanation,
      ...step
    });
  }
  validate(){
    const len = this.list.length;
    const list = [...this.list];
    for(let i=0;i<len-1;i++){
      if(list[i] > list[i+1]) {
        return {
          isSuccess:false,
          message:`索引 ${i} 位置的值为 ${list[i]} ，它比位置${i+1}的值${list[i+1]}大。（排序结果应该是一个升序数组）`
        }
      };
    }
    return {
      isSuccess: true,
      message: "验证通过"
    };
  }
  run(sortFn:(list:SortList)=>void){
    sortFn(this);
    return [...this.list];
  }
    /**
   * 数组长度
   **/
    get length(){
    return this.list.length;
  }
  /**
   * 交换两个索引值的位置
   **/
  swap(from:number,to:number){
    const result = swap(this.list,from,to);
    result && this.addStep({
      type:"swap",
      from:from,
      to:to,
      result
    });
  }
    /**
   * 移动索引from值到to的位置
   **/
  move(from:number,to:number){
    const result = move(this.list,from,to);
    result && this.addStep({
      type:"move",
      from:from,
      to:to,
      result
    });
  }
  /**
   * 获取列表中对应索引的参数值
   **/
  get(index:number){
    return this.list[index];
  }
   /**
   * 判断列表中索引1的值是否大于索引2的值
   **/
  gt(index1:number,index2:number){
    const result = this.list[index1] > this.list[index2];
    this.addStep({
      type: "isGt",
      index1,
      index2,
      result
    });
    return result;
  }
  /**
   * 判断列表中索引1的值是否大于等于索引2的值
   **/
  gte(index1:number,index2:number){
    const result = this.list[index1] >= this.list[index2];
    this.addStep({
      type: "isGte",
      index1,
      index2,
      result
    });
    return result;
  }
    /**
   * 判断列表中索引1的值是否小于索引2的值
   **/
  lt(index1:number,index2:number){
    const result = this.list[index1] < this.list[index2];
    this.addStep({
      type: "isLt",
      index1,
      index2,
      result
    });
    return result;
  }
    /**
   * 判断列表中索引1的值是否小于等于索引2的值
   **/
  lte(index1:number,index2:number){
    const result = this.list[index1] <= this.list[index2];
    this.addStep({
      type: "isLte",
      index1,
      index2,
      result
    });
    return result;
  }
   /**
   * 判断列表中索引1的值是否等于索引2的值
   **/
  eq(index1:number,index2:number){
    const result = this.list[index1] === this.list[index2];
    this.addStep({
      type: "isEq",
      index1,
      index2,
      result
    });
    return result;
  }
  /**
   * 判断列表中索引1的值是否不等于索引2的值
   **/
  neq(index1:number,index2:number){
    const result = this.list[index1] !== this.list[index2];
    this.addStep({
      type: "isNeq",
      index1,
      index2,
      result
    });
    return result;
  }
   /**
   * 返回一个[min,max]区间的整数
   **/
  random(min:number,max:number){
    return genRandom(min,max);
  }
    /**
   * 在指定位置设置标记线，不传参数则清空，用于展示过程
   **/
  lines(lines?:number[]){
    if(lines){
      this._lines = lines;
    }else{
      this._lines = [];
    }
  }
  /**
   * 设置标记指针,不传参数则清空，用于展示过程
   **/
  points(points?:{name:string,index:number}[]){
    if(points){
      this._points = points;
    }else{
      this._points = []
    }
  }
  /**
   * 设置描述文字,不传参数则清空
   **/
  explanation(explanation?:string){
    if(explanation){
      this._explanation = explanation;
    }else{
      this._explanation = "";
    }
  }
}
