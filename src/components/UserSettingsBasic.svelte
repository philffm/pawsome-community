<script>
  import { createEventDispatcher } from 'svelte';

  export let user = {};
  let updatedName = user.name;
  let updatedEmail = user.email;
  let updatedAvatar = user.avatar;
  let updatedPassword = '';

  const dispatch = createEventDispatcher();

  function saveChanges() {
    if (!updatedName || !updatedEmail) {
      alert('Name and Email are required!');
      return;
    }
    const data = {
      name: updatedName,
      email: updatedEmail,
      avatar: updatedAvatar,
      ...(updatedPassword && { password: updatedPassword })
    };
    dispatch('save', data);
  }

  function logout() {
    dispatch('logout');
  }
</script>

<div class="card">
  <h2>Basic Settings</h2>
  <label for="avatar">Avatar:</label>
  <input
    id="avatar"
    type="text"
    bind:value={updatedAvatar}
    placeholder="Avatar filename"
    class="input-field"
  />

  <label for="name">Name:</label>
  <input
    id="name"
    type="text"
    bind:value={updatedName}
    placeholder="Name"
    class="input-field"
  />

  <label for="email">Email:</label>
  <input
    id="email"
    type="email"
    bind:value={updatedEmail}
    placeholder="Email address"
    class="input-field"
  />

  <label for="password">New Password:</label>
  <input
    id="password"
    type="password"
    bind:value={updatedPassword}
    placeholder="New Password (leave blank to keep current)"
    class="input-field"
  />

  <button class="button primary" on:click|preventDefault={saveChanges}>Save Changes</button>
  <button class="button secondary" on:click|preventDefault={logout}>Log Out</button>
</div>

<style>
  /* Styling for your component */
</style>
