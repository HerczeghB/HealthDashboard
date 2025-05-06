<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // Current date tracking
    let today = new Date();
    let currentDate = new Date();
    let displayDate = new Date(currentDate);
    let calendarDays = [];
    let direction = 'left';
    let showCalendar = true;

    // Initialize the calendar on component mount
    const updateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day and last day of the month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayIndex = firstDay.getDay();
        const lastDayDate = lastDay.getDate();

        // Calculate days from previous month to show
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        calendarDays = [];

        // Add days from previous month
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            calendarDays.push({
                day: prevMonthLastDay - i,
                currentMonth: false,
                isPast: true
            });
        }

        // Add days of current month
        for (let i = 1; i <= lastDayDate; i++) {
            const date = new Date(year, month, i);
            calendarDays.push({
                day: i,
                currentMonth: true,
                isToday: date.toDateString() === today.toDateString(),
                date: date
            });
        }

        // Add days from next month to fill grid
        // Show either 5 or 6 weeks depending on the month layout
        const gridSize = calendarDays.length > 35 ? 42 : 35;
        const remainingDays = gridSize - calendarDays.length;
        for (let i = 1; i <= remainingDays; i++) {
            calendarDays.push({
                day: i,
                currentMonth: false,
                isPast: false
            });
        }
    };

    const prevMonth = () => {
        direction = 'right';
        showCalendar = false;
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            currentDate = new Date(currentDate); // Create new date object to trigger reactivity
            displayDate = new Date(currentDate);
            updateCalendar();
            showCalendar = true;
        }, 200);
    };

    const nextMonth = () => {
        direction = 'left';
        showCalendar = false;
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate = new Date(currentDate); // Create new date object to trigger reactivity
            displayDate = new Date(currentDate);
            updateCalendar();
            showCalendar = true;
        }, 200);
    };

    // Go to current month
    const goToToday = () => {
        direction = currentDate < today ? 'left' : 'right';
        showCalendar = false;
        setTimeout(() => {
            currentDate = new Date();
            displayDate = new Date(currentDate);
            updateCalendar();
            showCalendar = true;
        }, 200);
    };

    // Initialize calendar
    $: {
        // This will run whenever currentDate changes
        updateCalendar();
    }
</script>

<div class="calendar-container">
    <div class="calendar-header">
        <button class="nav-button" on:click={prevMonth}>‹</button>
        <div class="header-content">
            <h2>{displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button class="today-button" on:click={goToToday}>Today</button>
        </div>
        <button class="nav-button" on:click={nextMonth}>›</button>
    </div>

    <div class="calendar-grid-header">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
            <div class="calendar-header-day">{day}</div>
        {/each}
    </div>

    <div class="calendar-animation-container">
        {#if showCalendar}
            <div class="calendar-grid" in:fly={{ x: direction === 'left' ? 300 : -300, duration: 250, easing: quintOut }}>
                {#each calendarDays as { day, currentMonth, isToday }}
                    <div class="calendar-day" class:current-month={currentMonth} class:today={isToday}>
                        <div class="day-number">{day}</div>
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
  $today-highlight: #1D7874;

  .calendar-container {
    position: relative;
    overflow: visible; /* Changed from hidden to prevent cutoff */
    background-color: transparent;
    padding: 1rem;
    border-radius: $border-radius;
    max-width: 800px;
    margin: 0 auto;
  }

  .calendar-animation-container {
    position: relative;
    width: 100%;
    overflow: visible; /* Changed from hidden to allow content to show fully */
    height: auto; /* Dynamic height based on content */
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    z-index: 2;
    position: relative;

    .header-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    h2 {
      color: $primary-dark;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
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

    .today-button {
      background: transparent;
      color: $primary-accent;
      border: 1px solid $primary-accent;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      &:hover {
        background: rgba($primary-accent, 0.1);
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
    padding: 0.5rem 0;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    position: relative; /* Changed from absolute to prevent cutoff */
    width: 100%;
    z-index: 1;
  }

  .calendar-day {
    background-color: rgba($card-bg-color, 0.6);
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-speed ease;
    position: relative;

    &.current-month {
      background-color: $card-bg-color;
    }

    &:not(.current-month) {
      .day-number {
        opacity: 0.3;
      }
    }

    &.today {
      border: 2px solid $today-highlight;

      .day-number {
        color: $today-highlight;
        font-weight: 700;
      }
    }

    .day-number {
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary-dark;
    }

    &:hover {
      box-shadow: $shadow-md;
      transform: scale(1.03);
      z-index: 5;
    }
  }

  @media (max-width: 768px) {
    .calendar-animation-container {
      min-height: 300px;
    }

    .calendar-grid {
      gap: 0.25rem;
    }

    .calendar-day {
      aspect-ratio: auto; /* Remove fixed aspect ratio on mobile */
      height: 40px;

      .day-number {
        font-size: 0.9rem;
      }
    }
  }
</style>