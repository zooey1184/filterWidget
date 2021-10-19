<script>
  import { createEventDispatcher } from "svelte";
import { blurSelector } from "../../stores";
  import { changeListToMap, KEY, VALUE } from "../../utils";
  const dispatch = createEventDispatcher();

  export let radioData = [];
  export let defaultValue = ''
  let radioGroup = defaultValue;
  const _rMap = changeListToMap(radioData || []);

  $: {
    dispatch("change", {
      value: radioGroup,
      type: "radio",
      data: _rMap[radioGroup],
    });
  }
  
  const handleFocus = () => {
    console.log('change');
    setTimeout(() => {
      blurSelector.update(e => true)
    }, 10);
  }
</script>

{#if radioData?.length}
  <div class="my-8">
    {#each radioData as item (item[VALUE])}
      <span>
        <input type="radio" on:change={handleFocus} bind:group={radioGroup} value={item[VALUE]} />
        <label style="margin-right:16px" for={item[VALUE]}>{item[KEY]}</label>
      </span>
    {/each}
  </div>
{/if}
