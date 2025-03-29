<script>
    const today = new Date().toDateString();
</script>

<div class="welcome-bar">
    <h2>Welcome to Your Health Dashboard</h2>
    <p>Today: {today}</p>
</div>

<div class="dashboard-grid">
    <!-- Health summary cards -->
    <div class="dashboard-card">
        <div class="card-icon">⚖️</div>
        <div class="card-content">
            <h3>Weight Tracking</h3>
            <p>70.5 kg</p>
        </div>
    </div>
    <div class="dashboard-card">
        <div class="card-icon">👣</div>
        <div class="card-content">
            <h3>Step Count</h3>
            <p>8,745 steps</p>
        </div>
    </div>
    <div class="dashboard-card">
        <div class="card-icon">😴</div>
        <div class="card-content">
            <h3>Sleep Quality</h3>
            <p>7.5 hours</p>
        </div>
    </div>
    <div class="dashboard-card">
        <div class="card-icon">💧</div>
        <div class="card-content">
            <h3>Water Intake</h3>
            <p>1.5 liters</p>
        </div>
    </div>

    <!-- Charts and detailed widgets -->
    <div class="dashboard-card wide">
        <h3>Activity History</h3>
        <div class="placeholder-chart"></div>
    </div>
    <div class="dashboard-card tall">
        <h3>Nutrition Summary</h3>
        <div class="placeholder-chart tall"></div>
    </div>
    <div class="dashboard-card">
        <div class="card-icon">😊</div>
        <div class="card-content">
            <h3>Mood Tracker</h3>
            <p>Good</p>
        </div>
    </div>
    <div class="dashboard-card">
        <h3>Upcoming Events</h3>
        <ul class="event-list">
            <li>Morning Run - 7:00 AM</li>
            <li>Doctor's Appointment - 2:30 PM</li>
        </ul>
    </div>
</div>

<style lang="scss">
  /* Custom Color Palette */
  $primary-dark: #151E3F;    // Dark blue - primary background
  $secondary-accent: #679289; // Sage green - secondary elements
  $text-on-light: #151E3F;   // Text on light backgrounds
  $text-muted: rgba($text-on-light, 0.6);
  $card-bg-color: #FFFFFF;
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $shadow-md: 0 8px 15px rgba(3, 0, 39, 0.1);
  $transition-speed: 0.2s;
  $primary-accent: #1D7874;  // Teal - highlights and buttons

  .welcome-bar {
    margin-bottom: 2rem;

    h2 {
      margin: 0;
      font-weight: 600;
      color: $primary-dark;
      font-size: 1.6rem;
    }

    p {
      margin: 0.5rem 0 0;
      color: $text-muted;
      font-size: 0.9rem;
    }
  }

  /* Dashboard grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .dashboard-card {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    padding: 1.5rem;
    min-height: 120px;
    transition: all $transition-speed ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;

    &:hover {
      transform: translateY(-3px);
      box-shadow: $shadow-md;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 1.1rem;
      color: $primary-dark;
    }

    p {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
      color: $secondary-accent;
    }

    &.wide {
      grid-column: span 2;
      display: block;
    }

    &.tall {
      grid-row: span 2;
      display: block;
    }

    .card-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    .card-content {
      flex: 1;
    }

    .placeholder-chart {
      height: 140px;
      background: linear-gradient(135deg, rgba($primary-accent, 0.1) 0%, rgba($secondary-accent, 0.1) 100%);
      border-radius: $border-radius;
      margin-top: 1rem;

      &.tall {
        height: 280px;
      }
    }
  }

  .event-list {
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 0.5rem;
      color: $text-muted;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .dashboard-card {
      &.wide {
        grid-column: auto;
      }
    }
  }
</style>