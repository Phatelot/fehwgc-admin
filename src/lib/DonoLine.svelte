<script lang="ts">
    import type { Donation } from "./common";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function dispatchDelete() {
      dispatch('delete');
    }

    function dispatchChange() {
      dispatch('change');
    }

    const games = {
      radiant_dawn: {
        color: "blue"
      },
      three_houses: {
        color: "red"
      },
    }

  const characters : Record<string, any>= {
    'Edelgard': {
      game: games.three_houses,
      outfits: ['timeskip', 'empress','christmas','summer', 'corrupted'],
    },
    'Dorothea': {
      game: games.three_houses,
      outfits: ['twilight_harmony','yuletide_dancer','solar_songstress'],
    },
    'Altina': {
      game: games.radiant_dawn,
      outfits: ['christmas','unrivaled_dawn','summer'],
    },
    'Titania': {
      game: games.radiant_dawn,
      outfits: ['summer'],
    },
  }

  const possibleTargets = Object.keys(characters).sort();

  export let donation: Donation;
</script>

<form>
    <select bind:value={donation.target} class={characters[donation.target].game.color} on:change={dispatchChange}>
      {#each possibleTargets as possibleTarget}
        <option class={characters[possibleTarget].game.color} value={possibleTarget}>
         {possibleTarget}
        </option>
      {/each}
    </select>
    <select bind:value={donation.targetOutfit} on:change={dispatchChange}>
      <option value="base">base</option>
      {#each characters[donation.target].outfits as possibleOutfit}
        <option value={possibleOutfit}>
         {possibleOutfit}
        </option>
      {/each}
      <option value="broken">broken</option>
    </select>
    <input type="number" bind:value={donation.amount} min="0" on:change={dispatchChange} />
    <input type="button" value="X" class="delete" on:click={dispatchDelete}/>
</form>

<style>
  .blue {
    color: blue;
    font-weight: 900;
  }

  .red {
    color: darkred;
    font-weight: 900;
  }

  form {
    display: flex;
  }

  @media (width <= 768px) {
    form {
      flex-direction: column;
    }
  }

  .delete {
    background-color:darkred;
    max-width: 100px;
  }

</style>
