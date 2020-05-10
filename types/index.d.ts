interface IOptions {
    entityConfig: any
    yourOptionKey: string
}

interface IJHipsterAppConfig {
    baseName: string
    packageName: string
    packageFolder: string
    clientFramework: any
    clientPackageManager: any
    angularAppName: string
    buildTool: any
    jhipsterVersion: string
}

interface ILogging {
    log: (msg: string) => void
    error: (msg: string) => void
    warning: (msg: string) => void
}

interface IPromptAnswers {
    message: string
}

export class CBaseGenerator implements IOptions, ILogging, IJHipsterAppConfig {
    message: string

    jhipsterAppConfig: IJHipsterAppConfig

    baseName: string

    packageName: string

    packageFolder: string

    clientFramework: any

    clientPackageManager: any

    angularAppName: string

    jhipsterVersion: string

    buildTool: any

    template: any

    options: Map<string, any>

    promptAnswers: IPromptAnswers

    entityConfig: any

    yourOptionKey: string

    env: any // ILogging

    getAllJhipsterConfig: () => any

    getAngularAppName: () => string

    getAngularXAppName: () => string

    printJHipsterLogo: () => void

    async: () => any

    prompt: (a: Array<any>) => Promise<any>

    registerModule: (...module: string[]) => void

    installDependencies: (object) => void

    updateEntityConfig: (filename: string, key: string, value: string) => void

    log: (msg: string) => void

    error: (msg: string) => void

    warning: (msg: string) => void
}

interface IBaseGeneratorConstructor {
    new (...args: any): CBaseGenerator
}
