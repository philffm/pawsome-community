<script>
    import { onMount } from 'svelte';
  
    let backgroundPositionX = 50;
    let backgroundPositionY = 50;
    const maxOffset = 80; // Increased for more intense movement
  
    function throttle(callback, delay) {
      let last = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - last >= delay) {
          last = now;
          callback(...args);
        }
      };
    }
  
    onMount(() => {
      const updateBackgroundPosition = throttle((e) => {
        requestAnimationFrame(() => {
          backgroundPositionX = 50 + (e.clientX / window.innerWidth) * maxOffset - maxOffset / 2;
          backgroundPositionY = 50 + (e.clientY / window.innerHeight) * maxOffset - maxOffset / 2;
        });
      }, 10);
  
      window.addEventListener('mousemove', updateBackgroundPosition);
  
      return () => {
        window.removeEventListener('mousemove', updateBackgroundPosition);
      };
    });
  </script>
  
  <div
    class="dynamic-background"
    style="background-position: {backgroundPositionX}% {backgroundPositionY}%;">
  </div>
  
  <style>
    .dynamic-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background: linear-gradient(120deg, #fff8e1, #e0f7fa, #ffecb3);
      background-size: 300% 300%; /* Increased background size for more noticeable movement */
      transition: background-position 0.1s ease-out;
    }
  </style>
  