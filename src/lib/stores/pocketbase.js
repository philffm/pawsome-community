// src/lib/stores/pocketbase.js

import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// Use environment variable or default to localhost
const host = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';
const pb_email = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
const pb_pass = import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD;

// Initialize PocketBase
const pb = new PocketBase(host);

// Create a writable store with the PocketBase instance
export const pocketbase = writable(pb);

// Initialize auth state
export const authStore = writable({
user: pb.authStore.model,
isLoggedIn: pb.authStore.isValid,
});

// Function to handle initialization and connection logic
export async function initializePocketBase() {
try {
// Check if there is a stored token
const token = localStorage.getItem('pocketbase_auth_token');
const model = localStorage.getItem('pocketbase_auth_model');

if (token && model) {
    pb.authStore.save(token, JSON.parse(model)); // Restore the auth state
    authStore.set({
    user: pb.authStore.model,
    isLoggedIn: pb.authStore.isValid,
    });
} else {
    // Authenticate with admin credentials if not already authenticated
    const authData = await pb.admins.authWithPassword(pb_email, pb_pass);
    authStore.set({
    user: authData.admin,
    isLoggedIn: true,
    });
    localStorage.setItem('pocketbase_auth_token', pb.authStore.token);
    localStorage.setItem('pocketbase_auth_model', JSON.stringify(pb.authStore.model));
}

console.log(`PocketBase initialized with host: ${host}`);
console.log('PocketBase auth data:', authData);
} catch (error) {
console.error('Error initializing PocketBase:', error);
}

// Listen to auth changes
pb.authStore.onChange(() => {
authStore.set({
    user: pb.authStore.model,
    isLoggedIn: pb.authStore.isValid,
});

if (pb.authStore.isValid) {
    localStorage.setItem('pocketbase_auth_token', pb.authStore.token);
    localStorage.setItem('pocketbase_auth_model', JSON.stringify(pb.authStore.model));
} else {
    localStorage.removeItem('pocketbase_auth_token');
    localStorage.removeItem('pocketbase_auth_model');
}
});
}

// Function to log out the user
export function logout() {
pb.authStore.clear();
authStore.set({
user: null,
isLoggedIn: false,
});
localStorage.removeItem('pocketbase_auth_token');
localStorage.removeItem('pocketbase_auth_model');
}
