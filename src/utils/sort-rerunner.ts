
import { SortShowItem } from "../types";
import { AppGlobal } from "./global";
import { genRandom } from "./test";
import { move, swap } from "./tools";

console.log("sort-rerunner");

export interface IStep {
  type: "swap" | "move" | "isGt" | "isLt" | "isGte" | "isLte" | "isEq" | "isNeq"
  from:number,
  to:number,
  index1:number,
  index2:number,
  lines:number[],
  points:{name:string,index:number}[],
  explanation:string,
  result:boolean
}



const Container = {
  width:1280,
  height:500
}

const resetContainer = ()=>{
  // console.log("resetContainer");
  const rect = document.getElementById("chart-container")?.getBoundingClientRect();
  if(rect){
    Container.width = rect.width;
    Container.height = rect.height;
  }
}
AppGlobal.chartContainer.subscribe(resetContainer);

export class Rerunner{
  private sourctList:number[] = [];
  list:SortShowItem[] = [];
  steps:IStep[] = [];
  currentStepIndex = -1;
  private min:number= 0;
  private max:number= 0;
  private dur:number= 0;


  // private space:number = 0;
  public barWidth:number = 0;
  public space:number = 0;
  public heightPerValue:number=0;
  public leftPerIndex:number=0;
  public offsetLeft:number=0;
  
  constructor(list:number[],steps:IStep[]){
    this.sourctList = [...list];
    this.max = Math.max(...list);
    this.min = Math.min(...list);
    this.dur = this.max - this.min;
    this.steps = steps;

    resetContainer();
    this.list = this.createShowList();

    this.swap = this.swap.bind(this);
    this.move = this.move.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.backStep = this.backStep.bind(this);
  }

  get canPrev(){
    return this.steps.length > 0 && this.currentStepIndex >= 0;
  }
  get canNext(){
    return this.steps.length > 0 && this.currentStepIndex < this.steps.length-1;
  }
  get currentStep(){
    if(this.currentStepIndex <= -1 || this.steps.length <= 0) return null;
    return this.steps[this.currentStepIndex];
  }
  get isShowIndex(){
    return this.barWidth >= 16;
  }
  private setPerUnit(){    
    this.heightPerValue = ( 0.6 * Container.height ) / this.max;
    this.leftPerIndex =  ( 0.7 * Container.width ) / this.sourctList.length;
    this.barWidth = 0.7 * this.leftPerIndex;
    this.offsetLeft = 0.06 * Container.width;
    if(this.barWidth < 10) this.barWidth = this.leftPerIndex;
    this.space = this.leftPerIndex - this.barWidth;
  }
  private createShowList():SortShowItem[]{
    if(!this.sourctList){
      return [];
    }
    this.setPerUnit();
    let index = 0;
    return this.sourctList.map((value)=>{
      index++;
      return {
        id:index,
        value,
        left: index * this.leftPerIndex + this.offsetLeft,
        leftChange:0,
        height: value * this.heightPerValue + 30,
      }
    });
  }
  updateListItem(){
    this.setPerUnit();
    const list = this.list;
    for(let i = 0;i<list.length;i++){
      let item = list[i];
      let newLeft = (i+1) * this.leftPerIndex + this.offsetLeft;
      item.leftChange = newLeft - item.left;
      item.left = newLeft;
      item.height = list[i].value * this.heightPerValue + 30;
    }
  }
  swap(from:number,to:number){
    swap(this.list,from,to);
  }
  backStep(){
    if(!this.canPrev) return;
    const step = this.currentStep;
    this.currentStepIndex--;
    if(step){
      switch(step.type){
        case "swap":
          swap(this.list,step.to,step.from);
          break;
        case "move":
          move(this.list,step.to,step.from);
          break;
      }
      this.updateListItem();
    }

  }
  nextStep(){
    if(!this.canNext) return;
    this.currentStepIndex++;
    const step = this.currentStep;
    if(step){
      switch(step.type){
        case "swap":
          swap(this.list,step.from,step.to);
          break;
        case "move":
          move(this.list,step.from,step.to);
          break;
      }
      this.updateListItem();
    }
  }
  move<T>(list:T[],from:number,to:number){
    move(list,from,to);
  }
  genRandom(min:number,max:number){
    return genRandom(min,max);
  }
}
