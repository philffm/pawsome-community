<script>
  import { writable } from 'svelte/store';

  export let availabilityData = writable({
      infinite: false,
      slots: {} // { '2023-08-21': ['09:00-12:00', '14:00-17:00'] }
  });

  let selectedDate = '';
  let selectedStartTime = '';
  let selectedEndTime = '';
  let infiniteAvailability = false;

  // Helper to format date
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Toggle infinite availability
  function toggleInfiniteAvailability() {
      infiniteAvailability = !infiniteAvailability;
      availabilityData.update(data => ({
          ...data,
          infinite: infiniteAvailability,
          slots: infiniteAvailability ? {} : data.slots // Clear slots if infinite
      }));
  }

  // Add a time slot for the selected date
  function addTimeSlot() {
      if (!selectedDate || !selectedStartTime || !selectedEndTime) return;

      const newSlot = `${selectedStartTime}-${selectedEndTime}`;
      availabilityData.update(data => {
          const slotsForDate = data.slots[selectedDate] || [];
          if (!slotsForDate.includes(newSlot)) {
              slotsForDate.push(newSlot);
          }
          return {
              ...data,
              slots: {
                  ...data.slots,
                  [selectedDate]: slotsForDate
              }
          };
      });

      // Clear inputs after adding
      selectedStartTime = '';
      selectedEndTime = '';
  }

  // Remove a specific time slot
  function removeTimeSlot(date, slot) {
      availabilityData.update(data => {
          const slotsForDate = data.slots[date] || [];
          const updatedSlots = slotsForDate.filter(s => s !== slot);
          if (updatedSlots.length === 0) {
              delete data.slots[date];
          } else {
              data.slots[date] = updatedSlots;
          }
          return data;
      });
  }
</script>

<div class="availability-section">
  <h2>Availability</h2>

  <!-- Infinite Availability Toggle -->
  <label class="infinite-toggle">
      <input type="checkbox" bind:checked={infiniteAvailability} on:change={toggleInfiniteAvailability} />
      Infinite Availability
  </label>

  <!-- Show the calendar and time slots only if infinite availability is not set -->
  {#if !infiniteAvailability}
      <!-- Date Selector -->
      <input type="date" bind:value={selectedDate} min={formatDate(new Date())} />

      <!-- Time Slot Selector -->
      <div class="time-slot-inputs">
          <input type="time" bind:value={selectedStartTime} />
          <span>to</span>
          <input type="time" bind:value={selectedEndTime} />
          <button on:click={addTimeSlot}>Add Time Slot</button>
      </div>

      <!-- Display Selected Time Slots -->
      <div class="selected-slots">
          {#each Object.entries($availabilityData.slots) as [date, slots]}
              <div class="date-slots">
                  <h3>{date}</h3>
                  <ul>
                      {#each slots as slot}
                          <li>
                              {slot} <button class="remove-slot" on:click={() => removeTimeSlot(date, slot)}>Remove</button>
                          </li>
                      {/each}
                  </ul>
              </div>
          {/each}
      </div>
  {/if}
</div>

<style>
  .availability-section {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
  }

  h2 {
      text-align: center;
      margin-bottom: 20px;
  }

  .infinite-toggle {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 1.2rem;
  }

  .infinite-toggle input {
      margin-right: 10px;
      transform: scale(1.5);
  }

  .time-slot-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
  }

  .time-slot-inputs input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
  }

  .time-slot-inputs button {
      background-color: #a5d9d0;
      padding: 8px 15px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      color: white;
  }

  .time-slot-inputs button:hover {
      background-color: #92c6bd;
  }

  .selected-slots {
      margin-top: 20px;
  }

  .selected-slots .date-slots {
      margin-bottom: 15px;
  }

  .selected-slots h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #333;
  }

  .selected-slots ul {
      list-style-type: none;
      padding: 0;
  }

  .selected-slots li {
      background-color: #faf6e8;
      padding: 8px 12px;
      margin-bottom: 5px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .remove-slot {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      color: #d32f2f;
      margin-left: 10px;
  }
</style>
