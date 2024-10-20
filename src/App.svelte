<script lang="ts">
    import DonoList from './lib/DonoList.svelte';
    import type { Donation } from './lib/common';

  async function fetchData(): Promise<Donation[]> {
    const response = await fetch("https://api.github.com/gists/8c4b31c95b425cb40d3f865d95561bfa", {
      headers: {
        "Accept": "application/vnd.github+json",
      },
    });
    return JSON.parse(await response.text())
      .files['donos.csv']
      .content
      .split('\n')
      .map((line: string) => line.split(','))
      .map((split: string[]) => ({target: split[0],targetOutfit: split[1], amount: parseInt(split[2])}));
  }
</script>

<main class="container">
  <h1>Weight gain chart admin</h1>

  {#await fetchData()}
    Loading data...
  {:then donations}
    <DonoList donations={donations}/>
  {:catch error}
    Error: {error}
  {/await}
</main>

<style>

  main {
    margin-top: 40px;
  }

</style>
