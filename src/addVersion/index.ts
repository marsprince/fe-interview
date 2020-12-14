// add a version property in global

const fs = require('fs')
const path = require('path')

interface versionOptions {
  entryFile?: string
  projectName?: string
  version?: string
  globalProperty?: string
}
/**
 *
 * @param options
 * @param options.entryFile: entry file name, default is main in package.json
 * @param options.globalProperty: window.globalProperty, default is '__version__'
 * @param options.projectName: name in package.json
 * @param options.version: version in package.json
 */
export const addVersion = (options: versionOptions) => {
  const packageJson = JSON.parse(fs.readFileSync(path.join('','package.json'), 'utf-8'))
  // the entry file
  const entryFile = options.entryFile || packageJson.main;
  const projectName = options.projectName || packageJson.name;
  const version = options.version || packageJson.version;
  const globalProperty = options.globalProperty || '__version__';

  const versionStr =
    `if(!window.${globalProperty}){window.${globalProperty}={}}; //eslint-disable-line \r\n` +
    `window.${globalProperty}['${projectName}'] = '${version}'; //eslint-disable-line`;
  const main = fs.readFileSync(entryFile, 'utf-8')
  fs.writeFileSync(entryFile,main + versionStr)
}
