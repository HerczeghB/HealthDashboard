<script>
    import { createEventDispatcher } from "svelte";

    export let metric;
    export let mode = 0; //0 - hidden, 1 - number value, 2 - string value(mood)

    const dispatch = createEventDispatcher();
    let inputValue = "";
    let inputDate = new Date().toISOString().slice(0, 10);
    let errorMessage = "";

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

        if(inputDateObj.getTime() < currentDate.getTime()) {
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
                <input
                        type="number"
                        bind:value={inputValue}
                        placeholder={`Enter ${metric} value`}
                        min="0"
                        step="any"
                />
            {:else if mode === 2}
                <!-- String input -->
                <select bind:value={inputValue}>
                    <option value="" disabled selected>Select your current mood</option>
                    <option value="happy" >Happy 😊</option>
                    <option value="neutral" >Neutral 😐</option>
                    <option value="sad" >Sad 😢</option>
                    <option value="anxious" >Anxious 😰</option>
                    <option value="excited" >Excited 🤩</option>
                </select>
            {/if}

            <input
                    type="date"
                    bind:value={inputDate}
            />

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
        min-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        font-weight: 500;
        cursor: pointer;
        border: none;
        border-radius: 6px;
    }
    button:first-child {
        background-color: #1D7874;
        color: white;
    }
    button:last-child {
        background-color: #ccc;
    }
    .error-message {
        color: red;
        font-size: 0.9rem;
    }
</style>
