import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

export class BZFlagPlugin {
  private constructor(
    public readonly name: string,
    public readonly realPath: string,
    public readonly fileNames: string[],
  ) {}

  get entryPoint(): string {
    return `${this.name}.cpp`;
  }

  get entryPointPath(): string {
    return join(this.realPath, this.entryPoint);
  }

  get needsPluginUtils(): boolean {
    return readFileSync(this.entryPointPath).includes(
      '#include "plugin_utils.h"',
    );
  }

  get filesToCopyOnBuild(): string[] {
    return this.xcodeFiles.filter((file) => !/\.(cpp|cxx|h)$/.test(file));
  }

  get xcodeFiles(): string[] {
    return this.fileNames.filter((file) => {
      if (statSync(`${this.realPath}/${file}`).isSymbolicLink()) {
        return false;
      }

      if (file.endsWith(`.${this.name}.md`)) {
        return false;
      }

      if (/\.(bzw|cfg|confg|cpp|cxx|h|json|md)$/.test(file)) {
        return true;
      }

      return false;
    });
  }

  static loadPluginFromFolder(folder: string): BZFlagPlugin {
    const fullPath = resolve(folder);

    if (!statSync(fullPath).isDirectory()) {
      throw new Error('A folder must be given to load a plugin from');
    }

    return new BZFlagPlugin(
      basename(fullPath),
      fullPath,
      readdirSync(fullPath),
    );
  }
}
