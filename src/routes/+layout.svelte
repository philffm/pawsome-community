<!-- +layout.svelte -->
<script>
    import '../app.css';
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import CustomCursor from '../components/CustomCursor.svelte';
    import { pocketbase, initializePocketBase } from '$lib/stores/pocketbase';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    // Initialize PocketBase
    initializePocketBase();

    // Access the PocketBase instance from the store
    let pb = get(pocketbase);

    onMount(() => {
        // Update pb if the store changes
        const unsubscribe = pocketbase.subscribe(value => {
            pb = value;
            console.log('Updated PocketBase instance:', pb); // Debugging
        });

        // Clean up subscription on component destroy
        return () => {
            unsubscribe();
        };
    });
</script>

<link rel="preload" href="/fonts/Podkova/Podkova-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">

<!-- Add global styles here -->
<!-- <style>
  main {
    max-width: 1200px;
    margin: 0 auto;
  }
</style> -->

<!-- Global components -->
<Header />
<CustomCursor />
<slot />
<Footer />
