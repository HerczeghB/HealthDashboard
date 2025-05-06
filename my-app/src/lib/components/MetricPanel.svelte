<script lang="ts">
    import Chart from '$lib/components/Chart.svelte';

    export let metric = '';
    export let metricData = [];
    export let latestValue = 'N/A';
    export let unit = '';
    export let valueLabel = '';
    export let chartTitle = '';
    export let tableColumns = [];
    export let onAddData = () => {};
    export let addDataMode = 1; // 1 for number, 2 for string (like mood)
    export let addButtonText = '+ Add Data';
    export let average = null;

    function formatValue(value, col) {
        if (col.format) {
            return col.format(value);
        }
        return value;
    }
    function getSleepQuality(hours){
        if (hours < 4) return {label: 'Poor', color: 'red'}
        if (hours < 6) return {label: 'Okay', color: 'orange'}
        if (hours < 8) return {label: 'Good', color: 'green'}
        return {label: 'Excellent', color: 'blue'}
    }
</script>

<div class="metric-detail-panel">
    <div class="metric-summary">
        <div class="metric-current-container">
            <div class="metric-current">
                <span class="metric-value">{latestValue} {unit}</span>
                <span class="metric-label">{valueLabel}</span>
            </div>

            {#if average !== null}
                <div class="metric-average">
                    <span class="metric-value">{average} {unit}</span>
                    <span class="metric-label">Average</span>
                </div>
            {/if}
        </div>
        <div class="metric-actions">
            <button class="add-data-btn" on:click={() => onAddData(addDataMode)}>{addButtonText}</button>
        </div>
    </div>

    <Chart
            metric={metric}
            data={metricData}
            title={chartTitle}
    />

    <div class="metric-history">
        <h3>Recent Records</h3>
        <table class="data-table">
            <thead>
            <tr>
                {#each tableColumns as column}
                    <th>{column.title}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each [...metricData].reverse() as entry}
                <tr>
                    {#each tableColumns as column}
                        <td>
                            {#if column.key === 'date'}
                                {entry[column.key]}
                            {:else if column.key === 'value'}
                                {formatValue(entry[column.key], column)}
                            {:else if column.key === 'quality'}
                                <span style="color: {getSleepQuality(entry.value).color}; font-weight: bold;">{getSleepQuality(entry.value).label}</span>
                            {:else}
                                {entry[column.key] === ''}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
  $primary-dark: #151E3F;    // Dark blue - primary background
  $primary-accent: #1D7874;  // Teal - highlights and buttons
  $light-accent: #F2F3D9;    // Light cream - text on dark backgrounds
  $text-on-light: #151E3F;   // Text on light backgrounds
  $text-muted: rgba($text-on-light, 0.6);
  $border-radius: 12px;

  .metric-detail-panel {
    padding: 1.5rem;
  }

  .metric-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .metric-current-container {
      display: flex;
      gap: 2rem;
    }

    .metric-current, .metric-average {
      display: flex;
      flex-direction: column;

      .metric-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: $primary-accent;
      }

      .metric-label {
        font-size: 0.8rem;
        color: $text-muted;
      }
    }

    .metric-average {
      .metric-value {
        color: $text-on-light;
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

    .metric-current-container {
      flex-direction: column;
      gap: 1rem;
    }

    .data-table {
      display: block;
      overflow-x: auto;
    }
  }
</style>