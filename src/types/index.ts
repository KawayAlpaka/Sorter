
export interface SortItem {
  id:number;
  value:number;
}

export interface SortShowItem extends SortItem {
  left:number,
  leftChange:number,
  height:number,
  // heightChange:number,
}
