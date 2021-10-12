<!-- 内容组件 -->
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let title = "";
  export let confirmTxt = "确定";
  export let cancelTxt = "cancel";

  const handleConfirm = () => {
    dispatch("confirm");
  };

  const handleCancel = () => {
    console.log('this is click div cancel');
    dispatch("cancel");
  };
</script>

<div class="contentWrap pos-r">
  {#if title}
    <div class="contetnTitle">{title}</div>
  {/if}
  <div>
    <slot />
  </div>

  <div class="btnWrap mt-16">
    <div class="float-r">
      <div class="btn round-2 btn-default" on:click={handleCancel}>
        {cancelTxt}
      </div>
      <div
        class="btn bg-blue border-color-blue color-white round-2"
        on:click={handleConfirm}
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
