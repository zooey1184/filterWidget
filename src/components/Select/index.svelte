<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import CloseIcon from "../Icon/Close.svelte";
  import ArrowIcon from "../Icon/ArrowDown.svelte";
  import { KEY, VALUE } from "../../utils";

  const dispatch = createEventDispatcher();
  export let options = [];
  export let allowClear = false;
  export let placeholder=''
  export let defaultValue = ''

  let visible = false;
  // let selectItem = {};
  let value = defaultValue || ''
  $: selectItem = options.find(item => item.value === value) || {}
  

  const handlePick = (item, index) => {
    // selectItem = item;
    value = item.value
    dispatch("change", {
      key: item.value,
      item: item,
      index,
    });
  };

  const handleFocus = () => {
    visible = true;
  };

  const handleClose = () => {
    // selectItem = {};
    value = ''
    dispatch("change", undefined, undefined, undefined);
  };
</script>

<div class="pos-r">
  <div class="pos-r">
    <input
      type="text"
      value={selectItem?.[KEY] || ""}
      placeholder={placeholder}
      on:click={handleFocus}
      readonly
      class="selectWrap"
      on:blur={() => {
        setTimeout(() => {
          visible = false;
        }, 100);
      }}
    />
    <div class="pos-a trans-y-c" style="right: 10px">
      {#if !selectItem?.[KEY] || !allowClear}
        <ArrowIcon style="padding-top: 3px" size={18} />
      {/if}
      {#if selectItem?.[KEY] && allowClear}
        <CloseIcon on:click={handleClose} color="#999" />
      {/if}
    </div>
  </div>
  {#if visible}
    <div transition:slide={{ duration: 400 }} class="pos-a selectContent">
      {#each options as item, index}
        <div class="optionsItem" on:click={() => handlePick(item, index)}>
          {item[KEY]}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="less">
  .selectWrap {
    width: 100%;
    box-sizing: border-box;
    height: 35px;
    padding-left: 8px;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    border: 1px solid #eee;
    &:focus {
      border: 1px solid rgb(97, 170, 253);
    }
  }
  .selectContent {
    width: 100%;
    left: 0;
    background-color: #fff;
    z-index: 2;
    max-height: 300px;
    overflow: auto;
    border: 1px solid #eee;
  }
  .optionsItem {
    line-height: 24px;
    font-size: 13px;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(216, 252, 253, 0.24);
    }
  }
</style>
