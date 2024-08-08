<!-- Locations.svelte -->
<script>
    import { fetchFullList } from '$lib/utils/fetchData'; // Import utility functions
    import { onMount } from 'svelte';
    import { getFlagForCountry } from '$lib/utils/flags'; // Import the flag function
    import UserLocations from '../../components/UserLocations.svelte';

  
    let preferredLocations = [];
    let searchQuery = '';
    let loading = true;
    let error = null;
  
    // Fetch all locations from the "locations" collection
    async function loadLocations() {
      const { data, error: fetchError } = await fetchFullList('locations');
      if (fetchError) {
        error = fetchError;
      } else {
        preferredLocations = data.map(item => ({
          city: item.city,
          country: item.country,
          regions: item.regions
        }));
      }
      loading = false;
    }
  
    onMount(() => {
      loadLocations();
    });
  
    // Function to filter locations based on search query
    function filterLocations(locations, query) {
      query = query.toLowerCase();
      return locations.filter(
        ({ country, city }) =>
          country.toLowerCase().includes(query) ||
          city.toLowerCase().includes(query)
      );
    }
  
    // Function to group locations by region and country
    function groupLocationsByRegionAndCountry(locations) {
      const grouped = {};
  
      locations.forEach(({ country, city, regions }) => {
        regions.forEach(region => {
          if (!grouped[region]) {
            grouped[region] = {};
          }
          if (!grouped[region][country]) {
            grouped[region][country] = [];
          }
          if (!grouped[region][country].includes(city)) {
            grouped[region][country].push(city);
          }
        });
      });
  
      return grouped;
    }
  </script>
  
<UserLocations preferredLocations={preferredLocations} searchQuery={searchQuery} loading={loading} error={error} filterLocations={filterLocations} groupLocationsByRegionAndCountry={groupLocationsByRegionAndCountry} getFlagForCountry={getFlagForCountry} />

  
  <style>
  
  </style>
  