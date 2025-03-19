# Tebex Front-end Quest

Submission by Aaron

## Screenshots

### Desktop
![image](https://github.com/user-attachments/assets/03879a2a-c886-426a-93c0-f4f85a2f3478)

![image](https://github.com/user-attachments/assets/aa43741d-58f1-4349-9994-0229f826486f)

### Tablet
![image](https://github.com/user-attachments/assets/9cf7cf85-edb0-4354-b05b-79380e1b12ff)

### Mobile
![image](https://github.com/user-attachments/assets/1362c6bd-5776-4c81-9176-e52a984d45c2)
![image](https://github.com/user-attachments/assets/d9c423ef-0978-47e4-9d7a-9fe10d2f4333)


## Tools used

| Month | Savings |
| --- | --- |
| TailwindCSS | The superior styling framework that I've been using lately |
| PrimeVue | Picked this up within the last few months and have been enjoying it! |
| PrimeIcons | Easy icon library, I used the basket for the mobile checkout page |
| tailwindcss-primeui | Allows me to use PrimeVue's theme within Tailwind classes for consistency |
| Zod | For form validation, and PrimeVue integrates into it directly for forms. |
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
- I thought a floating basket button with a bottom drawer would be appropriate for showing the basket on mobile
