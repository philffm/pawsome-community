<!-- PawsList.svelte -->
<script>
    // Import the UserAbout component if needed for individual user details
    import UserAbout from './UserAbout.svelte';

    // Expect a list of users as a prop
    export let users = [];
</script>

<main>
    <!-- <pre> users: {JSON.stringify(users, null, 2)}</pre> -->
    <ul class="grid">
        {#each users as user}
            <li class="card"  key={user.id} on:click={() => window.location.href = `/paws/${user.id}`}>
                <div class="card-content">
                     <!-- <img src = {`https://supa.ueee.eu/api/files/_pb_users_auth_/${user.id}/${user.avatar}`} alt = {user.name} /> -->

                    <h2>{user.name}</h2>
                    <p>{user.description}</p>
                    <p>📍 {user.expand.location.city}, {user.expand.location.country} 
                </div>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust for responsive design */
        gap: 20px;
        padding: 0;
        list-style: none;
    }


    h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 10px;
    }

    p {
        color: #555;
        font-size: 1rem;
        margin: 0;
    }
</style>
