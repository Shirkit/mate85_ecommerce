This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[Milestones](https://github.com/Murphyly/mate85_ecommerce/milestones) with the schedule of the project

[Project managment](https://github.com/users/Murphyly/projects/1/views/5)

[Techonologies discussion](https://docs.google.com/document/d/1tNxArLmMkERyDy5abB3Fn9LJSFUgh1vAFx1bBVsxzfc/edit?usp=drive_link)

[System Requirements](https://github.com/Murphyly/mate85_ecommerce/wiki/System-requirements)

=======
## Installation

Before running, you must run the installation step 

```
npm install
```

Next step, is to create a `.env` file in the root project folder which should point to a Postgres installation.

```
DATABASE_URL=postgres://postgres:admin@localhost:5432
```

If you do not have a running Postgres instance running locally, you can always create one in a free provider shuch as [Neon](https://neon.tech/) or similar.
 
```
DATABASE_URL=postgres://USERNAME:PASSWORD@XXX.neon.tech/neondb?pgbouncer=true&connect_timeout=10
DIRECT_URL=postgres://USERNAME:PASSWORD@XXX.neon.tech/neondb?connect_timeout=10
```

For certain providers, shuch as Neon, a shadow database is required to run the migrations, so add this to the end of the `.env` file

```
SHADOW_DATABASE_URL=postgres://USERNAME:PASSWORD@XXX.neon.tech/shadow?pgbouncer=true&connect_timeout=10
```

=======
## Development

To run the Next.js server, just run the following command

```
bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

=======
## Observations

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
