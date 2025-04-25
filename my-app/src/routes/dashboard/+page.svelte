<script>
    import HealthCard from "$lib/components/HealthCard.svelte";
    import ActivityHistory from "$lib/components/ActivityHistory.svelte";
    import NutritionTracker from "$lib/components/NutritionTracker.svelte";
    import WaterCard from "$lib/components/WaterCard.svelte";
    import EventsCard from "$lib/components/EventsCard.svelte";
    import { onMount } from "svelte";

    let dashboardPreferences = {
        showWeight: true,
        showSteps: true,
        showSleep: true,
        showWater: true,
        showActivity: true,
        showNutrition: true,
        showMood: true,
        showEvents: true,
    }
    let healthGoals = {};
    let currentMetrics = {
        weight: [],
        steps: [],
        water: [],
        sleep: [],
        mood: []
    };


    const getLatestValue = (metric) => {
        if (metric && metric.length > 0) {
            return metric[metric.length - 1].value;
        }
        return 'N/A';
    };

    onMount(async () => {
        const res = await fetch("/api/user-data");
        if (res.ok){
            const userData = await res.json();
            dashboardPreferences = userData.dashboardPreferences || dashboardPreferences;
            healthGoals = userData.healthGoals || [];
            console.log(healthGoals);
        }
        const res2 = await fetch("/api/new-data");
        if (res2.ok){
            currentMetrics = await res2.json();
        }
    })

    const today = new Date().toDateString();


</script>

<div class="welcome-bar">
    <h2>Welcome to Your Health Dashboard</h2>
    <p>Today: {today}</p>
</div>

<div class="dashboard-grid">

    {#if dashboardPreferences.showWeight}
        <HealthCard title="Weight Tracking" value={getLatestValue(currentMetrics.weight)} unit="kg" icon="⚖️" />
    {/if}

    {#if dashboardPreferences.showSteps}
        <HealthCard title="Step Count" value={getLatestValue(currentMetrics.steps)} unit="steps" icon="👣" />
    {/if}

    {#if dashboardPreferences.showSleep}
        <HealthCard title="Sleep Quality" value={getLatestValue(currentMetrics.sleep)} unit="hours" icon="😴" />
    {/if}

    {#if dashboardPreferences.showWater}
        <WaterCard currentIntake={getLatestValue(currentMetrics.water)}/>
    {/if}

    {#if dashboardPreferences.showActivity}
        <div class="dashboard-card wide">
            <ActivityHistory />
        </div>
    {/if}

    {#if dashboardPreferences.showNutrition}
        <div class="dashboard-card tall">
            <NutritionTracker />
        </div>
    {/if}

    {#if dashboardPreferences.showMood}
        <HealthCard title="Mood Tracker" value={getLatestValue(currentMetrics.mood)} icon="😀😐😕" />
    {/if}

    {#if dashboardPreferences.showEvents}
        <EventsCard />
    {/if}
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

    &.wide {
      grid-column: span 2;
      display: block;
    }

    &.tall {
      grid-row: span 2;
      display: block;
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