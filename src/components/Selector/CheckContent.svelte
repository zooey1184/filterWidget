<script>
  import { createEventDispatcher } from "svelte";
  import { changeListToMap, changeKeys2List, VALUE, KEY } from "../../utils";
  import SearchIcon from "../Icon/Searh.svelte";
  import CheckIcon from "../Icon/Check.svelte";
import { blurSelector } from "../../stores";

  const dispatch = createEventDispatcher();

  export let checkData = [];
  export let quickAction = {};
  export let defaultValue = [];
  let searchWord = "";
  let checkGroup = defaultValue;

  $: filterCheckData = (() => {
    const reg = new RegExp(searchWord, "ig");
    return checkData?.length
      ? checkData.filter((item) => item[VALUE].match(reg))
      : [];
  })();

  $: highlightWord = (word) => {
    if (!searchWord) {
      return word;
    }
    const reg = new RegExp(`(${searchWord})`, "ig");
    return word.replace(reg, "<span class='highlight'>$1</span>");
  };

  const _ckMap = changeListToMap(checkData);
  $: {
    const _list = changeKeys2List(_ckMap, checkGroup);
    dispatch("change", {
      value: checkGroup,
      type: "check",
      data: _list,
    });
  }
  // 全选
  const handlePickAll = () => {
    const data = filterCheckData;
    const _pick = [];
    data.forEach((item) => _pick.push(item[VALUE]));
    checkGroup = _pick;
  };
  // 反选
  const handlePickAllReverse = () => {
    const data = filterCheckData;
    const _pick = [];
    data.filter((item) => {
      if (!checkGroup.includes(item[VALUE])) {
        _pick.push(item[VALUE]);
      }
    });
    checkGroup = _pick;
  };
  // 清空
  const handlePickClear = () => {
    checkGroup = [];
  };
  // 点击多选框
  const handleClickCk = (e) => {
    if (checkGroup.includes(e.value)) {
      checkGroup = checkGroup.filter((item) => item !== e.value);
    } else {
      checkGroup.push(e.value);
    }
    console.log(checkGroup);
  };

  const handleFocus = () => {
    blurSelector.update(e => true)
  }
</script>

{#if checkData?.length}
  <div>
    <div class="my-8 flex flex-align-center flex-justify-spaceBetween">
      <div class="flex flex-align-center">
        {#if quickAction.all}
          <div
            class="btn btnGoast"
            style="margin-right: 4px;"
            on:click={handlePickAll}
          >
            {quickAction.all}
          </div>
        {/if}

        {#if quickAction.reverse}
          <div class="btn btnGoast" on:click={handlePickAllReverse}>
            {quickAction.reverse}
          </div>
        {/if}
      </div>
      {#if quickAction.clear}
        <div class="btn btnGoast" on:click={handlePickClear}>
          {quickAction.clear}
        </div>
      {/if}
    </div>
    {#if quickAction.search}
      <div class="search pos-r flex mb-8">
        <div class="pos-a trans-y-c" style="left: 8px; top: 55%">
          <SearchIcon />
        </div>
        <input
          class="searchInp flex-1"
          bind:value={searchWord}
          on:click={handleFocus}
          placeholder={quickAction.search}
        />
      </div>
    {/if}

    <div class="checkWrap mb-8">
      {#each filterCheckData as item, index (item[VALUE])}
        <div class={['checkItem flex flex-align-center', checkGroup.includes(item[VALUE]) ? 'checkItemAct' : ''].join(' ')}>
          <input
            type="checkbox"
            class="checkbox"
            value={item[VALUE]}
            bind:group={checkGroup}
          />
          <div
            class="labelItem flex-1"
            for={item[VALUE]}
            on:click={handleClickCk(item)}
          >
            {@html highlightWord(item[KEY])}
          </div>
          <div>
            {#if checkGroup.includes(item[VALUE])}
              <CheckIcon size="12" />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="less" scoped>
  @color-blue: #1890ff;
  .search {
    box-sizing: border-box;
  }
  .searchInp {
    height: 30px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
    padding-left: 28px;
    display: block;
    border: 1px solid #eee;
    transition: all 150ms linear;
    &:focus {
      border: 1px solid rgba(24, 143, 255, 0.4);
    }
  }
  .checkWrap {
    min-height: 50px;
    max-height: 120px;
    overflow: auto;
  }
  .checkItem {
    height: 32px;
    font-size: 14px;
    position: relative;
    padding: 0 4px;
    transition: all 150ms linear;
    &:hover {
      background-color: rgba(24, 143, 255, 0.1);
    }
  }
  .btnGoast {
    border: none;
    font-size: 13px;
    padding: 6px 8px;
    background-color: #efefef;
    color: #666;
    border-radius: 4px;
    &:hover {
      color: @color-blue;
    }
  }
  .checkbox {
    position: absolute;
    width: 90%;
    left: 0;
    height: 100%;
    opacity: 0;
  }
  .checkItemAct {
    background-color: rgba(238, 238, 238, 0.4);
  }
</style>
