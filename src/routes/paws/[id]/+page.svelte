<!-- src/routes/paws/[id]/+page.svelte -->
<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
  
    import UserAbout from '../../../components/UserAbout.svelte';
    import UserServices from '../../../components/UserServices.svelte';
    import UserLocations from '../../../components/UserLocations.svelte';
    import CallToAction from '../../../components/CallToAction.svelte';
  
    import { fetchData } from '$lib/utils/fetchData'; // Import the generic fetch function
  
    let user = {};
    let isLoading = true;
    let errorMessage = '';
  
    // Access the `id` parameter from the URL
    const { params } = $page;
    const { id } = params;
  
    onMount(async () => {
      const { data, error } = await fetchData('users', id, {
        expand: 'location, services, preferredLocations',
      });
  
      user = data || {};
      errorMessage = error || '';
      isLoading = false;
    });
  </script>
  
  <main>
    {#if isLoading}
    <div class="spinner"></div>
    <p>Loading sitter details...</p>
    {:else if errorMessage}
    <p class="error">{errorMessage}</p>
    {:else}
    <!-- user as json object -->
    <!-- <pre>{JSON.stringify(user, null, 2)}</pre> -->
    {#if user}
    <UserAbout user={user} />
    {/if}
  
    {#if user.expand.services}
    <UserServices services={user.expand.services} />
    {/if}
  
    {#if user.expand.preferredLocations}
    <UserLocations preferredLocations={user.expand.preferredLocations} />
    {/if}
    {/if}
  
    <CallToAction />
  </main>
  
  <style>
    /* Page-specific styles */
    .spinner {
      /* spinner styles */
    }
  
    .error {
      color: red;
    }
  </style>
  