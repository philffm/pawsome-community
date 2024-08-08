<!-- Locations.svelte -->
<script>
  import { getFlagForCountry } from '$lib/utils/flags'; // Import the flag function

  // Default location data with the new structure
  const defaultLocations = [
    {
      city: "Frankfurt",
      collectionId: "0uvq69vp6tnvt1y",
      collectionName: "locations",
      country: "Germany",
      created: "2024-08-04 10:45:19.100Z",
      id: "h5i0mpuxk2i5niz",
      regions: ["europe", "eu"],
      updated: "2024-08-04 10:45:19.100Z"
    },
    {
      city : "Amsterdam",
      country : "Netherlands",
      regions : ["europe", "eu"]
    }
  
    // Add more default locations as needed
  ];

  export let preferredLocations = defaultLocations;
  let searchQuery = '';

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

<section id="locations" class="locations-section">
  <h2>Locations</h2>
  <p>I am ready to travel to the following places for pet sitting / working from your home:</p>

  <!-- Search Input -->
  <!-- <input
    type="text"
    placeholder="Search locations..."
    bind:value={searchQuery}
    class="input-field"
    /> -->
    
    <div class="location-details">
    {#each Object.entries(groupLocationsByRegionAndCountry(filterLocations(preferredLocations, searchQuery))) as [region, countries]}
      <h3 class="region">{region.toUpperCase()}</h3>
      <div class="location-tiles">
        {#each Object.entries(countries) as [country, cities]}
          <div class="card">
            <div class="tile-content">
              <span class="flag">{getFlagForCountry(country)}</span>
              <span class="country-name">{country}</span>
              <span class="city-name">{cities.join(', ')}</span>
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</section>

<style>
  .locations-section {
    background-color: #FAF6E8;
    text-align: center;
    border-radius: 6rem;
    margin: auto;
    max-width: 1200px;
    padding: 40px;
  }

  .location-details {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
  }

  .location-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }

  .tile {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  .tile:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .tile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .flag {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .country-name {
    font-weight: bold;
    color: #0073aa;
    margin-bottom: 5px;
  }

  .city-name {
    color: #333;
    font-style: italic;
    margin-bottom: 5px;
  }

  .regions {
    color: #555;
    font-size: 0.8rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #21201C;
  }

  h3.region {
    font-size: 1.5rem;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #333;
    text-transform: uppercase;
  }


</style>
