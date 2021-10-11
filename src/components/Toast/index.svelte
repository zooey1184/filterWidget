<script>
  import { fly } from "svelte/transition";
  import Info from '../icon/Info.svelte'
  import Error from '../icon/Error.svelte'
  import Warning from '../icon/Warning.svelte'
  import Success from '../icon/Success.svelte'

  let title = "";
  let type = ''
  let duration = 3000

  export let visible = false;

  const openToast = (options) => {
    if (typeof options === 'object') {
      type = options.type ? options.type : ''
      duration = options.duration ? options.duration : 3000
      title = options.title ? options.title : ''
    } else {
      title = options
    }
    visible = true;
    if (window?.iGGsvelteTimer) {
      clearTimeout(window?.iGGsvelteTimer);
      window.iGGsvelteTimer = setTimeout(() => {
        visible = false;
      }, duration/2);
    } else {
      window.iGGsvelteTimer = setTimeout(() => {
        visible = false;
      }, duration);
    }
  }
  export function show(options) {
    openToast(options)
  }
  export function info(_title) {
    openToast({title: _title, type: 'info'})
  }
  export function success(_title) {
    openToast({title: _title, type: 'success'})
  }
  export function error(_title) {
    openToast({title: _title, type: 'error'})
  }
  export function warning(_title) {
    openToast({title: _title, type: 'warning'})
  }
  export function hide() {
    visible = false;
  }
</script>

{#if visible}
  <div transition:fly={{ duration: 400, y: -20 }} class="toastWrap flex flex-align-center">
    {#if type === 'success'}
    <span style='margin-right: 5px; margin-top: 4px'><Success /></span>
    {/if}
    {#if type === 'info'}
    <span style='margin-right: 5px; margin-top: 4px'><Info /></span>
    {/if}
    {#if type === 'error'}
    <span style='margin-right: 5px; margin-top: 4px'><Error /></span>
    {/if}
    {#if type === 'warning'}
    <span style='margin-right: 5px; margin-top: 4px'><Warning /></span>
    {/if}
    {title}
  </div>
{/if}

<style lang="less" scoped>
  .toastWrap {
    position: fixed;
    z-index: 999;
    top: 20px;
    font-size: 13px;
    border-radius: 5px;
    left: 50%;
    padding: 12px 16px;
    transform: translateX(-50%);
    color: #333;
    background-color: #fff;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 20px 8px #0000000d;
  }
</style>
