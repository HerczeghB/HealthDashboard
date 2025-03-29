<script>
    export let title = "Health Metric";
    export let value = "--";
    export let unit = "";
    export let icon = "💪"; // Default icon (can be replaced)
</script>

<div class="health-card">
    <div class="icon">{icon}</div>
    <div class="info">
        <h3>{title}</h3>
        <p>{value} {unit}</p>
    </div>
</div>

<style lang="scss">
  /* Reuse styles directly inside HealthCard */
  $primary-dark: #151E3F;
  $secondary-accent: #679289;
  $card-bg-color: #FFFFFF;
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $shadow-md: 0 8px 15px rgba(3, 0, 39, 0.1);
  $transition-speed: 0.2s;

  .health-card {
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
  }
</style>
