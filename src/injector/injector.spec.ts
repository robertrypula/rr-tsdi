import { Injector } from './injector';

describe('injector', () => {
  let injector: Injector;

  beforeEach(() => {
    injector = new Injector();
  });

  it('should create valid instance', () => {
    expect(injector).toBeInstanceOf(Injector);
  });

  it('should properly handle value', () => {
    injector.registerValue('test', 'my value');
    expect(injector.get('test')).toBe('my value');
  });

  it('should properly handle service and keep only one instance of it', () => {
    let serviceA;
    let serviceB;

    injector.registerValue('value', 'some value');
    injector.registerService('service', Service);

    serviceA = injector.get('service');
    serviceB = injector.get('service');

    expect(serviceA).toBe(serviceB);
  });

  it('should properly handle wrapped class (or factory function) with optional dependencies', () => {
    let MyClass;
    let myClass;

    injector.registerValue('value', 'some value');
    injector.registerClass('MyClass', MyClassDiWrapper);

    MyClass = injector.get('MyClass');
    myClass = new MyClass('test');

    expect(myClass.getValue()).toBe('some value');
  });

  it('should create one instance of a service only on demand (lazy loading)', () => {
    // TODO test lazy loading
  });
});

class Service {
  public static $inject: string[] = ['value'];
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}

const MyClassDiWrapper: any = (value: string) => {
  /* tslint:disable-next-line:max-classes-per-file no-shadowed-variable */
  class MyClass {
    public getValue(): string {
      return value;
    }
  }

  return MyClass;
};
MyClassDiWrapper.$inject = ['value'];
