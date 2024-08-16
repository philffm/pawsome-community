<!-- +page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { pocketbase } from '$lib/stores/pocketbase';
  import PawsList from '../../components/PawsList.svelte'; // Adjust the import path if needed

  // State to store fetched users
  let users = [];
  let isLoading = true; // Loading state

  // Fetch users when the component is mounted
  onMount(async () => {
    const pb = get(pocketbase); // Access the PocketBase instance

    try {
      const fetchedUsers = await pb.collection('users').getFullList({
        expand: 'userLocation', // Expand the location field
        sort: '-created',
      });

      // Store the fetched users in the users array
      users = fetchedUsers;


    } catch (error) {
      console.error('Failed to fetch users or locations:', error);
    } finally {
      isLoading = false; // Set loading to false after fetching
    }
  });
</script>

<main>
  <h1>Pawsome Sitters</h1>
  <!-- Show loading spinner while data is loading -->
  {#if isLoading}
    <div class="spinner"></div>
    <p>Loading sitters...</p>
  {:else}
    <!-- Pass the users array to the PawsList component -->
    <PawsList {users} />
  {/if}
</main>

<style>
  main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }


  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    text-align: center;
    color: #555;
    margin-top: 10px;
  }
</style>
