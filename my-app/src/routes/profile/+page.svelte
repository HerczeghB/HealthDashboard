<script>
    import { onMount} from "svelte";

    let userProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        birthdate: '1990-05-15',
        gender: 'Male',
        height: 180,
        targetWeight: 68,
        dailyStepGoal: 10000,
        targetWaterIntake: 3,
        sleepGoal: 8
    };

    let dashboardPreferences = {
        showWeight: true,
        showSteps: true,
        showSleep: true,
        showWater: true,
        showActivity: true,
        showNutrition: true,
        showMood: true,
        showEvents: true
    };

    onMount(async () => {
        const res = await fetch("/api/user-data");
        if (res.ok) {
            const userData = await res.json();
            userProfile = userData.profile;
            dashboardPreferences = userData.dashboardPreferences;
            // If needed, you can also extract healthGoals separately
            userProfile = { ...userProfile, ...userData.healthGoals };
        }
    });

    // Active section state
    let activeSection = 'personal';

    // Function to switch active section
    function setActiveSection(section) {
        activeSection = section;
    }

    async function saveAllUserData() {
        const payload = {
            userId: 'user123',
            profile: {
                name: userProfile.name,
                email: userProfile.email,
                birthdate: userProfile.birthdate,
                gender: userProfile.gender
            },
            healthGoals: {
                height: userProfile.height,
                targetWeight: userProfile.targetWeight,
                dailyStepGoal: userProfile.dailyStepGoal,
                targetWaterIntake: userProfile.targetWaterIntake,
                sleepGoal: userProfile.sleepGoal
            },
            dashboardPreferences
        };

        const res = await fetch("/api/user-data", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('All data saved successfully');
        } else {
            alert('Failed to save data');
        }
    }
</script>


<div class="profile-container">
    <div class="profile-header">
        <h2>Profile & Settings</h2>
        <p>Manage your account information and preferences</p>
    </div>

    <div class="profile-navigation">
        <button
                class={activeSection === 'personal' ? 'profile-tab active' : 'profile-tab'}
                on:click={() => setActiveSection('personal')}
        >
            Personal Info
        </button>
        <button
                class={activeSection === 'health' ? 'profile-tab active' : 'profile-tab'}
                on:click={() => setActiveSection('health')}
        >
            Health Goals
        </button>
        <button
                class={activeSection === 'dashboard' ? 'profile-tab active' : 'profile-tab'}
                on:click={() => setActiveSection('dashboard')}
        >
            Dashboard Preferences
        </button>
    </div>

    <div class="profile-content">
        <!-- Personal Information -->
        {#if activeSection === 'personal'}
            <div class="profile-section">
                <h3>Personal Information</h3>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" bind:value={userProfile.name} />
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" bind:value={userProfile.email} />
                </div>

                <div class="form-group">
                    <label for="birthdate">Date of Birth</label>
                    <input type="date" id="birthdate" bind:value={userProfile.birthdate} />
                </div>

                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" bind:value={userProfile.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>

                <div class="form-actions">
                    <button class="primary-button" on:click={saveAllUserData}>Save Changes</button>
                </div>
            </div>
        {/if}

        <!-- Health Goals -->
        {#if activeSection === 'health'}
            <div class="profile-section">
                <h3>Health Goals & Metrics</h3>

                <div class="form-group">
                    <label for="height">Height (cm)</label>
                    <input type="number" id="height" bind:value={userProfile.height} min="0" max="300" />
                </div>

                <div class="form-group">
                    <label for="targetWeight">Target Weight (kg)</label>
                    <input type="number" id="targetWeight" bind:value={userProfile.targetWeight} min="0" max="300" />
                </div>

                <div class="form-group">
                    <label for="stepGoal">Daily Step Goal</label>
                    <input type="number" id="stepGoal" bind:value={userProfile.dailyStepGoal} min="0" max="100000" step="500" />
                </div>

                <div class="form-group">
                    <label for="targetWaterIntake">Target Water Intake</label>
                    <input type="number" id="stepGoal" bind:value={userProfile.targetWaterIntake} min="0" max="5" step="0.5" />
                </div>

                <div class="form-group">
                    <label for="sleepGoal">Sleep Goal (hours)</label>
                    <input type="number" id="sleepGoal" bind:value={userProfile.sleepGoal} min="0" max="24" step="0.5" />
                </div>

                <div class="form-actions">
                    <button class="primary-button" on:click={saveAllUserData}>Save Health Goals</button>
                </div>
            </div>
        {/if}

        <!-- Dashboard Preferences -->
        {#if activeSection === 'dashboard'}
            <div class="profile-section">
                <h3>Dashboard Preferences</h3>
                <p class="section-description">Choose which metrics to display on your dashboard</p>

                <div class="preferences-grid">
                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showWeight} />
                            <span>Weight Tracking</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showSteps} />
                            <span>Step Count</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showSleep} />
                            <span>Sleep Quality</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showWater} />
                            <span>Water Intake</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showActivity} />
                            <span>Activity History</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showNutrition} />
                            <span>Nutrition Summary</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showMood} />
                            <span>Mood Tracker</span>
                        </label>
                    </div>

                    <div class="preference-item">
                        <label class="checkbox-label">
                            <input type="checkbox" bind:checked={dashboardPreferences.showEvents} />
                            <span>Upcoming Events</span>
                        </label>
                    </div>
                </div>

                <div class="form-actions">
                    <button class="primary-button" on:click={saveAllUserData}>Save Preferences</button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
  @use 'sass:color';
  /* Custom Color Palette */
  $primary-dark: #151E3F;    // Dark blue - primary background
  $primary-accent: #1D7874;  // Teal - highlights and buttons
  $secondary-accent: #679289; // Sage green - secondary elements
  $light-accent: #F2F3D9;    // Light cream - text on dark backgrounds
  $text-on-light: #151E3F;   // Text on light backgrounds
  $text-muted: rgba($text-on-light, 0.6);
  $card-bg-color: #FFFFFF;
  $border-radius: 12px;
  $shadow-sm: 0 4px 6px rgba(3, 0, 39, 0.05);
  $input-border: #E5E7EB;

  .profile-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-header {
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

  .profile-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .profile-tab {
      padding: 0.8rem 1.2rem;
      background-color: $card-bg-color;
      border: 1px solid $input-border;
      border-radius: $border-radius;
      font-size: 0.9rem;
      font-weight: 500;
      color: $text-muted;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #F9FAFB;
        border-color: #D1D5DB;
        color: $primary-dark;
      }

      &.active {
        background-color: $primary-accent;
        color: $light-accent;
        border-color: $primary-accent;
      }
    }
  }

  .profile-content {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    overflow: hidden;
  }

  .profile-section {
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      color: $primary-dark;
    }

    .section-description {
      margin-top: -1rem;
      margin-bottom: 1.5rem;
      color: $text-muted;
      font-size: 0.9rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: $text-on-light;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid $input-border;
      border-radius: $border-radius;
      font-size: 1rem;
      color: $text-on-light;
      background-color: #FCFCFC;

      &:focus {
        outline: none;
        border-color: $primary-accent;
        box-shadow: 0 0 0 2px rgba($primary-accent, 0.1);
      }
    }
  }

  .preferences-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .preference-item {
    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;

      input[type="checkbox"] {
        width: auto;
        margin-right: 0.75rem;
        cursor: pointer;
      }

      span {
        font-size: 0.95rem;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid $input-border;

    .primary-button {
      padding: 0.75rem 1.5rem;
      background-color: $primary-accent;
      color: $light-accent;
      border: none;
      border-radius: $border-radius;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: color.adjust($primary-accent, $lightness: -5%);
      }
    }
  }

  @media (max-width: 768px) {
    .profile-navigation {
      flex-direction: column;

      .profile-tab {
        width: 100%;
      }
    }

    .preferences-grid {
      grid-template-columns: 1fr;
    }
  }
</style>