
<script>
  
  import Hero from '../components/Hero.svelte';
  // Optional: Import any images or icons needed for the design
  import Why from '../components/Why.svelte';
  import CallToAction from '../components/CallToAction.svelte';
  import HowItWorks from '../components/HowItWorks.svelte';
  import Testimonials from '../components/Testimonials.svelte'; 
  </script>
  
  <main>
  <Hero />

    <!-- <Hero />  -->


    <!-- <HowItWorks /> with id #about -->
    <HowItWorks />


    <Why />
    <Testimonials />
      
             


      <section class="meet-the-team">
        <h2>Meet the Team</h2>
        <div class="team-member">
          <img src="/phil.jpg" alt="Phil" class="team-photo" />
          <div class="team-info">
            <h3>Phil</h3>
            <p>
              Phil is the developer behind Pawsome Community. He loves pets and win-win solutions.
            </p>
            <button class="button primary icon" on:click={() => window.location.href = '/paws/e3jizdq912t7ung'}>Contact Phil</button>
          </div>
        </div>
      </section>
           

      <CallToAction />

</main>

  
  
  <style>

      .meet-the-team {
        text-align: center;
      }
    
      .team-member {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-content: center;
        gap: 20px;
        }
        
        .team-photo {
          width: 30%;
          height: 30%;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
        .team-info {
          max-width: 300px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-content: center;
      }
    

    
      @media (min-width: 768px) {
        .team-member {
          flex-direction: row;
          align-items: flex-start;
        }
    
        .team-photo {
          width: 200px;
          height: 200px;
        }
      }


    



      
</style>
  