<!-- 内容组件 -->
<script>
  import { createEventDispatcher } from "svelte";
  import { blurSelector, blurPane } from "../../stores";
  const dispatch = createEventDispatcher();
  export let title = "";
  export let confirmTxt = "确定";
  export let cancelTxt = "取消";

  const handleConfirm = () => {
    blurSelector.update((e) => true);
    dispatch("confirm");
  };

  const handleCancel = () => {
    blurSelector.update((e) => true);
    dispatch("cancel");
  };
  const handleFocus = () => {
    blurSelector.update((e) => true);
  };
</script>

<div
  class="contentWrap pos-r"
  on:click={handleFocus}
>
  {#if title}
    <div class="contetnTitle">{title}</div>
  {/if}
  <div>
    <form>
      <slot />
    </form>
  </div>

  <div class="btnWrap mt-16">
    <!-- svelte-ignore a11y-positive-tabindex -->
    <div class="flex flex-align-center flex-justify-end">
      <div
        class="btn round-2 btn-default"
        tabindex="4"
        style="margin-right: 6px;"
        on:click={handleCancel}
      >
        {cancelTxt}
      </div>
      <div
        class="btn bg-blue border-color-blue color-white round-2"
        on:click={handleConfirm}
        tabindex="5"
      >
        {confirmTxt}
      </div>
    </div>
  </div>
</div>

<style lang="less">
  .contentWrap {
    width: 280px;
    font-size: 14px;
    box-sizing: border-box;
    color: #999;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(200, 200, 200, 0.3);
    padding: 12px;
    background-color: #fff;
    z-index: 9;
    border-radius: 4px;
    box-sizing: border-box;
    .contetnTitle {
      font-size: 16px;
      font-weight: 600;

      color: #333;
      margin-bottom: 8px;
    }
  }
  .btnWrap {
    overflow: hidden;
  }
</style>
