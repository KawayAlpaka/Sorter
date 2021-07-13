import * as monaco from 'monaco-editor';

monaco.languages.typescript.javascriptDefaults.addExtraLib(`
declare class SortList {
    list: number[];
    /**
   * 数组长度
   **/
    get length(): number;
    /**
     * 交换两个索引值的位置
     **/
    swap(from: number, to: number): void;
    /**
   * 移动索引from值到to的位置
   **/
    move(from: number, to: number): void;
    /**
     * 获取列表中对应索引的参数值
     **/
    get(index: number): number;
    /**
    * 判断列表中索引1的值是否大于索引2的值
    **/
    gt(index1: number, index2: number): boolean;
    /**
     * 判断列表中索引1的值是否大于等于索引2的值
     **/
    gte(index1: number, index2: number): boolean;
    /**
   * 判断列表中索引1的值是否小于索引2的值
   **/
    lt(index1: number, index2: number): boolean;
    /**
   * 判断列表中索引1的值是否小于等于索引2的值
   **/
    lte(index1: number, index2: number): boolean;
    /**
    * 判断列表中索引1的值是否等于索引2的值
    **/
    eq(index1: number, index2: number): boolean;
    /**
     * 判断列表中索引1的值是否不等于索引2的值
     **/
    neq(index1: number, index2: number): boolean;
    /**
    * 返回一个[min,max]区间的整数
    **/
    random(min: number, max: number): number;
    /**
   * 在指定位置设置标记线，不传参数则清空，用于展示过程
   **/
    lines(lines?: number[]): void;
    /**
     * 设置标记指针,不传参数则清空，用于展示过程
     **/
    points(points?: {
        name: string;
        index: number;
    }[]): void;
    /**
     * 设置描述文字,不传参数则清空
     **/
    explanation(explanation?: string): void;
}

`)
