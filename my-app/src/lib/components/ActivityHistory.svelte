<script>
    // Dummy data for activity history (you can replace this with real data later)
    let activityData = [
        { date: '2025-03-01', steps: 7000 },
        { date: '2025-03-02', steps: 8000 },
        { date: '2025-03-03', steps: 6000 },
        { date: '2025-03-04', steps: 10000 },
        { date: '2025-03-05', steps: 9000 },
    ];
</script>

<div class="activity-history">
    <h3>Activity History</h3>
    <div class="placeholder-chart"></div>

    <!-- Display list of activities -->
    <ul class="activity-list">
        {#each activityData as { date, steps }}
            <li>{date}: {steps} steps</li>
        {/each}
    </ul>
</div>

<style>
    .activity-history {
        padding: 1.5rem;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .placeholder-chart {
        height: 140px;
        background: linear-gradient(135deg, rgba(29, 120, 116, 0.1) 0%, rgba(103, 146, 137, 0.1) 100%);
        border-radius: 12px;
        margin-top: 1rem;
    }

    .activity-list {
        list-style-type: none;
        padding-left: 0;
        margin: 1rem 0 0;
        font-size: 0.9rem;
        color: #555;
    }

    .activity-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
</style>
