# Health Dashboard Project
- This project is a health dashboard where users can upload their daily data and track metrics, like sleeping hours, daily steps, current weight and water intake. 
- Multiple users and authentication are not implemented yet.
- The project contains 5 pages, the default login page, dashboard, metrics, profile and calendar
- It uses 3 written API and 1 external(NutritioniX)


## Installation
**1. Clone repo:**
   - git clone https://github.com/HerczeghB/HealthDashboard.git
   - cd my-app

**2. Install dependencies:** 
   - npm i
   - npm i -D sass(for SCSS)
    
**3. Run the server:**
   - npm run dev

## APIs
>### new-data API:
> - handles new metric data 
> - creates metrics.json(if it don't exist), then updates it
> - validates data(date, string(mood), number(other metrics))

>### user-data API:
> - handles user data in profile page, it includes health goals and dashboard preference

>### average API:
> - fetches data from metrics.json, then calculates the average value and returns it

>### NutritioniX API
> - fetches instant endpoint,which provides fast results for autocomplete text box interfaces.
> - then it fetches the natural/nutrients endpoint which provides nutritional values for the selected item
> - external API

## Routes
 - src/data --> stores the json files(metrics.json, user.json)
 - src/lib/components --> stores svelte components
 - src/routes --> contains layout and login page
   - /api --> APIs
   - /dashboard --> **dashboard page:** components showing based on the preference
   - /metrics --> **metrics page:** user can view metrics and add new entries
   - /profile --> **profile page:** user can set health goals, dashboard preference and personal information
   - /calendar --> **calendar page:** it contains a calendar, right now it has no use

## Stored data
- data is stored in metrics.json and user.json

## Communication
- fetching from APIs
- MetricsPanel component renders Chart  component