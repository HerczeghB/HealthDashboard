<script>
    // Active metric tab state
    let activeMetric = 'weight';

    // Placeholder data
    const weightData = [
        { date: '2023-03-01', value: 70.2 },
        { date: '2023-03-05', value: 70.5 },
        { date: '2023-03-10', value: 69.8 },
        { date: '2023-03-15', value: 69.5 },
        { date: '2023-03-20', value: 70.0 }
    ];

    const stepsData = [
        { date: '2023-03-19', value: 8242 },
        { date: '2023-03-20', value: 10321 },
        { date: '2023-03-21', value: 7890 },
        { date: '2023-03-22', value: 9102 },
        { date: '2023-03-23', value: 8745 }
    ];

    const sleepData = [
        { date: '2023-03-19', hours: 7.2, quality: 'Good' },
        { date: '2023-03-20', hours: 6.8, quality: 'Fair' },
        { date: '2023-03-21', hours: 8.1, quality: 'Excellent' },
        { date: '2023-03-22', hours: 7.5, quality: 'Good' },
        { date: '2023-03-23', hours: 7.0, quality: 'Good' }
    ];

    const waterData = [
        { date: '2023-03-19', value: 1.8 },
        { date: '2023-03-20', value: 2.2 },
        { date: '2023-03-21', value: 1.6 },
        { date: '2023-03-22', value: 2.0 },
        { date: '2023-03-23', value: 1.5 }
    ];

    // Function to switch active metric
    function setActiveMetric(metric) {
        activeMetric = metric;
    }

    // Function to get the latest metric value
    function getLatestValue(dataArray, valueProperty = 'value') {
        if (dataArray && dataArray.length > 0) {
            return dataArray[dataArray.length - 1][valueProperty];
        }
        return 'N/A';
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
    </div>

    <div class="metrics-content">
        <!-- Weight Metric -->
        {#if activeMetric === 'weight'}
            <div class="metric-detail-panel">
                <div class="metric-summary">
                    <div class="metric-current">
                        <span class="metric-value">{getLatestValue(weightData)} kg</span>
                        <span class="metric-label">Current Weight</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn">+ Add Weight Data</button>
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
                        {#each [...weightData].reverse() as entry}
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
                        <span class="metric-value">{getLatestValue(stepsData).toLocaleString()}</span>
                        <span class="metric-label">Daily Steps</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn">+ Add Steps Data</button>
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
                        {#each [...stepsData].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.value.toLocaleString()}</td>
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
                        <span class="metric-value">{getLatestValue(sleepData, 'hours')} hrs</span>
                        <span class="metric-label">Last Night's Sleep</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn">+ Add Sleep Data</button>
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
                        {#each [...sleepData].reverse() as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.hours} hrs</td>
                                <td>{entry.quality}</td>
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
                        <span class="metric-value">{getLatestValue(waterData)} L</span>
                        <span class="metric-label">Today's Water Intake</span>
                    </div>
                    <div class="metric-actions">
                        <button class="add-data-btn">+ Add Water Data</button>
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
                        {#each [...waterData].reverse() as entry}
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
    </div>
</div>

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