<script lang="ts">
    import { baseMetadata } from "./character_metadata";
    import type { Donation } from "./common";
    import { createEventDispatcher } from 'svelte';
    import type { CharacterBaseMetadata } from "./model";

    function findChar(charNameSlug: string): CharacterBaseMetadata | null {
      return baseMetadata
        .flatMap(game => game.characters)
        .filter(c => c.nameSlug === charNameSlug)
        .at(0) || null;
    }

    function hasOutfit(charNameSlug: string, outfitSlug: string): boolean {
      return (outfitSlug === 'broken') || (findChar(charNameSlug)?.outfits || []).map(outfit => outfit.outfitSlug).includes(outfitSlug)
    }

    const dispatch = createEventDispatcher();

    function dispatchDelete() {
      dispatch('delete');
    }

    function dispatchChange() {
      if (!hasOutfit(donation.target, donation.targetOutfit)) {
        donation.targetOutfit = 'undeclared'
      }

      dispatch('change');
    }


  type CharViewModel = {
    color: string;
    outfits: string[];
  };


  const tmp : any = baseMetadata
    .flatMap(game => game.characters
      .map(character => ([
        character.nameSlug,
        {
          color: game.darkColor,
          outfits: character.outfits.map(outfit => outfit.outfitSlug || 'base')
        }
      ]
    )
  ));

  const characters : Record<string, CharViewModel> = Object.fromEntries(tmp);

  const possibleTargets = Object.keys(characters).sort();

  export let donation: Donation;
</script>

<form>
    <select bind:value={donation.target} style="color: {characters[donation.target].color}; font-weight: 600;" on:change={dispatchChange}>
      {#each possibleTargets as possibleTarget}
        <option style="color: {characters[possibleTarget].color}; font-weight: 600;" value={possibleTarget}>
         {possibleTarget}
        </option>
      {/each}
    </select>
    <select bind:value={donation.targetOutfit} on:change={dispatchChange}>
      <option value="undeclared">undeclared</option>
      {#each characters[donation.target].outfits as possibleOutfit}
        <option value={possibleOutfit}>
         {possibleOutfit}
        </option>
      {/each}
      <option value="broken">broken</option>
    </select>
    <input type="number" bind:value={donation.amount} min="1" on:change={dispatchChange} />
    <input type="button" value="X" class="delete" on:click={dispatchDelete}/>
</form>

<style>
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
