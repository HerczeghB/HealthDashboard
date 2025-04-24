<script>
    import { page } from '$app/stores';

    // Determine active route
    $: currentPath = $page.url.pathname;
</script>

<nav class="main-nav">
    <ul>
        <li class={currentPath === '/dashboard' ? 'nav-item active' : 'nav-item'}>
            <a href="/dashboard">Dashboard</a>
        </li>
        <li class={currentPath === '/metrics' ? 'nav-item active' : 'nav-item'}>
            <a href="/metrics">Health Metrics</a>
        </li>
        <li class={currentPath === '/profile' ? 'nav-item active' : 'nav-item'}>
            <a href="/profile">Profile</a>
        </li>
        <li class={currentPath === '/calendar' ? 'nav-item active' : 'nav-item'}>
            <a href="/calendar">Calendar</a>
        </li>
    </ul>
</nav>

<style lang="scss">
  /* Custom Color Palette */
  $primary-dark: #151E3F;    // Dark blue - primary background
  $light-accent: #F2F3D9;    // Light cream - text on dark backgrounds
  $primary-accent: #1D7874;  // Teal - highlights and buttons
  $transition-speed: 0.2s;
  $breakpoint-tablet: 768px;

  .main-nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 0.5rem;

      a {
        display: block;
        padding: 0.85rem 1.5rem;
        color: rgba($light-accent, 0.7);
        text-decoration: none;
        border-left: 3px solid transparent;
        transition: all $transition-speed ease;
        font-size: 0.95rem;

        &:hover {
          background-color: rgba($light-accent, 0.05);
          color: $light-accent;
        }
      }

      &.active a {
        border-left-color: $primary-accent;
        color: $light-accent;
        background-color: rgba($light-accent, 0.05);
        font-weight: 500;
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: $breakpoint-tablet) {
    .main-nav ul {
      display: flex;
      overflow-x: auto;
      padding: 0 1rem;
    }

    .nav-item {
      margin-bottom: 0;
      margin-right: 0.5rem;

      a {
        border-left: none;
        border-bottom: 3px solid transparent;
        padding: 0.75rem 1rem;
      }

      &.active a {
        border-left-color: transparent;
        border-bottom-color: $primary-accent;
      }
    }
  }
</style>