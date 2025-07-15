import { dependencies } from "../../../package.json";

interface ISharedConfig {
   /**
    * Include the provided and fallback module directly instead behind an async request. This allows to use this shared module in initial load too. All possible shared modules need to be eager too.
    */
   eager?: boolean;
   /**
    * Provided module that should be provided to share scope. Also acts as fallback module if no shared module is found in share scope or version isn't valid. Defaults to the property name.
    */
   import?: false | string;
   /**
    * Package name to determine required version from description file. This is only needed when package name can't be automatically determined from request.
    */
   packageName?: string;
   /**
    * Version requirement from module in share scope.
    */
   requiredVersion?: false | string;
   /**
    * Module is looked up under this key from the share scope.
    */
   shareKey?: string;
   /**
    * Share scope name.
    */
   shareScope?: string;
   /**
    * Allow only a single version of the shared module in share scope (disabled by default).
    */
   singleton?: boolean;
   /**
    * Do not accept shared module if version is not valid (defaults to yes, if local fallback module is available and shared module is not a singleton, otherwise no, has no effect if there is no required version specified).
    */
   strictVersion?: boolean;
   /**
    * Version of the provided module. Will replace lower matching versions, but not higher.
    */
   version?: false | string;
}

interface SharedObject {
   /**
    * Modules that should be shared in the share scope.
    */
   [k: string]: ISharedConfig | string;
}

type TShared = (string | SharedObject)[] | SharedObject;

export const sharedModuleFederation = () => {
   const mapDependencies: TShared = {};
   for (const key of Object.keys(dependencies)) {
      const version = (dependencies as Record<string, string>)[key];
      mapDependencies[key] = {
         singleton: true,
         eager: false,
         requiredVersion: version,
      };
   }
   return mapDependencies;
};
