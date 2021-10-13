<!-- 联级选择器 -->
<script>
    import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import ArrowIcon from "../Icon/ArrowRight.svelte";
  import CommonSelector from "./CommonSelector.svelte";
  import { KEY, VALUE } from "../../utils";
  import {visible, visibleKey} from '../../stores'

  export let selectOptions = [];
  export function updateValue(cb) {
    selector && selector.updateValue(cb)
  }
  let selector;
  
  const dispatch = createEventDispatcher();
  $: {
    act = $visibleKey
  }
  // 选中index
  let act = undefined
  // 选中某一项
  const handlePick = (key) => {
    act = key;
    visibleKey.update(e => key)
  };
  // 取消
  const handleCancel = () => {
    visibleKey.update(e => '')
  };
  // 确定
  const handleConfirm = (e) => {
    const {validate} = e.detail
    if (validate) {
    
      visibleKey.update(e => '')
    }
    dispatch('confirm', e.detail)
  }

  const handleChangeForm = (e) => {
    dispatch('change', e.detail)
  }

  const setVisible = () => {
    visible.update(e => true)
  }
</script>

<div class="cascaderWrap round-2 bg-white" on:mousedown={setVisible}>
  <ul>
    {#each selectOptions as item, index (item[KEY])}
      <li
        class={`cascaderItem pos-r hoverActive flex flex-align-center flex-justify-spaceBetween ${
          act === item.value ? "activeBg" : ""
        }`}
        on:click|self={() => handlePick(item.value)}
      >
        <span on:click|self={() => handlePick(item.value)}>{item[KEY]}</span>
        <ArrowIcon size={12} />
        {#if $visibleKey === item.value}
          <div
            transition:fly={{ duration: 200, x: 20 }}
            class="pos-a"
            style="left: 265px; top: 0"
          >
            <CommonSelector
              key={item[KEY]}
              value={item[VALUE]}
              bind:this={selector}
              data={item.data}
              on:cancel={handleCancel}
              on:confirm={handleConfirm}
              on:change={handleChangeForm}
            />
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="less" scoped>
  @color-blue: #1890ff;
  .cascaderWrap {
    position: absolute;
    width: 260px;
    border: 1px solid #efefef;
    margin-top: 10px;
    z-index: 2;
    padding: 0;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  .cascaderItem {
    height: 42px;
    padding: 0 8px;
    cursor: pointer;
    &:hover {
      background-color: rgba(161, 161, 161, 0.1);
    }

    border-bottom: 1px solid rgba(239, 239, 239, 0.658);
    &:last-child {
      border-bottom: none;
    }
  }
  .activeBg {
    color: #1890ff
  }
</style>
