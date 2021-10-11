<!-- 选中展示板 -->
<script>
  import TagsWrap from "../TagWrap/index.svelte";
  import { createEventDispatcher } from "svelte";
  import CloseIcon from "../Icon/Close.svelte";
  import { condition, visible, visibleKey } from "../../stores";

  const dispatch = createEventDispatcher()
  export let index = 0;
  export let data = {};

  $: title = (() => {
    const params = data.data;
    let _t = [];
    const radioList = params.filter(item => item.type === 'radio')
    radioList.forEach(item => {
      const val = item.value
      if (val?.toString()) {
        const optionsItem = item.data.find(ii => ii.value === val)
        _t.push(optionsItem.key)
      }
    });
    const _desc = _t.length ? `(${_t.join("-")})` : "";
    return data.key + _desc;
  })();

  $: desc = (() => {
    const params = data.data;
    let _t = [];
    const list = params.filter(item => ['select', 'input'].includes(item.type))
    list.forEach(item => {
      const val = item.value
      if (val?.toString()) {
        if (item.type === 'input') {
          _t.push(item.value)
        } else if (item.type === 'select') {
          const optionsItem = item.data.find(ii => ii.value === val)
          _t.push(optionsItem.key)
        }
      }
    })
    return _t.join("、");
  })();

  $: tags = (() => {
    const params = data.data;
    const list = params.filter(item => ['check'].includes(item.type))
    let _t = [];
    list.forEach((item) => {
      const val = item.value
      if (val?.length) {
        item.data.forEach(ii => {
          if (val.includes(ii.value)) {
            _t.push(ii)
          }
        })
      }
    })
    return _t;
  })();

  const handleClear = () => {
    condition.update((e) => {
      e[index] = undefined;
      const ee = e.filter(item => !!item)
      return ee
    });
  };

  const handlePick = () => {
    visible.update(e => true)
    visibleKey.update(e => data.value)
    dispatch('select', data)
  }
</script>

<div class="selectPane pos-r flex flex-align-center flex-justify-spaceBetween" on:click|stopPropagation={handlePick}>
  <div class="flex flex-align-center">
    <div class="title flex-0 ">{title}：</div>
    {#if desc}
      <div class="line1" style="font-size: 13px;">
        {desc}
      </div>
    {/if}

    {#if tags?.length}
      <div class="flex-0">
        <TagsWrap {index} {tags} />
      </div>
    {/if}
  </div>
  <div class="flex-0">
    <div on:click|stopPropagation={handleClear} > 
      <CloseIcon />
    </div>
  </div>
</div>

<style lang="less" scoped>
  .selectPane {
    border-radius: 5px;
    min-height: 42px;
    background-color: #1890ff;
    margin-left: 8px;
    margin: 3px;
    color: #fff;
    padding: 0 4px;
    padding-left: 8px;
    .title {
      font-size: 14px;
    }
  }
  .line1 {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
