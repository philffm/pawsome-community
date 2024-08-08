<section id="about" class="how-it-works ">
    <h2>How It Works</h2>
    <div class="steps">
      <div class="card">
        <span class="step-number">1</span>
        <h3>Sign Up</h3>
        <!-- <div class="numtext"> -->
        <!-- </div> -->
        <p>Create a profile, add your pets, and list your availability.</p>
      </div>
      <div class="card">
        <span class="step-number">2</span>
        <h3>Connect</h3>
        <p>Find colleagues in other locations and book a stay.</p>
      </div>
      <div class="card">
        <span class="step-number">3</span>
        <h3>Enjoy</h3>
        <p>Travel, care for pets, and build meaningful connections.</p>
      </div>
    </div>
  </section>


<style>


.how-it-works {
  text-align: center;
}

.card {
  flex-direction: row;
  gap: 8px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 40px;
}


.step-number {
  font-size: 4rem;
  /* font-family: 'Linebeam'; */
  color: #a5d9d0;
  font-weight: bold;
}


@media (min-width: 768px) {
  .steps {
    flex-direction: row;
  }
}

</style>