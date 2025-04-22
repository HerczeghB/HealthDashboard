<script>
    const today = new Date().toDateString();
</script>

<div class="welcome-bar">
    <h2>Welcome to Your Health Dashboard</h2>
    <p>Today: {today}</p>
</div>

<div class="account-bar">
    <h2>Let's get started:</h2>
    <button class= "button" type="button">
        Log in
    </button>
</div>

<style lang="scss">
  $primary-accent: #1D7874;
  $light-accent: #F2F3D9;
  $border-radius: 12px;

    .welcome-bar{}

    .account-bar{
        display: flex;
    }
    .button{
        padding: 0.75rem 1.5rem;
        background-color: $primary-accent;
        color: $light-accent;
        border: none;
        border-radius: $border-radius;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }
</style>