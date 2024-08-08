// src/lib/utils/fetchData.js

import { get } from 'svelte/store';
import { pocketbase } from '$lib/stores/pocketbase';

/**
 * Fetch data from a specified PocketBase collection.
 * @param {string} collection - The name of the collection.
 * @param {string | null} id - The ID of the item to fetch (optional for single item).
 * @param {object} options - Additional query options (e.g., expand, filter).
 * @returns {Promise<object>} The fetched data or an error message.
 */
export async function fetchData(collection, id = null, options = {}) {
  const pb = get(pocketbase); // Access PocketBase instance

  try {
    let result;
    if (id) {
      // Fetch a single item by ID
      result = await pb.collection(collection).getOne(id, options);
    } else {
      // Fetch a list of items
      result = await pb.collection(collection).getList(1, 50, options); // Adjust page and size as needed
    }
    return { data: result, error: null };
  } catch (error) {
    console.error(`Error fetching data from ${collection}:`, error);
    return { data: null, error: 'Data not found' };
  }
}

/**
 * Fetch a full list of items from a PocketBase collection.
 * @param {string} collection - The name of the collection.
 * @param {object} options - Additional query options.
 * @returns {Promise<object>} The fetched data or an error message.
 */
export async function fetchFullList(collection, options = {}) {
  const pb = get(pocketbase); // Access PocketBase instance

  try {
    const result = await pb.collection(collection).getFullList(options);
    return { data: result, error: null };
  } catch (error) {
    console.error(`Error fetching full list from ${collection}:`, error);
    return { data: null, error: 'Data not found' };
  }
}
