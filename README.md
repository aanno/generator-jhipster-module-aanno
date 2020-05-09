# generator-jhipster-module-aannonno

[![NPM version][npm-image]][npm-url] [![Build Status][github-actions-image]][github-actions-url] [![Dependency Status][daviddm-image]][daviddm-url]

> JHipster module, aanno&#39;s jhipster test module

# Introduction

This is a [JHipster](https://www.jhipster.tech/) module, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-module-aannonno
```

To update this module:

```bash
npm update -g generator-jhipster-module-aannonno
```

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-module-aannonno
```

To update this module:

```bash
yarn global upgrade generator-jhipster-module-aannonno
```

# Usage

# License

Apache-2.0 © [Thomas Pasch]()

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-module-aannonno.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-module-aannonno
[github-actions-image]: https://github.com/aanno/generator-jhipster-module-aannonno/workflows/Build/badge.svg
[github-actions-url]: https://github.com/aanno/generator-jhipster-module-aannonno/actions
[daviddm-image]: https://david-dm.org/aanno/generator-jhipster-module-aannonno.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/aanno/generator-jhipster-module-aannonno

## Install from github

```bash
npm install -D aanno/generator-jhipster-module-aanno
```

## Hook

```bash
cat .jhipster/modules/jhi-hooks.json
```

```json
[
  {
    "name": "Aanno generator",
    "npmPackageName": "generator-jhipster-module-aanno",
    "description": "aanno&#39;s jhipster test module",
    "hookFor": "entity",
    "hookType": "post",
    "generatorCallback": "jhipster-module-aanno:entity"
  }
]
```

## Links

- [eslint with typescript](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
- [mocha tests with typescript](https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2)
- [prettier with eslint with typescript](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project/)
- [problem with es5/es6 classes](https://stackoverflow.com/questions/51860043/javascript-es6-typeerror-class-constructor-client-cannot-be-invoked-without-ne)
- https://github.com/yeoman/yeoman-test/issues/105
