
<p>This repository is a modern monorepo boilerplate using **React**, **Rsbuild**, and other cutting-edge tools. It includes fast builds, strict code quality, and a scalable architecture for large React applications.</p>

## 📦 Tech Stack
- **React** – Experimental version with latest features
- **React Router** – Declarative routing for SPAs
- **TypeScript** – Strongly typed JavaScript for better developer experience
- **React Error Boundary** – Error handling for React components

### Build Tooling
- **RSBuild** – Fast Rspack-based bundler, great for modern React apps
- **Turborepo** – High-performance monorepo orchestration
- **pnpm Workspaces** – Efficient dependency management across packages

### Developer Experience
- **Plop.js** – CLI scaffolding for components, pages, etc.
- **Biome.js** – Formatter, linter, and code quality tool (replaces ESLint + Prettier)
- **Lefthook** – Git hooks runner for formatting, linting, testing
- **Commitlint** – Enforce Conventional Commit messages

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ui-foundry/react-microfrontend.git
cd react-microfrontend
```

### 2. Install Dependencies

Make sure you have [pnpm](https://pnpm.io/) installed, then run:

```bash
pnpm install
```

### 3. Start the Development or Preview Server

Replace `{app-name}` with the name of the app.  
📦 You can find the app name in the `package.json` file under the `"name"` field.


```bash
pnpm start {app-name} --mode=dev      # Development mode
pnpm start {app-name} --mode=preview  # Preview mode
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the app.

### 5. Build for Production

You can either build a specific app or all apps in the workspace:

To build a specific app, run:

```bash
pnpm build {app-name}
```

To build all apps, run:

```bash
pnpm build
```

## 🐳 Docker Setup
