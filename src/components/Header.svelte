<script>
  import { onMount } from 'svelte';

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<header class="header">
  <a href="/">
    <div class="logo-title">
      <img src="/logo.svg" alt="Pawsome Logo" class="logo" />
    </div>
  </a>

  <div class="header-content">
    <nav class="nav-links" class:isMenuOpen>
      <ul class:isMenuOpen>
        <li><a href="/#about" on:click={closeMenu}>About</a></li>
        <li><a href="/" on:click={closeMenu}>Services</a></li>
        <li><a href="/locations" on:click={closeMenu}>Locations</a></li>
      </ul>
    </nav>

    <button class="button primary icon" on:click={() => (window.location.href = '/meow')}>Be Pawsome</button>

    <!-- Hamburger Icon -->
    <div class="hamburger" on:click={toggleMenu}>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>

  <!-- Bottom Navigation for Mobile -->
  <nav class="mobile-nav" class:isMenuOpen>
    <ul>
      <li><a href="/#about" on:click={closeMenu}>🏠<br />Home</a></li>
      <li><a href="/" on:click={closeMenu}>🔧<br />Services</a></li>
      <li><a href="/locations" on:click={closeMenu}>📍<br />Locations</a></li>
      <li><a href="/meow" on:click={closeMenu}>😻<br />Be Pawsome</a></li>
    </ul>
  </nav>
</header>

<style>
  /* Basic Styles for Header */
  .header {
    padding: 24px 0;
    border-radius: 0 0 6rem 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
    width: 100%;
  }

  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    z-index: 1000;
    width: 100%;
    max-width: 1200px;
    flex-direction: row;
  }

  .logo-title {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
  }

  /* Navigation Links */
  .nav-links ul {
    display: flex;
    gap: 20px;
  }

  .nav-links a {
    color: #333;
    font-weight: 500;
    text-decoration: none;
    padding: 16px 12px;
    background-color: #ffffff;
    border-radius: 12px;
  }

  .nav-links a:hover {
    color: #008080;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* Responsive Styles */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
  }

  .hamburger .bar {
    width: 25px;
    height: 3px;
    background-color: #333;
    transition: 0.3s ease;
  }

  /* Toggle Open/Close Hamburger Menu */
  .nav-links.isMenuOpen {
    display: block;
    position: absolute;
    top: 90px;
    right: 20px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 10px;
    z-index: 1001;
  }

  .nav-links.isMenuOpen ul {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links.isMenuOpen a {
    padding: 10px 20px;
    font-size: 1em;
  }

  /* Mobile Bottom Navigation */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 10px 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .mobile-nav ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-nav ul li {
    flex: 1;
    text-align: center;
  }

  .mobile-nav ul li a {
    font-size: 1em;
    color: #333;
    text-decoration: none;
  }

  .mobile-nav ul li a:hover {
    color: #008080;
  }

  .mobile-nav ul li a {
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    .nav-links ul {
      display: none;
      flex-direction: column;
      align-items: flex-end;
    }

    .hamburger {
      display: flex;
    }

    .nav-links ul.isMenuOpen {
      display: flex;
    }

    .mobile-nav {
      display: block;
    }

    /* Hide the desktop navigation when the mobile menu is active */
    .header-content {
      display: none;
    }
  }
</style>
