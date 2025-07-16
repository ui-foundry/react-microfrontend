import loadable from "@loadable/component";
import { loadRemote } from "@module-federation/enhanced/runtime";
import { type ComponentType, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { NavLink, Outlet, Route, Routes } from "react-router";

interface IRemoteModule {
   default: ComponentType;
}

const AppRemote = loadable(
   async () => {
      const module = await loadRemote<IRemoteModule>("remote/App");
      if (!module) {
         throw new Error(`Failed to load remote module: remote/App`);
      }
      return module;
   },
   {
      fallback: <p>Loading App...</p>,
      resolveComponent: (module: IRemoteModule) => module?.default,
   },
);

const App = () => {
   const [count, setCount] = useState(0);

   return (
      <div className="content">
         <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
               Home
            </NavLink>
            <NavLink to="/remote" className={({ isActive }) => (isActive ? "active" : "")}>
               remote app
            </NavLink>
         </nav>
         <div>
            <h1>React Monorepo!</h1>
            <p>This is host app count: {count}</p>
            <button onClick={() => setCount((c) => c + 1)} style={{ padding: 10 }} type={"button"}>
               Increment count
            </button>
         </div>
         <Routes>
            <Route path="/" element={<Outlet />}>
               <Route
                  path={"remote"}
                  element={
                     <ErrorBoundary fallback={<p>error loading remote app</p>}>
                        <AppRemote />
                     </ErrorBoundary>
                  }
               />
               <Route path="*" element={<p>page not found</p>} />
            </Route>
         </Routes>
      </div>
   );
};

export default App;
