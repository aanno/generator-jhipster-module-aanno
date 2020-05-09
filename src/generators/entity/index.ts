import { bold, yellow, red, green, white } from "chalk"
import { IBaseGeneratorConstructor } from "../../../types"
import {join} from "path";

const BaseGenerator: IBaseGeneratorConstructor = require("generator-jhipster/generators/generator-base")
const jhipsterConstants = require("generator-jhipster/generators/generator-constants")
// Not working for dist
// const packagejs = require("../../package.json")
const packagejs = {
  version: "dummmy",
  dependencies: {
    dummy: "dummy-1.1.0"
  }
}

export = class EntityGenerator extends BaseGenerator {
    get initializing() {
        const that = this
        return {
            readConfig() {
                that.entityConfig = (that.options as any).entityConfig
                that.jhipsterAppConfig = that.getAllJhipsterConfig()
                if (!that.jhipsterAppConfig) {
                    that.error("Cannot read .yo-rc.json")
                }
            },
            displayLogo() {
                that.log(white(`Running ${bold("JHipster rain")} Generator! ${yellow(`v${packagejs.version}\n`)}`))
            },
            validate() {
                // this shouldn't be run directly
                if (!that.entityConfig) {
                    that.env.error(
                        `${red.bold("ERROR!")} This sub generator should be used only from JHipster and cannot be run directly...\n`
                    )
                }
            }
        }
    }

    prompting() {
        this.warning("module-aanno: entiy: prompting")
        // don't prompt if data are imported from a file
        if (
            this.entityConfig.useConfigurationFile === true &&
            this.entityConfig.data &&
            typeof this.entityConfig.data.yourOptionKey !== "undefined"
        ) {
            this.yourOptionKey = this.entityConfig.data.yourOptionKey
            return
        }
        const done = this.async()
        const prompts = [
            {
                type: "confirm",
                name: "enableOption",
                message: "Some option here?",
                default: false
            }
        ]

        this.prompt(prompts).then(answers => {
            this.promptAnswers = answers
            // To access props answers use this.promptAnswers.someOption;
            done()
        })
    }

    get writing() {
        const that = this
        return {
            updateFiles() {
                that.warning("module-aanno: entiy: writing/updateFiles")
                // read config from .yo-rc.json
                that.baseName = that.jhipsterAppConfig.baseName
                that.packageName = that.jhipsterAppConfig.packageName
                that.packageFolder = that.jhipsterAppConfig.packageFolder
                that.clientFramework = that.jhipsterAppConfig.clientFramework
                that.clientPackageManager = that.jhipsterAppConfig.clientPackageManager
                that.buildTool = that.jhipsterAppConfig.buildTool

                // use function in generator-base.js from generator-jhipster
                that.angularAppName = that.getAngularXAppName()

                // use constants from generator-constants.js
                const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + that.packageFolder}/`
                const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR
                const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR

                const entityName = that.entityConfig.entityClass

                // show all variables
                that.log("\n--- some const ---")
                that.log(`javaDir=${javaDir}`)
                that.log(`resourceDir=${resourceDir}`)
                that.log(`webappDir=${webappDir}`)

                that.log("\n--- entityName ---")
                that.log(`entityName=${entityName}`)

                that.log("------\n")

                // do your stuff here
            },

            writeFiles() {
                that.template("dummy.txt", "dummy.txt")
            },

            updateConfig() {
                that.updateEntityConfig(that.entityConfig.filename, "yourOptionKey", that.yourOptionKey)
            }
        }
    }

    end() {
        if (this.yourOptionKey) {
            this.log(`\n${bold.green("rain enabled")}`)
        }
    }

    templatePath: (a: string) => string = a => {
      const result = join(__dirname, "../../../templates/entity/", a)
      this.warning("templatePath " + a + " " + result + " " + __dirname)
      return result
    }

}
