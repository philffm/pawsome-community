<section class="hero" aria-label="Pawsome Community">
    <img src='hero.jpeg' alt="Pawsome Hero" class="hero-image" />
    <div class="hero-content">
      <h1 class="marquee-text">
        Connect through pets 🐱🐶🦜  Explore new office locations 🗺️🏢  Strengthen your global community 👯  Connect through pets 🐱🐶🦜  Explore new office locations 🗺️🏢  Strengthen your global community 👯 


    </h1>
    </div>
  </section>
  
<style>

.hero {
    position: relative;
    display: flex;
    text-align: center;
    height: 320px;
    color: #ffffff;
    overflow: hidden;
    max-width: 1200px;
    border-radius: 4rem;
    padding: 0;
    flex-direction: column-reverse;
    margin-top: -120px;
    z-index: 1;
    /* box-shadow: 0 0 25px rgba(0, 0, 0, 0.05); */

}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    /* filter: brightness(.8) contrast(1); */
    opacity: 0.75;
    
}


@font-face {
    font-family: 'Linebeam';
    src: url('/fonts/Linebeam.ttf') format('truetype');
}

.marquee-text {
    display: inline-block;
    white-space: nowrap;
    font-size: 3rem;
    font-family: 'Linebeam';
    /* font-style: italic; */
    margin-bottom: 1rem;
    color: #ffffff;
    animation: marquee 8s linear infinite;
    outline: 4px solid;
    background: black;
}

@keyframes marquee {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-50%);
    }
}

@media (max-width: 768px) {
    .marquee-text {
        font-size: 3rem;
    }
}

</style>
  