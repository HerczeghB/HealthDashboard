<script lang="ts">
    // Format date to a more readable format
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
</script>

<div class="welcome-container">
    <div class="welcome-card">
        <div class="welcome-header">
            <div class="welcome-text">
                <h1>Welcome to Your Health Dashboard</h1>
                <p class="date">Today is {formattedDate}</p>
                <p class="intro">Track your health metrics, set goals, and make positive changes to your daily routine.</p>
            </div>

            <div class="welcome-image">
                <div class="image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
            </div>
        </div>

        <div class="features">
            <div class="feature">
                <div class="feature-icon">⚖️</div>
                <h3>Track Weight</h3>
                <p>Monitor your progress over time</p>
            </div>
            <div class="feature">
                <div class="feature-icon">👣</div>
                <h3>Count Steps</h3>
                <p>Stay active throughout the day</p>
            </div>
            <div class="feature">
                <div class="feature-icon">💧</div>
                <h3>Water Intake</h3>
                <p>Stay hydrated for better health</p>
            </div>
            <div class="feature">
                <div class="feature-icon">😴</div>
                <h3>Sleep Quality</h3>
                <p>Improve your rest patterns</p>
            </div>
        </div>

        <div class="account-section">
            <div class="account-text">
                <h2>Ready to begin your health journey?</h2>
                <p>Sign in to access your personalized dashboard and start tracking today.</p>
            </div>
            <div class="account-actions">
                <button class="button login-button">Log In</button>
                <button class="button signup-button">Create Account</button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
  /* Custom Color Palette */
  $primary-dark: #151E3F;    // Dark blue - primary background
  $primary-accent: #1D7874;  // Teal - highlights and buttons
  $secondary-accent: #679289; // Sage green - secondary elements
  $light-accent: #F2F3D9;    // Light cream - text on light backgrounds
  $background-color: #F5F7FA; // Light background
  $card-bg-color: #FFFFFF;
  $text-on-light: #151E3F;   // Text on light backgrounds
  $text-muted: rgba($text-on-light, 0.6);
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $shadow-md: 0 8px 24px rgba(3, 0, 39, 0.1);

  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: $background-color;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .welcome-card {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow-md;
    width: 100%;
    max-width: 1000px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem;
  }

  .welcome-header {
    display: flex;
    align-items: center;
    gap: 2rem;

    .welcome-text {
      flex: 1;

      h1 {
        font-size: 2rem;
        color: $primary-dark;
        margin: 0 0 1rem 0;
        line-height: 1.2;
      }

      .date {
        font-size: 1rem;
        color: $primary-accent;
        font-weight: 500;
        margin: 0 0 1rem 0;
      }

      .intro {
        font-size: 1.1rem;
        color: $text-muted;
        margin: 0;
        line-height: 1.5;
      }
    }

    .welcome-image {
      flex: 0 0 30%;

      .image-placeholder {
        width: 100%;
        aspect-ratio: 1;
        background-color: rgba($primary-accent, 0.1);
        border-radius: $border-radius;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $primary-accent;

        svg {
          width: 60%;
          height: 60%;
        }
      }
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1rem 0;

    .feature {
      background-color: rgba($light-accent, 0.5);
      border-radius: $border-radius;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-sm;
      }

      .feature-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      h3 {
        margin: 0.5rem 0;
        color: $primary-dark;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: $text-muted;
        font-size: 0.9rem;
      }
    }
  }

  .account-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba($primary-dark, 0.05);
    padding: 2rem;
    border-radius: $border-radius;
    margin-top: 1rem;

    .account-text {
      flex: 1;

      h2 {
        margin: 0 0 0.5rem 0;
        color: $primary-dark;
        font-size: 1.4rem;
      }

      p {
        margin: 0;
        color: $text-muted;
        font-size: 1rem;
      }
    }

    .account-actions {
      display: flex;
      gap: 1rem;
    }
  }

  .button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: $border-radius;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;
  }

  .login-button {
    background-color: $primary-accent;
    color: $light-accent;

    &:hover {
      background-color: darken($primary-accent, 10%);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .signup-button {
    background-color: transparent;
    color: $primary-accent;
    border: 1px solid $primary-accent;

    &:hover {
      background-color: rgba($primary-accent, 0.1);
      transform: translateY(-2px);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .welcome-header {
      flex-direction: column;
      text-align: center;

      .welcome-image {
        width: 60%;
      }
    }

    .account-section {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
  }
</style>