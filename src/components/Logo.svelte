<!-- Logo.svelte -->
<script>
    export let text = 'Community';
  
    let textElement;
  
    function updateText(newText) {
      if (textElement) {
        textElement.textContent = newText;
      }
    }
  </script>
  
  <div class="logo-container">
    <svg
      class="logo-icon"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Replace with your actual SVG content -->
      <circle cx="20" cy="20" r="20" fill="#ECECEC"/>
      <path d="M20 0L25.9808 11.5476H14.0192L20 0Z" fill="#FFB6C1"/>
      <!-- Your actual SVG content goes here -->
    </svg>
    <div class="logo-text" bind:this={textElement}>{text}</div>
  </div>
  
  <style>
    .logo-container {
      display: flex;
      align-items: center;
    }
  
    .logo-icon {
      width: 40px;
      height: 40px;
    }
  
    .logo-text {
      margin-left: 8px;
      font-family: 'Arial', sans-serif;
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }
  </style>
  