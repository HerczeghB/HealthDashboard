<script lang="ts">
    import { onMount } from "svelte";
    import NewData from "$lib/components/NewData.svelte";
    import MetricPanel from "$lib/components/MetricPanel.svelte";

    let activeMetric = 'weight';
    let modeNewData = 0; //0 - hidden, 1 - number value, 2 - string value(mood)

    let metrics = {
        weight: [],
        steps: [],
        water: [],
        sleep: [],
        mood: []
    };

    let averages = {
        weight: null,
        steps: null,
        sleep: null,
        water: null
    }

    // Column definitions for each metric
    const metricColumns = {
        weight: [
            { key: 'date', title: 'Date' },
            { key: 'value', title: 'Weight (kg)', format: (v) => `${v} kg` }
        ],
        steps: [
            { key: 'date', title: 'Date' },
            { key: 'value', title: 'Steps' }
        ],
        sleep: [
            { key: 'date', title: 'Date' },
            { key: 'value', title: 'Hours', format: (v) => `${v} hrs` },
            { key: 'quality', title: 'Quality' }
        ],
        water: [
            { key: 'date', title: 'Date' },
            { key: 'value', title: 'Amount (L)', format: (v) => `${v} L` }
        ],
        mood: [
            { key: 'date', title: 'Date' },
            { key: 'value', title: 'Mood' }
        ]
    };

    // Metric display configuration
    const metricConfig = {
        weight: {
            valueLabel: 'Current Weight',
            unit: 'kg',
            chartTitle: 'Weight Tracking',
            addButtonText: '+ Add Weight Data'
        },
        steps: {
            valueLabel: 'Daily Steps',
            unit: 'steps',
            chartTitle: 'Steps History',
            addButtonText: '+ Add Steps Data'
        },
        sleep: {
            valueLabel: 'Last Night\'s Sleep',
            unit: 'hrs',
            chartTitle: 'Sleep Patterns',
            addButtonText: '+ Add Sleep Data'
        },
        water: {
            valueLabel: 'Today\'s Water Intake',
            unit: 'L',
            chartTitle: 'Water Consumption',
            addButtonText: '+ Add Water Data'
        },
        mood: {
            valueLabel: 'Current Mood',
            unit: '',
            chartTitle: 'Mood Tracking',
            addDataMode: 2,
            addButtonText: '+ Select Your Current Mood'
        }
    };

    $: activeUnit = (() => {
        const latestValue = getLatestValue(metrics[activeMetric]);
        const baseUnit = metricConfig[activeMetric].unit;

        if (activeMetric === 'steps') return latestValue === 1 ? 'step' : baseUnit;
        if (activeMetric === 'sleep') return latestValue === 1 ? 'hr' : baseUnit;
        return baseUnit;
    })();


    onMount(async () => {
        try {
            const res = await fetch('/api/new-data');
            if (res.ok) {
                metrics = await res.json();
            }

            const res2 = await fetch('/api/average');
            if (res2.ok) {
                averages = await res2.json();
            }
        } catch (err) {
            console.error('Failed to fetch metrics or averages:', err);
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

    function handleAddDataRequest(mode) {
        modeNewData = mode;
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
            metrics[metric] = [...metrics[metric], data];
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
        {#if metrics[activeMetric]}
            <MetricPanel
                    metric={activeMetric}
                    metricData={metrics[activeMetric]}
                    latestValue={getLatestValue(metrics[activeMetric])}
                    unit={activeUnit}
                    valueLabel={metricConfig[activeMetric].valueLabel}
                    chartTitle={metricConfig[activeMetric].chartTitle}
                    tableColumns={metricColumns[activeMetric]}
                    onAddData={handleAddDataRequest}
                    addDataMode={metricConfig[activeMetric].addDataMode || 1}
                    addButtonText={metricConfig[activeMetric].addButtonText}
                    average={averages[activeMetric] ?? null}
            />
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
</style>