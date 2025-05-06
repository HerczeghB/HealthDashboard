<script lang="ts">
    export let title = "Upcoming Events";
</script>

<div class="events-card">
    <div class="info">
        <h3>{title}</h3>
        <ul class="event-list">
            <li>Morning Run - 7:00 AM</li>
            <li>Doctor's Appointment - 2:30 PM</li>
        </ul>
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

  .events-card {
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

    .info {
      flex: 1;
    }

    .event-list {
      padding-left: 1.2rem;
      margin: 1rem 0 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
