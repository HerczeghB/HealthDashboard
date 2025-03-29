<script>
    import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="app-layout">
    <header class="app-header">
        <div class="header-content">
            <h1>Health Dashboard</h1>
            <div class="user-controls">
                <div class="profile-icon">👤</div>
            </div>
        </div>
    </header>

    <main class="app-content">
        <aside class="sidebar">
            <Navbar />
        </aside>

        <section class="main-content">
            <slot />
        </section>
    </main>
</div>

<style lang="scss">
  /* Custom Color Palette */
  $primary-dark: #151E3F;    // Dark blue - primary background
  $secondary-dark: #030027;  // Very dark blue - accents
  $light-accent: #F2F3D9;    // Light cream - text on dark backgrounds
  $text-on-light: #151E3F;   // Text on light backgrounds
  $text-muted: rgba($text-on-light, 0.6);
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $breakpoint-tablet: 768px;

  /* Main layout */
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #F7F8FC;
    color: $text-on-light;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  .app-header {
    background-color: $primary-dark;
    box-shadow: $shadow-sm;
    position: sticky;
    top: 0;
    z-index: 10;

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        color: $light-accent;
        font-weight: 500;
        font-size: 1.5rem;
        margin: 0;
      }
    }
  }

  .app-content {
    display: flex;
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  /* Sidebar */
  .sidebar {
    width: 220px;
    background-color: $primary-dark;
    padding: 2rem 0;
    border-right: 1px solid rgba($light-accent, 0.1);
  }

  /* Main content area */
  .main-content {
    flex: 1;
    padding: 2rem;
    background-color: #F7F8FC;
  }

  /* User controls */
  .user-controls {
    display: flex;
    align-items: center;

    .profile-icon {
      width: 35px;
      height: 35px;
      background-color: #1D7874;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: $light-accent;
      font-size: 1.1rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }

  /* Responsive adjustments */
  @media (max-width: $breakpoint-tablet) {
    .app-content {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid rgba($light-accent, 0.1);
      padding: 0.5rem 0;
    }
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>