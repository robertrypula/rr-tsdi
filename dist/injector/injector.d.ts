interface InjectorInterface {
    registerValue(name: string, valueItem: any): void;
    registerClass(name: string, classItem: any): void;
    registerService(name: string, serviceItem: any): void;
    get(name: string): any;
}
interface InjectorStatic {
    new (): InjectorInterface;
}
declare class Injector implements InjectorInterface {
    private injectRepository;
    private resolveRecursionCounter;
    constructor();
    registerValue(name: string, valueItem: any): void;
    registerClass(name: string, classItem: any): void;
    registerService(name: string, serviceItem: any): void;
    get(name: string): any;
    private register(name, item, itemType);
    private resolveRecursionInc();
    private resolveRecursionDec();
    private getInjectRepositoryEntry(name);
}
export { InjectorInterface, InjectorStatic, Injector };
