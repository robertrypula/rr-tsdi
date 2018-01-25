interface InjectorInterface {
    registerValue(name: string, valueItem: any): void;
    registerClass(name: string, classItem: any): void;
    registerService(name: string, serviceItem: any): void;
    get(name: string): any;
}
interface InjectorStatic {
    new (recursionLimit: number): InjectorInterface;
}
declare class Injector implements InjectorInterface {
    private recursionLimit;
    private injectRepository;
    private recursionCounter;
    constructor(recursionLimit?: number);
    registerValue(name: string, valueItem: any): void;
    registerService(name: string, serviceItem: any): void;
    registerClass(name: string, classItem: any): void;
    get(name: string): any;
    private register(name, item, itemType);
    private recursionInc();
    private recursionDec();
    private getInjectRepositoryEntry(name);
}
export { InjectorInterface, InjectorStatic, Injector };
