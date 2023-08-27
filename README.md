# Link Flow

Next.js service to provide deeps links that work across all platforms. Sign up for the demo [links.starktech.dev](https://links.starktech.dev)

Alternative to Firebase Dynamic Links which is now deprecated and set to shut down on August 25, 2025.


![Register Screenshot](docs/assets/signin_screen.png)

![Edit Link Configuration Screenshot](docs/assets/edit_screen.png)

## How it works
- Leverages Next.js for the server side and rendering the front React.js
- Firebase Authentication
- Firebase Firestore to store user info and link configurations

## User flow example
- Send your users one link: app.yourapp.example
- Have that domain configured to point to your Link Flow link
- Once a user follows that link, we will determine the best place to send them based on their platform and your configuration
- If the user is on an iOS device and has your app installed, we will deep link them into your app
- If the user is on an iOS device but has not installed your app, we sent them to your App Store listing
- Same for Android devices and Play Store

## Getting started with local development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [API routes](https://nextjs.org/docs/api-routes/introduction)
