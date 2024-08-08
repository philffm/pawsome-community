<script>
    import { onMount } from 'svelte';
  
    // Cursor position and state variables
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;
    let isClicked = false;
    let isMousedown = false;
    let isVisible = false;
  
    let lastCursorX = 0;
    let rotationAngle = 0;
    const maxRotation = 30;
  
    // Throttle function to limit the frequency of updates
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
      document.body.style.cursor = 'none';
  
      const updateCursor = throttle((e) => {
        requestAnimationFrame(() => {
          const deltaX = e.clientX - lastCursorX;
          rotationAngle = Math.max(-maxRotation, Math.min(maxRotation, -deltaX));
  
          cursorX = e.clientX;
          cursorY = e.clientY;
          lastCursorX = e.clientX;
  
          if (!isVisible && (cursorX !== 0 || cursorY !== 0)) {
            isVisible = true;
          }
        });
      }, 10); // Throttle interval
  
      const setHover = () => (isHovering = true);
      const unsetHover = () => (isHovering = false);
      const handleMousedown = (e) => {
        isMousedown = true;
        createPawPrint(e.pageX, e.pageY); // Use pageX and pageY for correct positioning
      };
      const handleMouseup = () => (isMousedown = false);
      const handleClick = () => {
        isClicked = true;
        setTimeout(() => (isClicked = false), 150);
      };
  
      window.addEventListener('mousemove', updateCursor);
      window.addEventListener('mousedown', handleMousedown);
      window.addEventListener('mouseup', handleMouseup);
      window.addEventListener('click', handleClick);
  
      const hoverTargets = document.querySelectorAll('.hover-target');
      hoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', setHover);
        target.addEventListener('mouseleave', unsetHover);
      });
  
      return () => {
        window.removeEventListener('mousemove', updateCursor);
        window.removeEventListener('mousedown', handleMousedown);
        window.removeEventListener('mouseup', handleMouseup);
        window.removeEventListener('click', handleClick);
  
        hoverTargets.forEach((target) => {
          target.removeEventListener('mouseenter', setHover);
          target.removeEventListener('mouseleave', unsetHover);
        });
      };
    });
  
    // Create a paw print SVG element at the specified position
    function createPawPrint(x, y) {
      const pawPrint = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      pawPrint.setAttribute("width", "30");
      pawPrint.setAttribute("height", "30");
      pawPrint.setAttribute("viewBox", "0 0 24 24");
      pawPrint.setAttribute("fill", "none");
      pawPrint.setAttribute(
        "style",
        `position: absolute; left: ${x}px; top: ${y}px; pointer-events: none; transform: translate(-50%, -50%);`
      );
      pawPrint.innerHTML = `
        <circle cx="6" cy="10" r="3" fill="rgba(200, 200, 200, 1)" />
        <circle cx="18" cy="10" r="3" fill="rgba(200, 200, 200, 1)" />
        <circle cx="12" cy="4" r="3" fill="rgba(200, 200, 200, 1)" />
        <circle cx="9" cy="18" r="4" fill="rgba(200, 200, 200, 1)" />
        <circle cx="15" cy="18" r="4" fill="rgba(200, 200, 200, 1)" />
      `;
      pawPrint.classList.add('paw-print');
  
      // Apply initial transformation and animation
      const initialRotation = Math.random() * 60 - 30; // Random rotation between -30 and 30 degrees
      pawPrint.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${initialRotation}deg)`;
      pawPrint.style.transition = 'transform 0.5s ease-out, opacity 1.5s ease-out';
  
      // Append to the DOM
      document.body.appendChild(pawPrint);
  
      // Start animation after adding to DOM
      requestAnimationFrame(() => {
        pawPrint.style.transform = `translate(-50%, -50%) scale(1) rotate(${initialRotation}deg)`;
        pawPrint.style.opacity = '1';
      });
  
      // Remove the paw print after some time
      setTimeout(() => {
        pawPrint.classList.add('fade-out');
        setTimeout(() => {
          pawPrint.remove();
        }, 1500); // Total fade-out duration
      }, 1000); // Initial delay before fading
    }
  </script>
  
  <!-- Custom Cursor HTML -->
  {#if isVisible}
  <div
    class="custom-cursor {isHovering ? 'hovering' : ''} {isClicked ? 'clicked' : ''} {isMousedown ? 'mousedown' : ''}"
    style="transform: translate3d({cursorX}px, {cursorY}px, 0) rotate({rotationAngle}deg)"
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="pointer-events: none;"
    >
      <circle cx="6" cy="10" r="3" fill="currentColor" />
      <circle cx="18" cy="10" r="3" fill="currentColor" />
      <circle cx="12" cy="4" r="3" fill="currentColor" />
      <circle cx="9" cy="18" r="4" fill="currentColor" />
      <circle cx="15" cy="18" r="4" fill="currentColor" />
    </svg>
  </div>
  {/if}
  
  <style>
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform, opacity;
      transform: translateZ(0);
      backface-visibility: hidden;
      transition: transform 0.05s ease-out;
    }
  
    .custom-cursor svg {
      width: 24px;
      height: 24px;
      fill: rgba(165, 217, 208, 1);
      transition: fill 0.15s ease, transform 0.1s ease;
      will-change: transform, fill;
    }
  
    .custom-cursor.hovering svg {
      fill: rgba(240, 132, 132, 1);
      transform: scale(1.2);
    }
  
    .custom-cursor.clicked svg {
      transform: scale(1.5);
      transition: transform 0.1s ease-out;
    }
  
    .custom-cursor.mousedown svg {
      fill: rgba(130, 217, 208, 1);
      transform: scale(1.3);
      transition: transform 0.1s ease-in;
    }
  </style>
  