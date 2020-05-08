import {describe, beforeEach} from "mocha"
import {join} from "path"
import {copySync} from "fs-extra"
import {assert} from "yeoman-assert"
import {Constructor, run} from "yeoman-test"
import {Generator} from "yeoman-generator"
import {MyGenerator} from "../generators/app"

describe('JHipster generator aanno', () => {
  const generator: Constructor<Generator> = MyGenerator.new
  describe('Test with Maven and AngularX', () => {
    beforeEach(done => {
      // run(join(__dirname, '../generators/app/index.ts'))
      run(generator, {resolved: true})
        .inTmpDir(dir => {
          copySync(join(__dirname, '../test/templates/maven-angularX'), dir);
        })
        .withOptions({
          testmode: true
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .on('end', done);
    });

    it('generate dummy.txt file', () => {
      assert.file(['dummy-maven.txt', 'dummy-angularX.txt']);
    });
  });

  describe('Test with Gradle and React', () => {
    beforeEach(done => {
      run(join(__dirname, '../generators/app'))
        .inTmpDir(dir => {
          copySync(join(__dirname, '../test/templates/gradle-react'), dir);
        })
        .withOptions({
          testmode: true
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .on('end', done);
    });

    it('generate dummy.txt file', () => {
      assert.file(['dummy-gradle.txt', 'dummy-react.txt']);
    });
  });
});
