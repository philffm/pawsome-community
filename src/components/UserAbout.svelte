<!-- AboutUser.svelte -->

<script>
  // Accept user object as a prop
  export let user = {
    avatar: "photo_2024_07_11_18_30_15_LgR7teMa6W.jpg",
    name: "Phil",
    description: "I have a lot of experience with pets. I have been pet sitting for over 5 years",
    quote: "I love animals and I will take care of your pets as if they were my own."};


  // Map user properties to existing variables
  export let image = `https://supa.ueee.eu/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
  export let name = user.name || "Anonymous";
  export let description = user.description || "No description provided.";
  export let quote = user.quote || `${name} `;
  export const email = user.email || "noemail@example.com";
  export const teamsURL = "https://teams.microsoft.com/l/chat/0/0?users=" + email;

  // Handle location if available
  const location = user.expand?.location ? `🇩🇪 ${user.expand.location.city}, ${user.expand.location.country}` : "Location not available";
</script>

<section class="about-section">
  <div class="container">
    <!-- <h2>About {name}</h2> -->
     <!-- only display first part of the name -->
    <h2>About {name.split(' ')[0]}</h2>
    <div class="about-content">
      <img src={image} alt="{name} with cat" class="about-image" />
      <div class="about-text">
        <p>{description}</p>
        <p class="quote">{quote}</p>
        <p class="location">{location}</p>
        <div class="buttons">
          <button class="button primary" on:click={() => window.location.href = '#services'}>Services</button>
          <button class="button secondary" on:click={() => window.open(teamsURL, '_blank')}>Contact on Teams</button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .buttons {
    display: flex;
    gap: 20px;
    margin: 20px;
  }

  .about-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    max-width: 800px;
    margin: auto;
  }

  .about-image {
    border-radius: 20%;
    width: 300px;
    height: 300px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .about-text {
    max-width: 600px;
    display: flex;
    text-align: left;
    flex-direction: column;
    align-items: center;
  }

  .quote {
    margin-top: 20px;
    font-weight: bold;
  }

  .location {
    margin-top: 10px;
    font-style: italic;
    color: #777;
  }

  @media (max-width: 768px) {
    .about-content {
      flex-direction: column;
    }
    .about-image {
      width: 200px;
      height: 200px;
    }
  }
</style>
