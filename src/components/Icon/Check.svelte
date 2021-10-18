<script>
  import { createEventDispatcher } from "svelte";
  export let color = "#1296db";
  export let size = 20;
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("click");
  };
</script>

<div on:click={handleClick}>
  <svg
    t="1634538851516"
    class="icon"
    viewBox="0 0 1293 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2678"
    width={size}
    height={size}
    ><path
      d="M1148.718208 31.091585a80.827344 80.827344 0 0 1 132.179649 92.682021l-4.795756 6.789496-673.022348 862.158333a80.827344 80.827344 0 0 1-118.223461 9.968705l-5.819569-5.927338L20.47626 482.970321a80.827344 80.827344 0 0 1 114.828713-113.481591l5.819569 5.927339 394.006358 441.532836L1148.718208 31.091585z"
      p-id="2679"
      fill={color}
    /></svg
  >
</div>
