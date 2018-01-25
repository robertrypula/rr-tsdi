declare const TO_MANY_INJECTIONS_EXCEPTION = "To many injections";
declare function injectDependenciesAndInstantiate(item: any, injectList: any[]): any;
declare function injectDependencies(item: any, injectList: any[]): any;
export { TO_MANY_INJECTIONS_EXCEPTION, injectDependenciesAndInstantiate, injectDependencies };
