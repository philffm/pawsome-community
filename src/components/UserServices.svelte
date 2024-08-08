<!-- Services.svelte -->
<script>
  // Default service data
  const defaultServices = [
    {
      title: "Daily feeding and fresh water",
      description: "Ensuring your cats stay well-nourished and hydrated.",
      icon: "🌟",
      category: "pet",
    },
    {
      title: "Litter box cleaning",
      description: "Keeping your cat's space clean and comfortable.",
      icon: "🧼",
      category: "pet",
    },
    {
      title: "Playtime and cuddles",
      description: "Providing plenty of love and attention to keep your cat happy.",
      icon: "🧸",
      category: "pet",
    },
    {
      title: "Regular updates with photos",
      description: "Keeping you informed with adorable pictures of your feline friend.",
      icon: "📸",
      category: "pet",
    },
    {
      title: "Home security",
      description: "Ensuring your home is safe and secure while you're away.",
      icon: "🔒",
      category: "home",
    },
  ];

  export let services = defaultServices;

  // Filter services by category
  let filteredServices = services.filter(service => service.category !== 'pet');
  let petServices = services.filter(service => service.category === 'pet');
</script>

<section id="services" class="services-section">
  <div class="container">
    <h2>Pet Services</h2>
    <div class="pet-services-grid">
      {#each petServices as { title, description, icon, category }}
        <div class="card">
          <div class="card-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      {/each}
    </div>

    <h2>General Services</h2>
    <div class="services-grid">
      {#each filteredServices as { title, description, icon, category }}
        <div class="card">
          <div class="card-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-section {
    padding: 40px 0;
    text-align: center;
    max-width: 800px;
  }

  .services-grid,
  .pet-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Smaller min-width */
    gap: 24px; /* Reduced gap between cards */
    margin-top: 24px; /* Reduced margin */
  }

</style>
