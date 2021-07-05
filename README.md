# Files API

## 1. Development environment

- [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com)

## 2. Setup

### 2.1. Add your local configuration

Set up your local environment configurations in the file `.env`.
If you don't have a `.env` file in the root directory, please copy the `.env.example`, rename it to `.env` and fill the properties values with your environment details.

### 2.2. Make sure you have the proper `Node.js` version installed:

```

nvm use && nvm install

```

### 2.3. Install dependencies

```
yarn
```

## 3. Development

To start the development server:

```
yarn dev
```

To run tests use:

```
yarn test
```

The API endpoints are available for testing at the context `api-docs`.

## 5. Build

To build project to `dist` directory:

```
yarn build
```
