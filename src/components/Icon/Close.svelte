<script>
  import { createEventDispatcher } from "svelte";
  export let color = "#f1f1f1";
  export let size = 20;
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("click");
  };
</script>

<div on:click={handleClick}>
  <svg
    t="1630474961175"
    class="icon closeIcon"
    style="padding-top: 5px; margin-left: 4px"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="8715"
    width={size}
    height={size}
    ><path
      d="M512 992A480.512 480.512 0 0 1 32 512 480.512 480.512 0 0 1 512 32a480.512 480.512 0 0 1 480 480 480.512 480.512 0 0 1-480 480z m0-434.624l135.68 135.68a32 32 0 0 0 22.72 9.344 32 32 0 0 0 22.528-9.344 32 32 0 0 0 9.344-22.592 32 32 0 0 0-9.344-22.656L557.184 511.936l135.744-135.68a32 32 0 0 0 9.472-22.784 31.488 31.488 0 0 0-9.472-22.464 31.552 31.552 0 0 0-22.656-9.472 31.552 31.552 0 0 0-22.656 9.472L511.936 466.88 376.064 331.008a31.552 31.552 0 0 0-22.656-9.472 31.488 31.488 0 0 0-22.592 9.472 32 32 0 0 0 0 45.248l135.872 135.68-135.872 135.872a31.168 31.168 0 0 0-9.344 22.464 31.616 31.616 0 0 0 9.344 22.72 32 32 0 0 0 22.656 9.344A32 32 0 0 0 376 692.992l135.872-135.68z"
      p-id="8716"
      fill={color}
    /></svg
  >
</div>

<style lang="less">
  .closeIcon {
    opacity: 0.7;
    transition: all 150ms linear;
    &:hover {
      opacity: 1;
    }
  }
</style>
