<script>
    import { onMount } from 'svelte';

    // API credentials
    const API_ID = '360784c3';
    const API_KEY = '3dbc3e8a25751c61ead9a4abe13cd2de';

    // State variables
    let foodEntries = [];
    let searchQuery = '';
    let searchResults = [];
    let isLoading = false;
    let selectedDate = new Date().toISOString().split('T')[0]; // Today's date

    // Calculated nutritional totals
    $: totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
    $: totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);
    $: totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    $: totalFats = foodEntries.reduce((sum, entry) => sum + entry.fats, 0);

    onMount(() => {
        loadEntriesForDate(selectedDate);
    });

    // Load food entries for selected date
    function loadEntriesForDate(date) {
        try {
            const stored = localStorage.getItem(`food-entries-${date}`);
            foodEntries = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error loading entries:", error);
            foodEntries = [];
        }
    }

    // Search for foods using Nutritionix API
    async function searchFood() {
        if (!searchQuery.trim()) {
            searchResults = [];
            return;
        }

        isLoading = true;
        try {
            const response = await fetch(
                `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(searchQuery)}`,
                {
                    method: 'GET',
                    headers: {
                        'x-app-id': API_ID,
                        'x-app-key': API_KEY
                    }
                }
            );

            const data = await response.json();
            searchResults = data.common || [];
        } catch (error) {
            console.error("Search error:", error);
            searchResults = [];
        } finally {
            isLoading = false;
        }
    }

    // Get detailed nutrition data for selected food
    async function getNutritionData(foodName) {
        isLoading = true;
        try {
            const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                method: 'POST',
                headers: {
                    'x-app-id': API_ID,
                    'x-app-key': API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: foodName
                })
            });

            const data = await response.json();
            if (data.foods && data.foods.length > 0) {
                const food = data.foods[0];
                addFoodEntry({
                    food: food.food_name,
                    calories: Math.round(food.nf_calories),
                    protein: Math.round(food.nf_protein * 10) / 10,
                    carbs: Math.round(food.nf_total_carbohydrate * 10) / 10,
                    fats: Math.round(food.nf_total_fat * 10) / 10,
                    serving_qty: food.serving_qty,
                    serving_unit: food.serving_unit,
                    date: selectedDate
                });
            }
        } catch (error) {
            console.error("Error getting nutrition data:", error);
        } finally {
            isLoading = false;
            searchQuery = '';
            searchResults = [];
        }
    }

    // Add food entry to the list
    function addFoodEntry(entry) {
        foodEntries = [...foodEntries, entry];
        saveEntries();
    }

    // Remove food entry from the list
    function removeFoodEntry(index) {
        foodEntries = foodEntries.filter((_, i) => i !== index);
        saveEntries();
    }

    // Save entries to localStorage
    function saveEntries() {
        try {
            localStorage.setItem(`food-entries-${selectedDate}`, JSON.stringify(foodEntries));
        } catch (error) {
            console.error("Error saving entries:", error);
        }
    }

    // Handle date change
    function handleDateChange() {
        loadEntriesForDate(selectedDate);
    }

    // Handle keyboard navigation in search results
    function handleKeyDown(event, foodName) {
        if (event.key === 'Enter' || event.key === ' ') {
            getNutritionData(foodName);
        }
    }
</script>

<div class="nutrition-tracker">
    <h3>Nutrition Tracker</h3>

    <div class="date-selector">
        <label for="date">Date:</label>
        <input type="date" id="date" bind:value={selectedDate} on:change={handleDateChange}>
    </div>

    <div class="search-section">
        <div class="search-container">
            <input
                    type="text"
                    placeholder="Search for food..."
                    bind:value={searchQuery}
                    on:input={searchFood}
            >
            {#if isLoading}
                <span class="loading">Loading...</span>
            {/if}
        </div>

        {#if searchResults.length > 0}
            <div class="search-results">
                <ul role="listbox" aria-label="Food search results">
                    {#each searchResults as result}
                        <button
                                class="result-item"
                                role="option"
                                aria-selected="true"
                                on:click={() => getNutritionData(result.food_name)}
                                on:keydown={(e) => handleKeyDown(e, result.food_name)}
                        >
                            {result.food_name}
                        </button>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>

    <div class="nutrition-details">
        <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
        <p><strong>Total Protein:</strong> {totalProtein} g</p>
        <p><strong>Total Carbs:</strong> {totalCarbs} g</p>
        <p><strong>Total Fats:</strong> {totalFats} g</p>
    </div>

    <div class="nutrition-table">
        <h4>Food Entries</h4>
        {#if foodEntries.length === 0}
            <p class="no-entries">No food entries for this date.</p>
        {:else}
            <table>
                <thead>
                <tr>
                    <th>Food</th>
                    <th>Serving</th>
                    <th>Calories</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fats (g)</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {#each foodEntries as entry, index}
                    <tr>
                        <td>{entry.food}</td>
                        <td>{entry.serving_qty || 1} {entry.serving_unit || 'serving'}</td>
                        <td>{entry.calories}</td>
                        <td>{entry.protein}</td>
                        <td>{entry.carbs}</td>
                        <td>{entry.fats}</td>
                        <td>
                            <button
                                    class="remove-btn"
                                    on:click={() => removeFoodEntry(index)}
                                    aria-label="Remove {entry.food}"
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<style lang="scss">
  $primary-dark: #151E3F;
  $text-on-light: #151E3F;
  $text-muted: rgba($text-on-light, 0.6);
  $primary-accent: #1D7874;
  $light-accent: #CEE5F2;

  .nutrition-tracker {
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;

    .date-selector {
      margin-bottom: 1.5rem;

      label {
        margin-right: 0.5rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

    .search-section {
      margin-bottom: 1.5rem;
      position: relative;

      .search-container {
        display: flex;
        align-items: center;

        input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .loading {
          margin-left: 1rem;
          color: $text-muted;
        }
      }

      .search-results {
        position: absolute;
        z-index: 10;
        background: white;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        max-height: 300px;
        overflow-y: auto;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .result-item {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 0.75rem;
          cursor: pointer;
          border-bottom: 1px solid #eee;
          font-size: 1rem;

          &:hover, &:focus {
            background-color: $light-accent;
          }
        }
      }
    }

    .nutrition-details {
      background-color: $light-accent;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      color: $text-muted;

      strong {
        color: $primary-dark;
      }
    }

    .nutrition-table {
      margin-top: 1rem;

      .no-entries {
        color: $text-muted;
        text-align: center;
        padding: 1rem;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 0.8rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: $primary-accent;
          color: white;
        }

        td {
          font-size: 1rem;
          color: $text-on-light;
        }
      }

      .remove-btn {
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 0.4rem 0.6rem;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.8rem;

        &:hover {
          background-color: #e74c3c;
        }
      }
    }
  }
</style>