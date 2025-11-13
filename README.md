This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## JJ's Own Adaptations

- I included my own signature name (JJ) in the platform's name
- I implemented my own Custom Sign-UP and Login instead of Better-Auth
- I used local PostgresSQL
- I omitted ActJet implementation for now
- I used my own media files, such as logo and other images since I didn't pay for Marshal's
- I used DigitalOcean's S3 (Space) Buckets because tigrisdata bucket's api v3 isn't fully compatible with the necessary headers
- I used all-lowercased-hyphenated naming patterns for code file names instead of CamelBack used by Marshal
- Finally, there were few instances where I used TailWindCSS styling in a way different from Jan's.

Apart from the above few cases, I strictly followed [Create an LMS Course Platform with Next.js, Arcjet, Better-Auth, and Stripe (Part 1/2)](https://www.youtube.com/watch?v=xqoYkX4hfwg) to the end. You are free to fork and/or clone and test, and also adapt as you like.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
