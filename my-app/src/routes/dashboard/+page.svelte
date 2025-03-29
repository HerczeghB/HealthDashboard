<script>
    import HealthCard from "$lib/components/HealthCard.svelte";
    import ActivityHistory from "$lib/components/ActivityHistory.svelte";
    import NutritionTracker from "$lib/components/NutritionTracker.svelte";

    const today = new Date().toDateString();

</script>

<div class="welcome-bar">
    <h2>Welcome to Your Health Dashboard</h2>
    <p>Today: {today}</p>
</div>

<div class="dashboard-grid">
    <!-- Health summary cards -->
    <HealthCard title="Weight Tracking" value="70.5" unit="kg" icon="⚖️" />
    <HealthCard title="Step Count" value="8,745" unit="steps" icon="👣" />
    <HealthCard title="Sleep Quality" value="7.5" unit="hours" icon="😴" />
    <HealthCard title="Water Intake" value="1.5" unit="liters" icon="💧" />

    <!-- Activity History -->
    <div class="dashboard-card wide">
        <ActivityHistory />
    </div>

    <!-- Nutrition Summary -->
    <div class="dashboard-card tall">
        <NutritionTracker />
    </div>

    <!-- Mood Tracker -->
    <HealthCard title="Mood Tracker" value="Good" icon="😊" />

    <!-- Upcoming Events -->
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