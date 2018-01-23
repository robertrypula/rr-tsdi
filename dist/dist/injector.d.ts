export interface InjectorInterface {
    registerValue(name: string, valueItem: any): void;
    registerClass(name: string, classItem: any): void;
    registerService(name: string, serviceItem: any): void;
    get(name: string): any;
}
export interface InjectorStatic {
    new (): InjectorInterface;
}
export declare class Injector implements InjectorInterface {
    private injectRepository;
    private resolveRecursionCounter;
    constructor();
    private static RESOLVE_RECURSION_LIMIT;
    private static RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION;
    private static MULTIPLE_REGISTER_EXCEPTION;
    private static UNABLE_TO_FIND_ITEM_EXCEPTION;
    private static TO_MANY_INJECTIONS_EXCEPTION;
    registerValue(name: string, valueItem: any): void;
    registerClass(name: string, classItem: any): void;
    registerService(name: string, serviceItem: any): void;
    get(name: string): any;
    private register(name, item, itemType);
    private resolveRecursionInc();
    private resolveRecursionDec();
    private getInjectRepositoryEntry(name);
    private static injectDependenciesAndInstantiate(item, injectList);
    private static injectDependencies(item, injectList);
}
