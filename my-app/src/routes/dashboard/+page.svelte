<script lang="ts">
    import HealthCard from "$lib/components/HealthCard.svelte";
    import NutritionTracker from "$lib/components/NutritionTracker.svelte";
    import WaterCard from "$lib/components/WaterCard.svelte";
    import EventsCard from "$lib/components/EventsCard.svelte";
    import { onMount } from "svelte";
    import Chart from "$lib/components/Chart.svelte";

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
    let healthGoals = {
        height: 0,
        targetWeight: 0,
        dailyStepGoal: 0,
        targetWaterIntake: 0,
        sleepGoal: 0
    };
    let currentMetrics = {
        weight: [],
        steps: [],
        water: [],
        sleep: [],
        mood: []
    };

    $: unitSteps = getLatestValue(currentMetrics.steps) === 1 ? 'step' : 'steps';
    $: unitSleep = getLatestValue(currentMetrics.sleep) === 1 ? 'hour' : 'hours';
    $: unitWeight = 'kg';


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
            healthGoals = userData.healthGoals || {};
        }
        const res2 = await fetch("/api/new-data");
        if (res2.ok){
            currentMetrics = await res2.json();
        }
    })

    const today = new Date().toDateString();
    let activityMetric = "steps";


</script>

<div class="welcome-bar">
    <h2>Your Health Dashboard</h2>
    <p>Today: {today}</p>
</div>

<div class="dashboard-grid">

    {#if dashboardPreferences.showWeight}
        <HealthCard title="Weight Tracking" value={getLatestValue(currentMetrics.weight)} unit={unitWeight} icon="⚖️" goal={healthGoals.targetWeight} goalDirection="below" />
    {/if}

    {#if dashboardPreferences.showSteps}
        <HealthCard title="Step Count" value={getLatestValue(currentMetrics.steps)} unit={unitSteps} icon="👣" goal={healthGoals.dailyStepGoal} goalDirection="above"/>
    {/if}

    {#if dashboardPreferences.showSleep}
        <HealthCard title="Sleep Quality" value={getLatestValue(currentMetrics.sleep)} unit={unitSleep} icon="😴" goal={healthGoals.sleepGoal} goalDirection="above" />
    {/if}

    {#if dashboardPreferences.showMood}
        <HealthCard title="Mood Tracker" value={getLatestValue(currentMetrics.mood)} icon="😀😐😕" goal="" goalDirection="" />
    {/if}

    {#if dashboardPreferences.showWater}
        <WaterCard currentIntake={getLatestValue(currentMetrics.water)} goal= {healthGoals.targetWaterIntake} />
    {/if}

    {#if dashboardPreferences.showEvents}
        <EventsCard />
    {/if}

    {#if dashboardPreferences.showActivity}

        <div class="dashboard-card wide">
            <div class="metric-buttons">
                <button on:click={() => activityMetric = 'steps'}>Steps</button>
                <button on:click={() => activityMetric = 'weight'}>Weight</button>
                <button on:click={() => activityMetric = 'sleep'}>Sleep</button>
                <button on:click={() => activityMetric = 'mood'}>Mood</button>
                <button on:click={() => activityMetric = 'water'}>Water</button>
            </div>
            <Chart
                    metric={activityMetric}
                    data={currentMetrics[activityMetric] || []}
                    title="Activity History"
            />
        </div>
    {/if}



    {#if dashboardPreferences.showNutrition}
        <div class="dashboard-card wide">
            <NutritionTracker />
        </div>
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
      grid-column: span 3;
      display: block;
    }

  }
  .metric-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    button {
      background-color: $primary-accent;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: darken($primary-accent, 10%);
      }
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