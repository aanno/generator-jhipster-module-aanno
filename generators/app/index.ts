import "chalk"
import {satisfies} from "semver"

interface IPromptAnswers {
  message: string
}

declare class CBaseGenerator {
  message: string
  jhipsterAppConfig: any
  baseName: string
  packageName: string
  packageFolder: string
  clientFramework: any
  clientPackageManager: any
  angularAppName: string
  buildTool: any
  template: any
  options: Map<string,string>
  promptAnswers: IPromptAnswers

  getAllJhipsterConfig: () => any
  getAngularAppName: () => string
  printJHipsterLogo: () => void
  async: () => any
  prompt: ([]) => Promise<any>
  registerModule: (...module: string[]) => void
  installDependencies: (object) => void

  log: (msg: string) => void
  error: (msg: string) => void
  warning: (msg: string) => void
}

interface IBaseGeneratorConstructor {
  new(): CBaseGenerator
}

const BaseGenerator: IBaseGeneratorConstructor = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const packagejs = require('../../package.json');

export class MyGenerator extends BaseGenerator {

  get initializing() {
    const that = this
    return {
      init(args) {
        if (args === 'default') {
          // do something when argument is 'default'
          that.message = 'default message';
        }
      },
      readConfig() {
        that.jhipsterAppConfig = that.getAllJhipsterConfig();
        if (!that.jhipsterAppConfig) {
          that.error('Cannot read .yo-rc.json');
        }
      },
      displayLogo() {
        // it's here to show that you can use functions from generator-jhipster
        // this function is in: generator-jhipster/generators/generator-base.js
        that.printJHipsterLogo();

        // Have Yeoman greet the user.
        that.log(`\nWelcome to the ${chalk.bold.yellow('JHipster aanno')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
      },
      checkJhipster() {
        const currentJhipsterVersion = that.jhipsterAppConfig.jhipsterVersion;
        const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
        if (!satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
          that.warning(
            `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
          );
        }
      }
    };
  }

  prompting() {
    const prompts = [
      {
        when: () => typeof this.message === 'undefined',
        type: 'input',
        name: 'message',
        message: 'Please put something',
        default: 'hello world!'
      }
    ];

    const done = this.async();
    this.prompt(prompts).then(answers => {
      this.promptAnswers = answers;
      // To access props answers use this.promptAnswers.someOption;
      done();
    });
  }

  writing() {
    // read config from .yo-rc.json
    this.baseName = this.jhipsterAppConfig.baseName;
    this.packageName = this.jhipsterAppConfig.packageName;
    this.packageFolder = this.jhipsterAppConfig.packageFolder;
    this.clientFramework = this.jhipsterAppConfig.clientFramework;
    this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
    this.buildTool = this.jhipsterAppConfig.buildTool;

    // use function in generator-base.js from generator-jhipster
    this.angularAppName = this.getAngularAppName();

    // use constants from generator-constants.js
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // variable from questions
    if (typeof this.message === 'undefined') {
      this.message = this.promptAnswers.message;
    }

    // show all variables
    this.log('\n--- some config read from config ---');
    this.log(`baseName=${this.baseName}`);
    this.log(`packageName=${this.packageName}`);
    this.log(`clientFramework=${this.clientFramework}`);
    this.log(`clientPackageManager=${this.clientPackageManager}`);
    this.log(`buildTool=${this.buildTool}`);

    this.log('\n--- some function ---');
    this.log(`angularAppName=${this.angularAppName}`);

    this.log('\n--- some const ---');
    this.log(`javaDir=${javaDir}`);
    this.log(`resourceDir=${resourceDir}`);
    this.log(`webappDir=${webappDir}`);

    this.log('\n--- variables from questions ---');
    this.log(`message=${this.message}`);
    this.log('------\n');

    if (this.clientFramework === 'react') {
      this.template('dummy.txt', 'dummy-react.txt');
    }
    if (this.clientFramework === 'angularX') {
      this.template('dummy.txt', 'dummy-angularX.txt');
    }
    if (this.buildTool === 'maven') {
      this.template('dummy.txt', 'dummy-maven.txt');
    }
    if (this.buildTool === 'gradle') {
      this.template('dummy.txt', 'dummy-gradle.txt');
    }
    try {
      this.registerModule('generator-jhipster-aanno', 'entity', 'post', 'entity', 'aanno&#39;s jhipster test module');
    } catch (err) {
      this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
    }
  }

  install() {
    const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

    const injectDependenciesAndConstants = err => {
      if (err) {
        this.warning('Install of dependencies failed!');
        this.log(logMsg);
      }
    };
    const installConfig = {
      bower: false,
      npm: this.clientPackageManager !== 'yarn',
      yarn: this.clientPackageManager === 'yarn',
      callback: injectDependenciesAndConstants
    };
    if (this.options['skip-install']) {
      this.log(logMsg);
    } else {
      this.installDependencies(installConfig);
    }
  }

  end() {
    this.log('End of aanno generator');
  }
};
