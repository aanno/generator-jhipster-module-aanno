interface IPromptAnswers {
  message: string
}

export class CBaseGenerator {
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

