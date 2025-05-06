<script lang="ts">
    export let icon: string = "💧";
    export let currentIntake: number;
    export let goal: number;
    $: progressPercent = Math.min((currentIntake / goal) * 100, 100);
</script>
<div class="water-card">
    <div class="icon">{icon}</div>
    <div class="info">
        <h3>Water Intake</h3>
        <p>{currentIntake} / {goal} liter</p>
        {#if Number(currentIntake) >= Number(goal)}
            <div class="completed">
                Goal reached!
            </div>
        {/if}
        <div class="progress-container">
            <div class="progress-fill" style="height: {progressPercent}%;"></div>
        </div>
    </div>
</div>

<style lang="scss">
  $primary-dark: #151E3F;
  $secondary-accent: #679289;
  $card-bg-color: #FFFFFF;
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $shadow-md: 0 8px 15px rgba(3, 0, 39, 0.1);
  $transition-speed: 0.2s;

  .water-card {
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

    .icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    .info {
      flex: 1;
    }

    .progress-container {
      margin-top: 0.75rem;
      width: 20px;
      height: 100px;
      border-radius: 10px;
      background-color: rgba($secondary-accent, 0.2);
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: flex-end;
    }

    .progress-fill {
      width: 100%;
      background-color: $secondary-accent;
      transition: height 0.3s ease;
    }

    .completed {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: darkgreen;
    }
  }
</style>