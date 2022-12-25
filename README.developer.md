# Getting Started with Spell Listing App

> Visit spell listing app at https://spell-app.netlify.app/

## Available Scripts

### To Clone the project in local server

> `git clone https://github.com/sudip259/spell-app.git`

### Go to root directory and run:

> `npm install`

### There are 2 stages and modes in which app can run:

> stages: staging | production
> modes: development | production

### different stages have different envs

> staging:

1. REACT_APP_BASE_URL=https://www.dnd5eapi.co/api
2. REACT_APP_WATCH_LATER_URL=https://sudipbhattarai.pythonanywhere.com/api

> production:

1. REACT_APP_BASE_URL=https://www.dnd5eapi.co/api
2. REACT_APP_WATCH_LATER_URL=https://sudipbhattarai.pythonanywhere.com/api

### To run the app in develompment mode using staging API:

> `npm run start:staging`

### To run the app in develompment mode using production API:

> `npm run start:production`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### To create a build of app using production API:

> `npm run build:production`

### To create a build of app using staging API:

> `npm run build:staging`

### Unit Test:

> `npm test`

### Project Structure

1. src->routes->index.tsx - all routing are defined inside it
2. src->App.tsx - dashboard layout
3. src->pages - available pages in spell listing app
4. src->components - reusable components
5. src->app->store.ts - redux store
6. src->app->services - rtk queries(query & mutation)
7. src->app->features - state management
8. src->domain->axiosBaseQuery.ts - custom axios baseQuery
9. root->.env.staging - staging environment
10. root->.env.production - produciton environment

### Used tools and libraries

1. node v18.7.0
2. react v18.2.0
3. antd "antd": "^5.1.0",
4. axios v1.2.1
5. env-cmd v10.1.0
6. lodash: v4.17.21
7. @mui/material v5.11.1
8. react-redux v8.0.5
9. react-router-dom v6.6.0
10. @reduxjs/toolkit v1.9.1
11. redux-persist v6.0.0

### Endpoints

1. https://www.dnd5eapi.co/api/spells -> get list of all spells in array

   > method:GET

   > response: {"count":319,"results":[{"index":"acid-arrow","name":"Acid Arrow","url":"/api/spells/acid-arrow"}]}

2.https://www.dnd5eapi.co/api/spells/`${index}` -> Get Details of spell by index value

> method:GET

> response: {"index":"acid-arrow","name":"Acid Arrow","desc":["A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."],"higher_level":["When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."],"range":"90 feet","components":["V","S","M"],"material":"Powdered rhubarb leaf and an adder's stomach.","ritual":false,"duration":"Instantaneous","concentration":false,"casting_time":"1 action","level":2,"attack_type":"ranged","damage":{"damage_type":{"index":"acid","name":"Acid","url":"/api/damage-types/acid"},"damage_at_slot_level":{"2":"4d4","3":"5d4","4":"6d4","5":"7d4","6":"8d4","7":"9d4","8":"10d4","9":"11d4"}},"school":{"index":"evocation","name":"Evocation","url":"/api/magic-schools/evocation"},"classes":[{"index":"wizard","name":"Wizard","url":"/api/classes/wizard"}],"subclasses":[{"index":"lore","name":"Lore","url":"/api/subclasses/lore"},{"index":"land","name":"Land","url":"/api/subclasses/land"}],"url":"/api/spells/acid-arrow"}

3. https://sudipbhattarai.pythonanywhere.com/api/wish_list/ -> get wish list in array

   > method:GET

   > response: [{"id":320,"json_data":{"index":"clone","name":"Clone","url":"/api/spells/clone","key":"clone"}}

4. https://sudipbhattarai.pythonanywhere.com/api/wish_list/ -> add to wish list

   > method: POST

   > Request body: {"json_data":{"index":"arcane-sword","name":"Arcane Sword","url":"/api/spells/arcane-sword","key":"arcane-sword"}}

   > response: {"id":343,"json_data":{"index":"arcane-sword","name":"Arcane Sword","url":"/api/spells/arcane-sword" "key":"arcane-sword"}}

5. https://sudipbhattarai.pythonanywhere.com/api/wish_list/`${id}`

   > method: DELETE

### Code Hosting Platform

1. Github

### Deployment

1. Netlify
2. PythonAnywhere
