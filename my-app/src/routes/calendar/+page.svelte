<script>
    import { fly } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
    import { quintOut } from 'svelte/easing';

    let currentDate = new Date();
    let displayDate = new Date(currentDate); // For smooth month name transition
    let calendarDays = [];
    let direction = 'left';
    let showCalendar = true;

    const updateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayIndex = firstDay.getDay();
        const lastDayDate = lastDay.getDate();

        calendarDays = [];

        for (let i = 0; i < firstDayIndex; i++) {
            calendarDays.push(null);
        }
        for (let i = 1; i <= lastDayDate; i++) {
            calendarDays.push(i);
        }
    };

    const prevMonth = () => {
        direction = 'right';
        showCalendar = false;
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            displayDate = new Date(currentDate); // update label
            updateCalendar();
            showCalendar = true;
        }, 200);
    };

    const nextMonth = () => {
        direction = 'left';
        showCalendar = false;
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            displayDate = new Date(currentDate); // update label
            updateCalendar();
            showCalendar = true;
        }, 200);
    };

    $: updateCalendar();
</script>

<div class="calendar-container">
    <div class="calendar-header">
        <button class="nav-button" on:click={prevMonth}>‹</button>
        <h2>{displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button class="nav-button" on:click={nextMonth}>›</button>
    </div>

    <div class="calendar-grid-header">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
            <div class="calendar-header-day">{day}</div>
        {/each}
    </div>

    <div class="calendar-animation-container">
        {#if showCalendar}
            <div class="calendar-grid" transition:fly={{ x: direction === 'left' ? 300 : -300, duration: 250 }}>
                {#each calendarDays as day}
                    <div class="calendar-day">
                        {#if day}
                            <div class="day-number">{day}</div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
  $primary-dark: #151E3F;
  $primary-accent: #1D7874;
  $text-muted: rgba($primary-dark, 0.6);
  $card-bg-color: #ffffff;
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $shadow-md: 0 8px 15px rgba(3, 0, 39, 0.1);
  $transition-speed: 0.2s;

  .calendar-container {
    position: relative;
    overflow: hidden; /* Containing the animation */
    background-color: transparent;
    padding: 1rem;
    border-radius: $border-radius;
  }

  .calendar-animation-container {
    position: relative;
    width: 100%;
    overflow: hidden; /* Additional overflow control */
    min-height: 350px; /* Ensure consistent height during animation */
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    z-index: 2;
    position: relative;

    h2 {
      color: $primary-dark;
      font-size: 1.5rem;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .nav-button {
      background: $primary-accent;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      transition: background-color 0.2s ease;

      &:hover {
        background: darken($primary-accent, 10%);
      }
    }
  }

  .calendar-grid-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.5rem;
    z-index: 2;
    position: relative;
  }

  .calendar-header-day {
    text-align: center;
    color: $text-muted;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .calendar-day {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-speed ease;

    .day-number {
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary-dark;
    }

    &:hover {
      box-shadow: $shadow-md;
      transform: scale(1.03);
    }
  }

  @media (max-width: 768px) {
    .calendar-grid {
      grid-template-columns: repeat(7, 1fr);
    }

    .calendar-day {
      height: 60px;
    }

    .calendar-animation-container {
      min-height: 250px;
    }
  }
</style>