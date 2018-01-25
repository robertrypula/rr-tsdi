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
        let injectList = injectListGenerate(INJECT_LIST_LENGTH_LIMIT + 1);

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
        let injectList = injectListGenerate(INJECT_LIST_LENGTH_LIMIT + 1);

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
}

const injectListJoin = (injectList: IArguments | any[]): string => {
  let result = '';

  for (let i = 0; i < injectList.length; i++) {
    result += `<${injectList[i]}>`;
  }

  return result;
}

/*
  p00: any, p01: any, p02: any, p03: any,
  p04: any, p05: any, p06: any, p07: any,
  p08: any, p09: any, p10: any, p11: any
*/

const wrapperFunction = function() {
  return injectListJoin(arguments);
};

const factoryFunction = function() {
  this.result = injectListJoin(arguments);
};
