<!-- 标签容器 -->
<script>
  import MoreIcon from "../Icon/More.svelte";

  export let tags = [];
  export let index = 0;
  let visible = false;
  $: filterTags = tags.filter((item, index) => index < 2);
</script>

<div>
  <div class="tagWrap flex flex-align-center">
    {#each filterTags as item, index}
      <div class="tagOffset pos-r">
        <div class="tag">
          {item.key}
        </div>
      </div>
    {/each}
    {#if tags.length > 2}
      <div
        style="width: 35px; margin-left: 6px"
        class={`tag tagMore${index}`}
      >
        {#if !visible}
          +{tags.length}
        {:else}
          <div style="line-height: 35px;">
            <MoreIcon />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="less" scoped>
  .tagWrap {
    height: 36px;
    background-color: #fff;
    color: #333;
    margin: 0 4px;
    font-size: 13px;
    border-radius: 4px;
    max-width: 230px;
    padding: 0 4px;
  }
  .tag {
    color: #666;
    background-color: #eee;
    padding: 2px;
    height: 28px;
    text-align: center;
    line-height: 26px;
    width: 68px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  .tagOffset {
    margin-left: 6px;
    &:first-child {
      margin-left: 0;
    }
  }
  .tagsContent {
    background-color: #fff;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    left: 0;
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    overflow: auto;
    padding: 8px;
    margin-top: 8px;
    border-radius: 5px;
    font-size: 13px;
    z-index: 12;
  }
</style>
