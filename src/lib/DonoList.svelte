<script lang="ts">
  import { Octokit } from 'octokit';
  import type { Donation } from "./common";
  import DonoLine from "./DonoLine.svelte";

  let octokit: Octokit;
  let token: string = (() => {
    const token = localStorage.getItem('fehwgc-admin') || '';
    if (token) {
      octokit = new Octokit({
        auth: token,
      });
    }
    return token;
  })();

  function updateOctokit() {
    localStorage.setItem('fehwgc-admin', token)
    octokit = new Octokit({
      auth: token,
    });
  }

  export let donations: Donation[];

  let dirty = false;

  function handleDelete(i: number) {
    donations.splice(i, 1);
    donations = donations;
    dirty = true;
  }

  function addDonation() {
    dirty = true;
    donations.push({
      target: 'edelgard',
      targetOutfit: 'undeclared',
      amount: 0,
    });
    donations = donations;
  }

  const gistId = '8c4b31c95b425cb40d3f865d95561bfa';

  const updateGist = async () => {
    await octokit.request(`PATCH /gists/${gistId}`, {
      gist_id: gistId,
      files: {
        'donos.csv': {
          content: donations.map(donation => `${donation.target},${donation.targetOutfit},${donation.amount}`).join('\n'),
        },
      },
    });
    dirty = false;
  }
</script>

{#each donations as donation, i}
  <DonoLine donation={donation} on:delete={() => handleDelete(i)} on:change={() => {dirty = true}}/>
{/each}
<button on:click={addDonation}>
  Add a donation
</button>
<button on:click={updateGist} disabled={!dirty}>
  {dirty ? 'Save' : 'No changes to save'}
</button>

<form>
  <label>
    Token
    <input type=password bind:value={token} on:change={() => updateOctokit()}/>
  </label>
</form>

<style>

</style>
