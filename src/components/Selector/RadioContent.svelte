<script>
  import { createEventDispatcher } from "svelte";
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
</script>

{#if radioData?.length}
  <div class="my-8">
    {#each radioData as item (item[VALUE])}
      <span>
        <input type="radio" bind:group={radioGroup} value={item[VALUE]} />
        <label style="margin-right:16px" for={item[VALUE]}>{item[KEY]}</label>
      </span>
    {/each}
  </div>
{/if}
