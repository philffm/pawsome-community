<script>
  export let features = [
    { icon: '🗓️', text: 'Easy Booking' },
    { icon: '🌍', text: 'Global Reach' },
    { icon: '🔧', text: 'Flexible Plans' },
    { icon: '💰', text: 'Secure Payments' },
    { icon: '🤝', text: 'Community Support' },
  ];
</script>

<div class="features">
  <h2>Platform Features</h2>
  <ul>
    {#each features as feature}
      <li>{feature.icon} {feature.text}</li>
    {/each}
  </ul>
</div>

<style>
  .features {
    padding: 50px;
    background-color: #e6f7ff;
  }

  .features ul {
    list-style-type: none;
    padding: 0;
  }

  .features li {
    margin: 15px 0;
  }
</style>
