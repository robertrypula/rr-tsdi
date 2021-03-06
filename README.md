# RrTsdi

[![npm version](https://badge.fury.io/js/rr-tsdi.svg)](https://badge.fury.io/js/rr-tsdi)
[![Build Status](https://travis-ci.org/robertrypula/rr-tsdi.svg?branch=master)](https://travis-ci.org/robertrypula/rr-tsdi)
[![Coverage Status](https://coveralls.io/repos/github/robertrypula/rr-tsdi/badge.svg?branch=master)](https://coveralls.io/github/robertrypula/rr-tsdi?branch=master)

This library is very simple implementation of Dependency Injection written in TypeScript.

## Installation

Install as npm package:

```
npm install rr-tsdi --save
```

## Usage (TypeScript)

```typescript
const CONFIG = 'config';
const UTIL = 'util';

// ----------------------------

interface IConfig {
  login: string;
  password: string;
}

const config: IConfig = {
  login: 'mylogin',
  password: 'myp4$w0rd'
};

// ----------------------------

class Util {
  public static $inject = [CONFIG];
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  public login(): string {
    const test = this.config.login + ' ' + this.config.password;

    return test;
  }
}

// ----------------------------

import { Injector } from 'rr-tsdi';

const injector: Injector = new Injector();

injector.registerService(UTIL, Util);
injector.registerValue(CONFIG, config);

// ----------------------------

const util: Util = injector.get(UTIL);

console.log(util.login()); // 'mylogin myp4$w0rd'
```

## Usage directly in the browser (ES5)

```javascript
var injector = new RrTsdi.Injector();

// ----------------------------

var
  CONFIG = 'config',
  UTIL = 'util';

// ----------------------------

var config = {
  login: 'mylogin',
  password: 'myp4$w0rd'
};

injector.registerValue(CONFIG, config);

// ----------------------------

function Util(config) {
  this.config = config;
}

Util.$inject = [CONFIG];

Util.prototype.login = function () {
  var test = this.config.login + ' ' + this.config.password;

  return test;
}

injector.registerService(UTIL, Util);

// ----------------------------

var util = injector.get(UTIL);

document.write(util.login()); // 'mylogin myp4$w0rd'
```

## Usage in Node

```javascript
const CONFIG = 'config';
const UTIL = 'util';

// ----------------------------

const config = {
  login: 'mylogin',
  password: 'myp4$w0rd'
};

// ----------------------------

class Util {
  constructor(config) {
    this.config = config;
  }

  login() {
    const test = this.config.login + ' ' + this.config.password;

    return test;
  }
}

Util.$inject = [CONFIG];

// ----------------------------

const RrTsdi = require('rr-tsdi');
const Injector = RrTsdi.Injector;
const injector = new Injector();

injector.registerService(UTIL, Util);
injector.registerValue(CONFIG, config);

// ----------------------------

const util = injector.get(UTIL);

console.log(util.login()); // 'mylogin myp4$w0rd'
```

## Licence

The MIT License (MIT)

Copyright (c) 2018 Robert Rypuła

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

