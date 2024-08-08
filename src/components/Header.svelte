<script>
  // Optional: Add any JavaScript logic if needed
  // import Button
</script>

<header class="header">
  
  <a href="/">
    <div class="logo-title">
      <img src="/logo.svg" alt="Pawsome Logo" class="logo" />
    </div>
  </a>
  <div class="header-content">
    <nav class="nav-links">
      <ul>
        <li><a href="/#about">About</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/locations">Locations</a></li>
        <!-- <li><a href="/">Availability</a></li> -->
      </ul>
    </nav>
    <!-- button leading to /meow path -->
    <button class="button primary icon" on:click={() => window.location.href = '/meow'}>Join the Community</button>
    
  </div>
</header>

<style>
  .header {
    /* background-color: #f6eed3; */
    padding: 20px 0;
    border-radius: 0 0 6rem 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* suble fadein animation */
    /* animation: fadeIn 2s; */
    gap: 32px;
  }


  /* keyframes with bounce effect */

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    z-index: 1000;
  }

  .logo-title {
    display: flex;
    align-items: center;
    }
    
  .logo {
    width: 200px;
  }


  .nav-links ul {
    display: flex;
    gap: 20px;
  }

  .nav-links a {
    color: #333;
    font-weight: 500;
    text-decoration: none;
    /* transition: color 0.3s; */
    padding: 12px 8px;
    font-size: 1em;
    background-color: #FFFFFF;
    border-radius: 12px;

  }

  .nav-links a:hover {
    color: #008080;
    /* underline */
    text-decoration: underline;
    text-underline-offset: 4px;
  }




</style>
