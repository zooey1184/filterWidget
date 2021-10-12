<script>
  import { fly } from "svelte/transition";
  import Selector from "./components/Selector/index.svelte";
  import SelectPane from "./components/SelectPane/index.svelte";
  import FilterIcon from "./components/Icon/Filter.svelte";
  import { condition, visible, visibleKey } from "./stores";
  import { onMount } from "svelte";

  // props
  export let selectOptions = []
  export let showMask = true
  export let onSelect = (e)=>{}
  export let onConfirm = (e)=> {}

  // 暴露外部的方法
  export function setVisible(_visible) {
    visible.update(e => _visible)
  }
  export function setVisibleKey(_key) {
    visibleKey.update(e => _key)
  }
  export function getData() {
    const _data = getCondition($condition);
    return {
      data: _data,
      origin: $condition
    }
  }
  export function reset() {
    condition.update(e => [])
  }
  export function init() {
    condition.update(e => {
      const l = initCondition()
      l.forEach((item, index) => {
        e[index] = item
      });
      return e
    })
  }
  
  

  
  const initCondition = () => {
    const list = []
    selectOptions.forEach(item => {
      if (item?.data?.length) {
        const idata = item.data
        const obj = {
          key: item.key,
          value: item.value,
        }
        const inputVal = {}
        const data = []
        idata.forEach(ii => {
          if (ii.value) {
            const _obj = {
              key: ii.key,
              type: ii.type,
              value: ii.value,
              data: ii.data
            }
            if (ii.type === 'input') {
              _obj.item = null
            } else {
              _obj.item = ii.type === 'check' ? ii.data.filter(ik => ii.value.includes(ik.value)) : ii.data.find(ik => ii.defaultValue.includes(ik.value))
              
            }
            data.push(_obj)
          }  
        });
        (data.length || Object.keys(inputVal).length) && list.push({
          ...obj,
          inputVal,
          data
        })
      }
    });
    return list
  }

  onMount(async () => {
    init()
  })

  const handleShowPanel = (e) => {
    if (selectOptions.length) {
      visible.update(e => !e)
      visibleKey.update(e => '')
    }
  };

  const getCondition = (d) => {
    const _data = d;
    const _obj = {};
    _data.forEach((item) => {
      Object.assign(_obj);
      if (item.data?.length) {
        item.data.forEach((ii) => {
          _obj[ii.key] = ii.value;
        });
      } else if (Object.keys(item.data)) {
        for (let ii in item.data) {
          _obj[item.data[ii].key] = item.data[ii].value;
        }
      }
    });
    return _obj;
  };

  
</script>

<main class="filter__main-wrap">
  <div
    class="flex flex-align-center flex-justify-spaceBetween filterWrap"
    style="background-color: rgba(232, 240, 254, 0.4); padding: 0 4px"
  >
    <div class="flex flex-align-center ">
      {#if selectOptions.length}
        <div class="pos-r filterIcon">
          <div
            class="filterIcon"
            style="margin-right: 16px"
            on:click={handleShowPanel}
          >
            <FilterIcon size={28} />
          </div>
          {#if $visible}
            <div class="filterIcon" transition:fly={{ duration: 400, y: -20 }}>
              <Selector {selectOptions} on:confirm={(e) =>  onConfirm(e.detail)}/>
            </div>
            {#if showMask}
            <div class="mask" on:click={() => visible.update((e) => false)} />
            {/if}
          {/if}
        </div>
      {/if}
      <div class="flex flex-align-center flex-1 flex-wrap" style="z-index: 1;">
        {#each $condition as item, index (index)}
          <div>
            {#if item?.key}
              <SelectPane {index} data={item} on:select={(e) => onSelect(e.detail)} />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style lang="less" scoped>
  .filterWrap {
    position: relative;
    transition: all 150ms linear;
    box-sizing: border-box;
    min-height: 52px;
    z-index: 9;
    &:hover {
      background: rgba(232, 240, 254, 0.7) !important;
    }
  }
  .filterIcon {
    position: relative;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
</style>
