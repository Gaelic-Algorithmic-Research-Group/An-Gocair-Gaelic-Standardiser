This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Notes

The section above is auto-generated when a new Create Next App project is created.
The following are notes taken during the development of this project.

This Create Next App project was created using a TypeScript template, which allows to generate a TypeScript/React development environment.
The following command was used to start the Next App with `yarn`:

```bash
yarn create next-app --typescript
```

## Prettier

The [Prettier](https://prettier.io/docs/en/index.html) code formatter has been employed.
To format all files in-place using the locally installed version of Prettier, run:

```bash
yarn prettier --write .
```

To only check if files are formatted with Prettier, run:

```bash
yarn prettier --check .
```

A Prettier pre-commit hook has been added to `../.pre-commit-config.yaml` that will run `yarn prettier --write .` with every `git commit`.
In other words, files will be modified by this pre-commit hook.
Files in `.prettierignore` will not be formatted by Prettier.

A GitHub Action for Prettier has also been added in `../.github/workflows/prettier_eslint.yml.yaml`, currently working on pushes and pull requests on the `develop` branch.
Unlike the pre-commit hook, this Action will run `yarn prettier --check .`, which errors if files are not formatted with Prettier.

## ESLint

See [this link](https://nextjs.org/docs/basic-features/eslint) for details.

Next.js provides an integrated [ESLint](https://eslint.org/) experience to find and fix problems in the code.
In this project, the **strict** configuration was selected after running `yarn lint`.
This will automatically install `eslint` and `eslint-config-next`, the ESLint configuration used by Next.js.

Because ESLint contains code formatting rules and is here being used with Prettier, [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) has been included in the ESLint configuration.
This turns off all rules that are unnecessary or might conflict with Prettier.

The Prettier dependency was installed by running:

```bash
yarn add --dev eslint-config-prettier
```

And then adding `prettier` to the ESLint configuration file `.eslintrc.json`:

```bash
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

To run ESLint on the project, run:

```bash
yarn next lint
```

Or if you have added `"lint": "next lint"` to the `"scripts"` section in `package.json`, you can also run:

```bash
yarn lint
```

A pre-commit hook has been added to `../.pre-commit-config.yaml` that will run `yarn next lint --fix` with every `git commit`.
In other words, files will be modified by this hook, if necessary.
The main reason for using `yarn` to run the local ESLint set-up directly, rather than using a pre-commit hook that employs an external GitHub repo, is that you tend to need to do a lot of local setups to make ESLint work in line with the desired configuration (here working in a Next.js framework).
Additionally, because here we are using ESLint alongside Prettier, we want to make sure the two tools do not conflict with each other.
By using `yarn` to run ESLint in the pre-commit hook (also in the GitHub Action), we can make sure our local configuration is respected.

A GitHub Action for ESLint has also been added in `../.github/workflows/prettier_eslint.yml`, currently working on pushes and pull requests on the `develop` branch, that will run `yarn next lint`.

## Testing

[Jest](https://nextjs.org/docs/testing#jest-and-react-testing-library) has been employed for testing.
It has been set up with the Rust Compiler using the following command:

```bash
yarn add jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --dev
```

To run all Jest tests, run the following command:

```bash
yarn test
```
