<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';

    export let metric = '';
    export let data = [];
    export let title = '';

    let chart;
    let canvas;

    $: if (data && canvas && metric) {
        updateChart();
    }

    onMount(() => {
        if (data && canvas && metric) {
            createChart();
        }
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

    function getChartColors() {
        return {
            backgroundColor: 'rgba(29, 120, 116, 0.2)',
            borderColor: 'rgba(29, 120, 116, 1)',
            pointBackgroundColor: 'rgba(29, 120, 116, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(29, 120, 116, 1)'
        };
    }

    function getMetricLabel(metric) {
        switch(metric) {
            case 'weight': return 'Weight (kg)';
            case 'steps': return 'Daily Steps';
            case 'sleep': return 'Sleep Duration (hrs)';
            case 'water': return 'Water Intake (L)';
            case 'mood': return 'Mood';
            default: return metric;
        }
    }

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        updateChart();
    }

    function updateChart() {
        if (!canvas) return;

        if (chart) {
            chart.destroy();
        }

        const colors = getChartColors();

        // Sort data by date
        const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

        // Get the last 10 entries or all if less than 10
        const displayData = sortedData.slice(-10);

        const labels = displayData.map(entry => entry.date);
        const values = displayData.map(entry => entry.value);

        let chartConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: getMetricLabel(metric),
                    data: values,
                    backgroundColor: colors.backgroundColor,
                    borderColor: colors.borderColor,
                    borderWidth: 2,
                    pointBackgroundColor: colors.pointBackgroundColor,
                    pointBorderColor: colors.pointBorderColor,
                    pointHoverBackgroundColor: colors.pointHoverBackgroundColor,
                    pointHoverBorderColor: colors.pointHoverBorderColor,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: metric !== 'weight' && metric !== 'sleep',
                        ticks: {
                            callback: function(value) {
                                if (metric === 'water') return value + ' L';
                                if (metric === 'weight') return value + ' kg';
                                if (metric === 'sleep') return value + ' hrs';
                                return value;
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y;
                                if (metric === 'water') return label + ' L';
                                if (metric === 'weight') return label + ' kg';
                                if (metric === 'sleep') return label + ' hrs';
                                return label;
                            }
                        }
                    }
                }
            }
        };

        // Special configuration for mood
        if (metric === 'mood') {
            // Convert mood values to numeric for charting
            const moodValues = {
                'happy': 5,
                'neutral': 4,
                'sad': 3,
                'anxious': 2,
                'excited': 1
            };

            chartConfig = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Mood',
                        data: displayData.map(entry => moodValues[entry.value] || 3),
                        backgroundColor: displayData.map(entry => {
                            switch(entry.value) {
                                case 'happy': return 'rgba(8,211,48,0.8)';
                                case 'neutral': return 'rgba(158,152,142,0.8)';
                                case 'sad': return 'rgba(86,154,255,0.8)';
                                case 'anxious': return 'rgba(255,64,64,0.8)';
                                case 'excited': return 'rgba(255,106,0,0.8)';
                                default: return 'rgba(255, 206, 86, 0.8)';
                            }
                        }),
                        borderColor: displayData.map(entry => {
                            switch(entry.value) {
                                case 'happy': return 'rgb(8, 211, 48)';
                                case 'neutral': return 'rgb(158, 152, 142)';
                                case 'sad': return 'rgb(86, 154, 255)';
                                case 'anxious': return 'rgb(255, 64, 64)';
                                case 'excited': return 'rgb(255, 106, 0)';
                                default: return 'rgb(255, 206, 86)';
                            }
                        }),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5,
                            ticks: {
                                stepSize: 1,
                                callback: function(value) {
                                    const moodLabels = {
                                        5: 'happy',
                                        4: 'neutral',
                                        3: 'sad',
                                        2: 'anxious',
                                        1: 'excited'
                                    };
                                    return moodLabels[value] || '';
                                }
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return displayData[context.dataIndex].value;
                                }
                            }
                        }
                    }
                }
            };
        }

        chart = new Chart(canvas, chartConfig);
    }
</script>

<div class="metric-chart-container">
    <h3>{title}</h3>
    <div class="chart-wrapper">
        <canvas bind:this={canvas}></canvas>
    </div>
</div>

<style>
    .metric-chart-container {
        margin-bottom: 2rem;
    }

    h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: #151E3F;
    }

    .chart-wrapper {
        height: 250px;
        width: 100%;
        position: relative;
    }
</style>