declare var __webpack_public_path__: string;

export const getGlobalRemotes = () => {
   return globalThis.RemoteApps || [];
};

const runtimePlugin = () => ({
   name: "runtime-register-nested-remote",
   beforeRequest(args: { options: { remotes: any[] } }) {
      if (!args.options.remotes.length) {
         // Dynamically set public path based on current location
         const currentOrigin = window.location.origin;
         __webpack_public_path__ = `${currentOrigin}/`;
         args.options.remotes = getGlobalRemotes();
      }

      return args;
   },
});

export default runtimePlugin;
