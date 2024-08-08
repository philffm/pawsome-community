<!-- TableOfContents.svelte -->

<script>

</script>

<!-- list all headlines from the page -->
<div class="toc">
  {#each $$props.headlines as headline}
    <a
      href={`#${headline.id}`}
      class:active={headline.active}
      on:click={() => {
        headline.active = true;
        setTimeout(() => {
          headline.active = false;
        }, 1000);
      }}
    >
      {headline.text}
    </a>
  {/each}

<style>
  .toc {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding: 1rem;
    background-color: #f0f0f0;
    border-left: 1px solid #ccc;
  }

  .toc a {
    display: block;
    margin-bottom: 0.5rem;
  }

    .toc a.active {
        font-weight: bold;
    }

    .toc a:hover {
        color: #0073aa;
    }
</style>
