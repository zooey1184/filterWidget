import { writable } from "svelte/store";

/**
 * 
 * interface IInfo {
    value: string,
    key: string,
  }

 * interface IItem {
    title,
    key,
    inputVal
    data
  }
 */

// 筛选条件集合
export const condition = writable([]);

export const visible = writable(false)
export const visibleKey = writable('')

export const clickClassName = writable("");
