import loadable from "@loadable/component";
import { WrapModuleFederation } from "@repo/core/components";

(async () => {
   const App = loadable(() => import("./App"));
   await WrapModuleFederation(<App />);
})();
