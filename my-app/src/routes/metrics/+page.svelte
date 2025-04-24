<script>
    import { onMount } from "svelte";
    import NewData from "$lib/components/NewData.svelte";

    let activeMetric = 'weight';
    let modeNewData = 0; //0 - hidden, 1 - number value, 2 - string value(mood)

    let metrics = {
        weight: [],
        steps: [],
        water: [],
        sleep: [],
        mood: []
    };

    onMount(async () => {
        try {
            const res = await fetch('/api/new-data');
            if (res.ok) {
                metrics = await res.json();
            }
        } catch (err) {
            console.error('Failed to fetch metrics:', err);
        }
    });

    function setActiveMetric(metric) {
        activeMetric = metric;
    }

    function getLatestValue(dataArray, valueProperty = 'value') {
        if (dataArray && dataArray.length > 0) {
            return dataArray[dataArray.length - 1][valueProperty];
        }
        return 'N/A';
    }

    async function handleNewData(event) {
        const { metric, data } = event.detail;

        // Check if data is correctly formatted
        console.log("Data being sent:", { metric, data });

        const res = await fetch('/api/new-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                metric,
                data
            })
        });

        const result = await res.json();

        if (res.ok) {
            console.log('Data submitted successfully:', result);
        } else {
            console.error('Error submitting data:', result);
        }
        modeNewData = 0;
    }
</script>

<div class="metrics-container">
    <div class="metrics-header">
        <h2>Health Metrics</h2>
        <p>Track and manage your health data</p>
    </div>

    <div class="metrics-navigation">
        <button
                class={activeMetric === 'weight' ? 'metric-tab active' : 'metric-tab'}
                on:click={() => setActiveMetric('weight')}
        >
            ⚖️ Weight
        </button>
        <button
                class={activeMetric === 'steps' ? 'metric-tab active' : 'metric-tab'}
                on:click={() => setActiveMetric('steps')}
        >
            👣 Steps
        </button>
        <button
                class={activeMetric === 'sleep' ? 'metric-tab active' : 'metric-tab'}
                on:click={() => setActiveMetric('sleep')}
        >
            😴 Sleep
        </button>
        <button
                class={activeMetric === 'water' ? 'metric-tab active' : 'metric-tab'}
                on:click={() => setActiveMetric('water')}
        >
            💧 Water
        </button>
        <button
                class={activeMetric === 'mood' ? 'metric-tab active' : 'metric-tab'}
                on:click={() => setActiveMetric('mood')}
        >
            😀😐😕 Mood
        </button>
    </div>

    <div class="metrics-content">
        <!-- Weight Metric -->
        {#if activeMetric === 'weight'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(metrics.weight)} kg</span>
                        <span class="metric-label">Current Weight</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn" on:click={() => modeNewData = 1}>+ Add Weight Data</button>
                    </div>
                </div>

                <div class="metric-chart-container">
                    <h3>Weight Tracking</h3>
                    <div class="placeholder-chart"></div>
                </div>

                <div class="metric-history">
                    <h3>Recent Records</h3>
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each [...metrics.weight].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value} kg</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}

        <!-- Steps Metric -->
        {#if activeMetric === 'steps'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(metrics.steps).toLocaleString()}</span>
                        <span class="metric-label">Daily Steps</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn" on:click={() => modeNewData = 1}>+ Add Steps Data</button>
                    </div>
                </div>

                <div class="metric-chart-container">
                    <h3>Steps History</h3>
                    <div class="placeholder-chart"></div>
                </div>

                <div class="metric-history">
                    <h3>Recent Records</h3>
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Steps</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each [...metrics.steps].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}

        <!-- Sleep Metric -->
        {#if activeMetric === 'sleep'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(metrics.sleep)} hrs</span>
                        <span class="metric-label">Last Night's Sleep</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn" on:click={() => modeNewData = 1}>+ Add Sleep Data</button>
                    </div>
                </div>

                <div class="metric-chart-container">
                    <h3>Sleep Patterns</h3>
                    <div class="placeholder-chart"></div>
                </div>

                <div class="metric-history">
                    <h3>Recent Records</h3>
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Quality</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each [...metrics.sleep].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value} hrs</td>
                                <td></td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}

        <!-- Water Metric -->
        {#if activeMetric === 'water'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(metrics.water)} L</span>
                        <span class="metric-label">Today's Water Intake</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn" on:click={() => modeNewData = 1}>+ Add Water Data</button>
                    </div>
                </div>

                <div class="metric-chart-container">
                    <h3>Water Consumption</h3>
                    <div class="placeholder-chart"></div>
                </div>

                <div class="metric-history">
                    <h3>Recent Records</h3>
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount (L)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each [...metrics.water].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value} L</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}

        <!-- Mood Metric -->
        {#if activeMetric === 'mood'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(metrics.mood)}</span>
                        <span class="metric-label">Current Mood</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn" on:click={() => modeNewData = 2}>+ Select Your Current Mood</button>
                    </div>
                </div>

                <div class="metric-chart-container">
                    <h3>Mood Tracking</h3>
                    <div class="placeholder-chart"></div>
                </div>

                <div class="metric-history">
                    <h3>Recent Records</h3>
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Mood</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each [...metrics.mood].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
</div>

<NewData
    metric={activeMetric}
    mode={modeNewData}
    on:submit={handleNewData}
    on:close = {() => modeNewData = 0}
/>

<style lang="scss">
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

  .metrics-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .metrics-header {
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

  .metrics-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .metric-tab {
      padding: 0.8rem 1.2rem;
      background-color: $card-bg-color;
      border: 1px solid #E5E7EB;
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

  .metrics-content {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    overflow: hidden;
  }

  .metric-detail-panel {
    padding: 1.5rem;
  }

  .metric-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .metric-current {
      display: flex;
      flex-direction: column;

      .metric-value {
        font-size: 2.5rem;
        font-weight: 600;
        color: $primary-accent;
      }

      .metric-label {
        font-size: 0.9rem;
        color: $text-muted;
      }
    }

    .metric-actions {
      .add-data-btn {
        padding: 0.7rem 1.2rem;
        background-color: $primary-accent;
        color: $light-accent;
        border: none;
        border-radius: $border-radius;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken($primary-accent, 5%);
        }
      }
    }
  }

  .metric-chart-container {
    margin-bottom: 2rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: $primary-dark;
    }

    .placeholder-chart {
      height: 250px;
      background: linear-gradient(135deg, rgba($primary-accent, 0.1) 0%, rgba($secondary-accent, 0.1) 100%);
      border-radius: $border-radius;
    }
  }

  .metric-history {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: $primary-dark;
    }
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #E5E7EB;
    }

    th {
      font-weight: 600;
      color: $primary-dark;
      background-color: #F9FAFB;
    }

    td {
      color: $text-on-light;
    }

    tbody tr:hover {
      background-color: #F9FAFB;
    }
  }

  @media (max-width: 768px) {
    .metric-summary {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .data-table {
      display: block;
      overflow-x: auto;
    }
  }
</style>