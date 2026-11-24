# spotify-top

See the project live at: [https://admsterling.github.io/spotify-top/](https://admsterling.github.io/spotify-top/)

This project was to practice the following technologies:

- Vue 3
- Type Script
- Taiwind CSS

The project rapid developed in 2 days as a side project so a lot could still be optimised (leverage Vue 3 Composition API more).

The application allows users to connect their spotify account to see their top tracks and artists.

Logging into Spotify uses the Spotify Implicit Authorization Flow and is therefore secure for users.
See more information [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow).

### Side Project Discussion and Goals
The main goal of this project was to practice using the new Vue 3 Composition API with TypeScript. Although I'm comfortable in Vue 2 I wanted to try use the new features of Vue 3 and explore what's new. At the time of writing this, Sept 2021, Vue 3 has been released for roughly a year and I've put off using it until it became more stable and more integrated into the Vue eco-system.

After using Vue 3 for this project it's clear to most of the main concepts stayed the same however the Composition API was introduced to try and replace the Options API. I still prefer the modular design of the Options API and will probably continue using this version in future projects but it is nice that I'm comfortable using both API's.

Vue 3 now also has Type Script support which was great to help write the correct code at compile time rather than running into issues during run time and I hope to continue with it.

Other smaller goals of this project were to make sure I was familiar with the new versions of Vuex, Vue Router and the transition system which I felt able to do and implmeneted with reduced functionality but I understand how to use the packages.

For this project I opted to try using Tailwind CSS. Ideally I would have liked to use Vuetify to create the app even quicker but it still does not support Vue 3 so was not an option. Tailwind was great to use and I'll probably end up using it for small applications where a custom theme/look is more ideal as Vuetify follows the material design and is better for dashboard sort of apps.

## Enviornment Variables

The project requires 2 enviornment variables.

Provide your Spotify Developer App client ID in a normal .env file.

```
VUE_APP_SPOTIFY_CLIENT_ID = 'XXX'
```

Provide your development/production base URL in .env.development and .env.production files retrospectively.

Example .env.development

```
VUE_APP_BASE_URL= "http://localhost:8080/"
```

Example .env.production

```
VUE_APP_BASE_URL = "https://admsterling.github.io/spotify-top/"
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
