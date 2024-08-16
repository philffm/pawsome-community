<!-- PawsList.svelte -->
<script>
    // Import the UserAbout component if needed for individual user details
    import UserAbout from './UserAbout.svelte';

    // Expect a list of users as a prop
    export let users = [];
</script>

<main>
    <!-- <pre> users: {JSON.stringify(users, null, 2)}</pre> -->
    <div class="cards-grid">
        {#each users as user}
            <li class="card"  key={user.id} on:click={() => window.location.href = `/paws/${user.id}`}>
                <div class="card-content">
                    <h2>{user.name}</h2>
                    <p>{user.description}</p>
                    <p>📍 {user.expand.userLocation?.city}, {user.expand.userLocation?.country} </p>
                </div>
            </li>
        {/each}
    </div>
</main>

<style>
    main {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
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
