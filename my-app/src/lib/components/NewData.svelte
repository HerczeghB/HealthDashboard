<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let metric : string;
    export let mode : number = 0; //0 - hidden, 1 - number value, 2 - string value(mood)

    const dispatch = createEventDispatcher();
    let inputValue = "";
    let inputDate = new Date().toISOString().slice(0, 10);
    let errorMessage = "";
    const today = new Date().toISOString().slice(0, 10);

    function validateInput() {
        if (mode === 1){
            if (inputValue.trim?.() === "" || isNaN(Number(inputValue)) || Number(inputValue) <= 0) {
                errorMessage = `Please enter a valid positive ${metric} value.`;
                return false;
            }
        }else if(mode === 2){
            if (!inputValue || typeof inputValue !== "string"){
                errorMessage = `Please select a mood.`;
                return false;
            }
        }

        if (!inputDate) {
            errorMessage = "Please select a valid date.";
            return false;
        }

        let inputDateObj = new Date(inputDate);
        inputDateObj.setHours(0, 0, 0, 0);
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if(inputDateObj < currentDate) {
            errorMessage = "Please enter a date that is not in the past.";
            return false;
        }
        errorMessage = "";
        return true;
    }

    function Submit() {
        if (!validateInput()) {
            return;
        }

        const value = metric === 'mood' ? inputValue.trim() : parseFloat(inputValue);

        const newData = {
            date: inputDate,
            value,
        };

        console.log("Submitting data:", { metric, data: newData });  // Log the data before dispatch

        dispatch('submit', { metric, data: newData });
        inputValue = "";
        inputDate = new Date().toISOString().slice(0, 10);
    }

    function Close() {
        dispatch('close');
    }
</script>

{#if mode > 0}
    <div class="overlay">
        <div class="content">
            <h3>Add new {metric} data</h3>
            {#if mode === 1}
                <div class="input-group">
                    <label for="value-input">Value</label>
                    <input
                            id="value-input"
                            type="number"
                            bind:value={inputValue}
                            placeholder={`Enter ${metric} value`}
                            min="0"
                            step="any"
                    />
                </div>
            {:else if mode === 2}
                <!-- String input -->
                <div class="input-group">
                    <label for="mood-select">Mood</label>
                    <select id="mood-select" bind:value={inputValue}>
                        <option value="" disabled selected>Select your current mood</option>
                        <option value="happy">Happy 😊</option>
                        <option value="neutral">Neutral 😐</option>
                        <option value="sad">Sad 😢</option>
                        <option value="anxious">Anxious 😰</option>
                        <option value="excited">Excited 🤩</option>
                    </select>
                </div>
            {/if}

            <div class="input-group">
                <label for="date-input">Date</label>
                <input
                        id="date-input"
                        type="date"
                        bind:value={inputDate}
                        min={today}
                />
                <small class="help-text">You can only add data for today or future dates.</small>
            </div>

            {#if errorMessage}
                <p class="error-message">{errorMessage}</p>
            {/if}

            <div class="actions">
                <button on:click={Submit}>Save</button>
                <button on:click={Close}>Cancel</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        min-width: 320px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        font-size: 0.9rem;
        color: #333;
    }

    .help-text {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.25rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 0.5rem;
    }

    input, select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        width: 100%;
    }

    button {
        padding: 0.5rem 1rem;
        font-weight: 500;
        cursor: pointer;
        border: none;
        border-radius: 6px;
        transition: background-color 0.2s;
    }

    button:first-child {
        background-color: #1D7874;
        color: white;
    }

    button:first-child:hover {
        background-color: #166661;
    }

    button:last-child {
        background-color: #e0e0e0;
    }

    button:last-child:hover {
        background-color: #d0d0d0;
    }

    .error-message {
        color: #e53935;
        font-size: 0.9rem;
        padding: 0.5rem;
        background-color: rgba(229, 57, 53, 0.1);
        border-radius: 4px;
        margin: 0;
    }

    h3 {
        margin: 0 0 0.5rem 0;
        color: #151E3F;
    }
</style>
