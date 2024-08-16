<script>
  import { onMount } from 'svelte';
  import { pocketbase } from '$lib/stores/pocketbase';
  import { fetchData, fetchFullList } from '$lib/utils/fetchData';
  import { get } from 'svelte/store';

  import UserHeader from '../../components/UserHeader.svelte';


  let user = {};
  let isLoading = true;
  let errorMessage = '';
  let locations = [];
  let updatedEmail = '';
  let updatedName = '';
  let updatedPassword = '';
  let updatedAvatar = '';
  let isSitter = false;
  let location = '';
  let preferredLocations = [];
  let verified = false;
  let successMessage = '';
  // writable object availabilityData to store availability data

  let searchQuery = '';
  let searchResults = [];

  const pb = get(pocketbase);

  onMount(async () => {
    await fetchUserData();
    await fetchLocations();
  });

  async function fetchUserData() {
    const { data, error } = await fetchData('users', pb.authStore.model.id, {
      expand: 'location, services, preferredLocations',
    });
    if (error) {
      errorMessage = error;
    } else {
      user = data;
      updatedEmail = user.email || '';
      updatedName = user.name || '';
      updatedAvatar = user.avatar || '';
      isSitter = user.sitter || false;
      location = user.expand.location ? user.expand.location.id : '';
      preferredLocations = user.expand.preferredLocations ? user.expand.preferredLocations.map(loc => loc.id) : [];
      verified = user.verified || false;
      isLoading = false;
    }
  }

  async function fetchLocations() {
    const { data, error } = await fetchFullList('locations');
    if (error) {
      errorMessage = error;
    } else {
      locations = data;
    }
  }

  async function updateUserDetails() {
    try {
      if (!updatedEmail || !updatedName) {
        errorMessage = 'Email and name are required.';
        return;
      }

      const updatedUserData = {
        email: updatedEmail,
        name: updatedName,
        avatar: updatedAvatar,
        sitter: isSitter,
        location,
        preferredLocations,
      };

      if (updatedPassword) {
        updatedUserData.password = updatedPassword;
      }

      const updatedUser = await pb.collection('users').update(user.id, updatedUserData);

      user = updatedUser;
      successMessage = 'Profile updated successfully!';
      errorMessage = '';
      updatedPassword = ''; // Clear password field after update
    } catch (error) {
      errorMessage = `Failed to update user details: ${error.message}`;
      successMessage = '';
    }
  }

  function handleLogout() {
    pb.authStore.clear(); // Clear the auth store to log out the user
    alert('Logged out successfully');
    window.location.href = '/login'; // Redirect to login page or another appropriate page
  }

  function addPreferredLocation(locId) {
    if (!preferredLocations.includes(locId)) {
      preferredLocations = [...preferredLocations, locId];
    }
  }

  function removePreferredLocation(locId) {
    preferredLocations = preferredLocations.filter(id => id !== locId);
  }

  // Full-text search function
  function searchLocations() {
    const query = searchQuery.toLowerCase().trim();
    if (query.length > 0) {
      searchResults = locations.filter(loc => {
        const locationStr = `${loc.city} ${loc.country} ${loc.regions.join(' ')}`.toLowerCase();
        return locationStr.includes(query);
      });
    } else {
      searchResults = [];
    }
  }

  // Helper function to capitalize words
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
</script>

<main>
  <section id="mypaw" class="mypaw-section">
  {#if isLoading}
    <div class="spinner"></div>
    <p>Loading user data...</p>
  {:else}
    <div class="user-page">

      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      {#if successMessage}
        <p class="success">{successMessage}</p>
      {/if}

      <UserHeader user={user} />

      <div class="split-layout">
        <div class="card">
          <h2>Basic Settings</h2>
          <p><strong>Verified:</strong> {verified ? 'Yes' : 'No'}</p>
          <label for="avatar">Avatar:</label>
          <input
            id="avatar"
            type="text"
            bind:value={updatedAvatar}
            placeholder="Avatar filename"
            class="input-field"
          />

          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            bind:value={updatedName}
            placeholder="Name"
            class="input-field"
          />

          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            bind:value={updatedEmail}
            placeholder="Email address"
            class="input-field"
          />

          <label for="password">New Password:</label>
          <input
            id="password"
            type="password"
            bind:value={updatedPassword}
            placeholder="New Password (leave blank to keep current)"
            class="input-field"
          />
          <!-- don't allow auto-fill password -->
           
          <button class="button secondary icon" on:click|preventDefault={handleLogout}>Log Out</button>

        </div>

        <div class="card">
          <h2>Platform Settings</h2>

          <label>
            <input
              type="checkbox"
              bind:checked={isSitter}
            />
            Available as Sitter
          </label>

          <label for="location">Location:</label>
          <select
            id="location"
            bind:value={location}
            class="input-field"
          >
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
                    {loc.city}, {loc.country} ({#each loc.regions as region}{capitalize(region)}{/each})
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
                    {result.city}, {result.country} ({#each result.regions as region}{capitalize(region)}{/each})
                    <button class="add-button" on:click|preventDefault={() => addPreferredLocation(result.id)}>Add</button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>

        <button class="button primary  icon" on:click|preventDefault={updateUserDetails}>Update Profile</button>
        </div>
      </div>


      <!-- <AvailabilityCalendar bind:availabilityData /> -->

      <!-- <h2>Debugging Information</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre> -->
    </div>
  {/if}
  </section>
</main>

<style>



  .avatar-preview img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .error {
    color: #f00;
    margin-bottom: 10px;
  }

  .success {
    color: #0c0;
    margin-bottom: 10px;
  }


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

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }


</style>
