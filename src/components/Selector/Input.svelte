<script>
  import { createEventDispatcher } from "svelte";
  export let defaultValue = ''
  export let value = ''
  export let placeholder = ''

  const dispatch = createEventDispatcher()
  
  let _value;
  $: {
    _value = value || defaultValue
  }
</script>

<div>
  <input
    class="modal__input-common mt-16"
    placeholder={placeholder || ''}
    style="width: 100%;"
    bind:value={_value}
    on:input={e => {
      dispatch('input', {
        value: e.target.value
      })
    }}
  />
</div>

<style lang="less" scoped>
  .modal__input-common {
    padding: 8px 12px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    outline: none;
    &:focus {
      outline: rgba(28, 181, 228, 0.5) solid 1px;
    }
  }
</style>