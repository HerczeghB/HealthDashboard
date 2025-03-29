<script>
    let foodEntries = [
        { food: 'Apple', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
        { food: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.3 },
        { food: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 3.6 }
    ];

    const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalFats = foodEntries.reduce((sum, entry) => sum + entry.fats, 0);
</script>

<div class="nutrition-tracker">
    <h3>Nutrition Summary</h3>

    <div class="nutrition-details">
        <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
        <p><strong>Total Protein:</strong> {totalProtein} g</p>
        <p><strong>Total Carbs:</strong> {totalCarbs} g</p>
        <p><strong>Total Fats:</strong> {totalFats} g</p>
    </div>

    <div class="nutrition-table">
        <h4>Food Entries</h4>
        <table>
            <thead>
            <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fats (g)</th>
            </tr>
            </thead>
            <tbody>
            {#each foodEntries as entry}
                <tr>
                    <td>{entry.food}</td>
                    <td>{entry.calories}</td>
                    <td>{entry.protein}</td>
                    <td>{entry.carbs}</td>
                    <td>{entry.fats}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
  $primary-dark: #151E3F;
  $text-on-light: #151E3F;
  $text-muted: rgba($text-on-light, 0.6);
  $primary-accent: #1D7874;

  .nutrition-tracker {
    .nutrition-details {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: $text-muted;
      strong {
        color: $primary-dark;
      }
    }

    .nutrition-table {
      margin-top: 1rem;
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
    }
  }
</style>
