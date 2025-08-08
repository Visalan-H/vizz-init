# vizz-init

[![npm](https://img.shields.io/npm/v/vizz-init?style=flat&color=black&labelColor=white)](https://www.npmjs.com/package/vizz-init)<br>

Generate Express.js projects with folder structure and starter code.

## Installation

You can use this package without installing it globally by using npx:

```bash
npx vizz-init [project-name]
```

## Usage

### Basic Usage

Create a new backend project in the current directory:

```bash
npx vizz-init
```

This will create a `backend` folder with the Express.js boilerplate.

### Custom Project Name

Specify a custom project directory name:

```bash
npx vizz-init my-api-project
```

## What it creates

When you run `npx vizz-init`, it will:

1. **Create a new directory** (default: `backend` or your specified name)
2. **Initialize npm** with `npm init -y`
3. **Install dependencies**: Express.js and dotenv
4. **Generate a basic server.js file** with:
   - Express app setup
   - JSON middleware
   - Environment variable configuration
   - Dynamic PORT from .env file
   - Basic "Hello, world!" route
5. **Create environment files**:
   - `.env` file with PORT=3000
   - `.gitignore` with Node.js exclusions
6. **Create project structure** with folders:
   - `models/` - for database models
   - `controllers/` - for route controllers
   - `routes/` - for route definitions
   - `middleware/` - for custom middleware
7. **Update package.json** with useful scripts:
   - `npm start` - runs the server with node
   - `npm run dev` - runs the server with nodemon for development

## Generated Project Structure

```
your-project/
├── package.json
├── server.js
├── controllers/
├── middleware/
├── models/
└── routes/
```

## Getting Started with Generated Project

After running `vizz-init`, navigate to your project and start development:

```bash
cd backend  # or your custom project name
npm run dev
```

Your server will be running at `http://localhost:3000`

## Requirements

- Node.js (version 12 or higher)
- npm

## License

MIT

## Author

Visalan H

## Contributing

Feel free to submit issues and enhancement requests!

---

*P.S. - This tool exists because I got tired of typing `mkdir` over and over again.
