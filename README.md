# Tebex Front-end Quest

Submission by Aaron

## Screenshots

### Desktop

### Mobile

## Tools used

| Month | Savings |
| --- | --- |
| TailwindCSS | The superior styling framework that I've been using lately |
| PrimeVue | Picked this up within the last few months and have been enjoying it! |
| PrimeIcons | Easy icon library, I used the basket for the mobile checkout page |
| tailwindcss-primeui | Allows me to use PrimeVue's theme within Tailwind classes for consistency |
| Zod | For form validation, and PrimeVue integrates into it directly for forms. |
| Axios | For all API requests |
| Axios | For all API requests |
| vite-plugin-vue-devtools | Vue devtools, built right into the app. The browser extension is just too underperformant for larger apps. |
| vue-router | To navigate between the checkout and order complete pages |

### Run my application

Install the packages

```shell
npm install
```

Launch the API

```shell
npm run api
```

In a seperate terminal, launch the app

```shell
npm run dev
```

Running the tests

```shell
npm run test:unit
```

### Comments

- I feel it would have been nice if the coupon endpoint also returned the actual discount value that it applied, as I had to work this out within a computed in the component itself.
- The success icon on the order confirm page was not in the assets, I had to export it from Figma.
