import { describe, beforeEach } from "mocha"
import { join } from "path"
import {copySync, mkdirsSync} from "fs-extra"
import { file } from "yeoman-assert"
import { Constructor, run } from "yeoman-test"
// import "../generators/app"
const MyGenerator = require("../generators/app")

describe("JHipster generator aanno", () => {
    // const generator: Constructor<Generator> = MyGenerator.new
    describe("Test with Maven and AngularX", () => {
        beforeEach(done => {
            // run(join(__dirname, '../generators/app'))
            run(MyGenerator as any)
                .inTmpDir(dir => {
                    // copySync(join(__dirname, "../../package.json"), dir)
                    mkdirsSync(join(dir, "templates"))
                    copySync(join(__dirname, "../generators/app"), dir)
                    copySync(join(__dirname, "../../templates/app/dummy.txt"),
                      join(dir, "templates/dummy.txt"))
                    copySync(join(__dirname, "../../templates/test/maven-angularX"), dir)
                })
                .withOptions({
                    testmode: true
                })
                .withPrompts({
                    message: "simple message to say hello"
                })
                .on("end", done)
        })

        it("generate dummy.txt file", () => {
            file(["dummy-maven.txt", "dummy-angularX.txt"])
        })
    })

    describe("Test with Gradle and React", () => {
        beforeEach(done => {
            // run(join(__dirname, '../generators/app'))
            run(MyGenerator as any)
                .inTmpDir(dir => {
                    mkdirsSync(join(dir, "templates/test"))
                    copySync(join(__dirname, "../generators/app"), dir)
                    copySync(join(__dirname, "../../templates/app/dummy.txt"),
                      join(dir, "templates/dummy.txt"))
                    copySync(join(__dirname, "../../templates/test/gradle-react"), dir)
                })
                .withOptions({
                    testmode: true
                })
                .withPrompts({
                    message: "simple message to say hello"
                })
                .on("end", done)
        })

        it("generate dummy.txt file", () => {
            file(["dummy-gradle.txt", "dummy-react.txt"])
        })
    })
})
