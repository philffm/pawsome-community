<script>
  import Why from '../../components/Why.svelte';
  import { pocketbase } from '$lib/stores/pocketbase';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';  // Import the goto function for navigation

  let email = '';
  let isBusiness = false;
  let loginEmail = '';
  let loginPassword = '';

  const pb = get(pocketbase); // Access the PocketBase instance

  function toggleUserType(type) {
    isBusiness = type === 'business';
  }

  async function handleSignup() {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    try {
      const data = {
        email: email,
        type: isBusiness ? 'Business' : 'Individual',
      };

      const record = await pb.collection('leads').create(data);

      alert(`Sign-up successful for ${isBusiness ? 'Business' : 'Individual'}: ${email}`);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again.');
    }
  }

  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const user = await pb.collection('users').authWithPassword(loginEmail, loginPassword);
      // alert(`Login successful for: ${loginEmail}`);

      // Redirect to /yourpaw after successful login
      goto('/mypaw');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password. Please try again.');
    }
  }
</script>

<main>
  <section class="signup-section split-layout">
          <!-- Login Form Card -->
      <div id="login" class="card large">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          bind:value={loginEmail}
          class="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          bind:value={loginPassword}
          class="input-field"
        />
        <button class="button primary icon" on:click|preventDefault={handleLogin}>Log In</button>
      </div>
       <!-- Sign Up Form Card -->
      <div id="signup" class="card large">
        <h2>Join the Meow-ement</h2>
        <div class="toggle-buttons">
          <button
          class="button {isBusiness ? '' : 'primary'}"
          on:click|preventDefault={() => toggleUserType('individual')}
          >
          💁  Individual
          </button>
          <button
          class="button {isBusiness ? 'primary' : ''}"
          on:click|preventDefault={() => toggleUserType('business')}
          >
          🏢  Business / B2B
          </button>
          </div>
          
          <p>Sign up for corporate cat sitting. Boost employee morale and enhance company culture with shared pet-sitting experiences.</p>
        <!-- Description based on User Type -->
        <div class="description">
          {#if isBusiness}
            <ul class="fade-in">
              <li><strong>Enhance Company Culture:</strong> Strengthen team bonds and foster a pet-friendly environment across your offices.</li>
              <li><strong>Global Connectivity:</strong> Create opportunities for collaboration and exchange worldwide.</li>
              <li><strong>Perk Innovation:</strong> Offer a unique perk that sets your company apart.</li>
            </ul>
          {:else}
            <ul class="fade-in">
              <li><strong>Join a Global Community:</strong> Connect with pet-loving colleagues.</li>
              <li><strong>Win-Win:</strong> Your colleague's vacation - your experience abroad.</li>
              <li><strong>Enrich Your Pet's Life:</strong> Discover new activities and friendships - it's like LinkedIn for your pet!</li>
            </ul>
          {/if}
        </div>

        <!-- Email Input -->
        <input
          type="email"
          placeholder="Email address"
          bind:value={email}
          class="input-field"
        />

        <!-- Sign-up Button -->
        <button class="button primary icon" on:click|preventDefault={handleSignup}>Sign up meow</button>

        <!-- Additional Info -->
        <p class="additional-info">
          In the meanwhile, feel free to check out the GitHub project, add suggestions, or create pull-requests.
        </p>
      </div>
   
  </section>

  <Why />
</main>

<style>



  #login {
    height: fit-content;
  }

  .signup-section {
    border-radius: 12px;
    display: flex;
    /* flex-direction: row; */
    gap: 36px;
    justify-content: center;
  
  }



  .description {
    /* margin-bottom: 20px; */
    color: #333;
    font-size: 1rem;
    line-height: 1.6;
  }

  .fade-in {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    padding-left: 20px; /* Adjust the padding for bullet points */
    list-style-type: none; /* Remove default bullet points */
  }

  .fade-in li {
    margin-bottom: 10px;
    position: relative;
    padding-left: 1.5em;
  }

  .fade-in li::before {
    content: '•'; /* Use a bullet symbol */
    position: absolute;
    left: 0;
    color: #A5D9D0; /* Accent color for bullets */
    font-size: 1.5em;
    line-height: 1;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: fit-content;
    /* background-color: #b7b7b7; */
    border-radius: 24px;
    border-color: #333;
    /* padding: 24px; */
    gap: 12px;
    margin: auto;
  }

  .toggle-buttons button {
    /* color: white; */
  }


  .additional-info {
    margin-top: 20px;
    color: #555;
    font-size: 0.9rem;
  }
</style>
