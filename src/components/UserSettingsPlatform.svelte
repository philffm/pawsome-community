<script>
  import { createEventDispatcher } from 'svelte';

  export let user = {};
  export let locations = [];

  let isSitter = user.sitter;
  let location = user.expand?.location?.id || '';
  let preferredLocations = user.expand?.preferredLocations?.map(loc => loc.id) || [];
  let searchQuery = '';
  let searchResults = [];

  const dispatch = createEventDispatcher();

  function saveChanges() {
    const data = {
      sitter: isSitter,
      location,
      preferredLocations
    };
    dispatch('save', data);
  }

  function searchLocations() {
    searchResults = locations.filter(loc => {
      const query = searchQuery.toLowerCase().trim();
      const locationStr = `${loc.city} ${loc.country} ${loc.regions.join(' ')}`.toLowerCase();
      return locationStr.includes(query);
    });
  }

  function addPreferredLocation(locId) {
    if (!preferredLocations.includes(locId)) {
      preferredLocations = [...preferredLocations, locId];
    }
  }

  function removePreferredLocation(locId) {
    preferredLocations = preferredLocations.filter(id => id !== locId);
  }
</script>

<div class="card">
  <h2>Platform Settings</h2>

  <label>
    <input type="checkbox" bind:checked={isSitter} />
    Available as Sitter
  </label>

  <label for="location">Location:</label>
  <select id="location" bind:value={location} class="input-field">
    <option value="" disabled>Select your location</option>
    {#each locations as loc}
      <option value={loc.id}>{loc.city}, {loc.country}</option>
    {/each}
  </select>

  <label>Preferred Locations:</label>
  <div class="preferred-locations">
    {#each preferredLocations as locId}
      {#each locations as loc (loc.id)}
        {#if loc.id === locId}
          <span class="location-label">
            {loc.city}, {loc.country} ({#each loc.regions as region}{region}{/each})
            <button class="remove-button" on:click|preventDefault={() => removePreferredLocation(locId)}>×</button>
          </span>
        {/if}
      {/each}
    {/each}
  </div>

  <div class="search-box">
    <input
      type="text"
      placeholder="Search locations..."
      bind:value={searchQuery}
      on:input={searchLocations}
      class="input-field"
    />

    {#if searchResults.length > 0}
      <ul class="search-results">
        {#each searchResults as result}
          <li>
            {result.city}, {result.country} ({#each result.regions as region}{region}{/each})
            <button class="add-button" on:click|preventDefault={() => addPreferredLocation(result.id)}>Add</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <button class="button primary" on:click|preventDefault={saveChanges}>Save Changes</button>
</div>

<style>
  /* Styling for your component */



  .preferred-locations {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .location-label {
    background-color: #e0f7fa;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .remove-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #d32f2f;
    margin-left: 5px;
    font-size: 1.2em;
  }




  .search-box {
    margin-bottom: 20px;
  }

  .search-results {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
  }

  .search-results li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-results li:last-child {
    border-bottom: none;
  }

  .add-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease;
  }

  .add-button:hover {
    background-color: #45a049;
  }
</style>
