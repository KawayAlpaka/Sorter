import { quickSort, quickSortWithoutRecursion } from "../sorts/quick-sort";
import { selectionSort } from "../sorts/selection-sort";
import { createNormalList,sortTest} from "../utils/test";

const list = createNormalList(10000,0,10000);
// const list = [4, 8, 4, 3, 6, 6, 9, 4, 0, 8];
console.log("选择排序：");
sortTest("",selectionSort,[...list]);
console.log("递归快速排序：");
sortTest("",quickSort,[...list]);
// console.log("循环快速排序：");
// sortTest(quickSortWithoutRecursion,[...list]);

