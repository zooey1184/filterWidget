<script>
  import { createEventDispatcher } from "svelte";
  import { changeListToMap, changeKeys2List, VALUE, KEY } from "../../utils";
  import SearchIcon from "../Icon/Searh.svelte";

  const dispatch = createEventDispatcher();


  export let checkData = [];
  export let quickAction = {};
  export let defaultValue = []
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
</script>

{#if checkData?.length}
  <div>
    <div class="my-8 flex flex-align-center flex-justify-spaceBetween">
      <div>
        {#if quickAction.all}
          <div class="btn btnGoast" on:click={handlePickAll}>{quickAction.all}</div>
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
        placeholder={quickAction.search}
      />
    </div>
    {/if}

    <div class="checkWrap mb-8">
      {#each filterCheckData as item, index (item[VALUE])}
        <div class="checkItem flex flex-align-center">
          <input
            type="checkbox"
            class="checkbox"
            value={item[VALUE]}
            bind:group={checkGroup}
          />
          <label for={item[VALUE]}>{@html highlightWord(item[KEY])}</label>
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
</style>
