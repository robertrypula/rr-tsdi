import {
  injectDependencies,
  injectDependenciesAndInstantiate,
  TO_MANY_INJECTIONS_EXCEPTION
} from './injector-helpers';

describe('injector-helpers', () => {

  it('should properly inject dependendies into item (inject without instance)', () => {
    let injectList;

    for (let i = 0; i <= INJECT_LIST_LENGTH_LIMIT; i++) {
      injectList = injectListGenerate(i);
      expect(injectDependencies(wrapperFunction, injectList)).toBe(injectListJoin(injectList));
    }
  });

  it('should fail when too many inject items are on the list (inject without instance)', () => {
    expect(
      () => {
        const injectList = injectListGenerate(INJECT_LIST_LENGTH_LIMIT + 1);

        injectDependencies(wrapperFunction, injectList);
      }
    ).toThrow(TO_MANY_INJECTIONS_EXCEPTION);
  });

  it('should properly inject dependendies into item (inject & instance)', () => {
    let injectList;
    let instance;

    for (let i = 0; i <= INJECT_LIST_LENGTH_LIMIT; i++) {
      injectList = injectListGenerate(i);
      instance = injectDependenciesAndInstantiate(factoryFunction, injectList);
      expect(instance.result).toBe(injectListJoin(injectList));
    }
  });

  it('should fail when too many inject items are on the list (inject & instance)', () => {
    expect(
      () => {
        const injectList = injectListGenerate(INJECT_LIST_LENGTH_LIMIT + 1);

        injectDependenciesAndInstantiate(factoryFunction, injectList);
      }
    ).toThrow(TO_MANY_INJECTIONS_EXCEPTION);
  });

});

const INJECT_LIST_LENGTH_LIMIT = 12;

const injectListGenerate = (length: number): any[] => {
  const injectList: any[] = [];

  for (let i = 0; i < length; i++) {
    injectList.push(i);
  }

  return injectList;
};

const injectListJoin = (injectList: IArguments | any[]): string => {
  let result = '';

  for (let i = 0; i < injectList.length; i++) {
    result += `<${injectList[i]}>`;
  }

  return result;
};

const wrapperFunction = function() {
  return injectListJoin(arguments);
};

const factoryFunction = function() {
  this.result = injectListJoin(arguments);
};
