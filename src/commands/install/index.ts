import { Command, Flags } from '@oclif/core';
import { join, resolve } from 'node:path';

import { getOS, OperatingSystem } from '../../utilities/operating-system';
import { isBZFlagProject } from '../../utilities/project';
import { installToXcode } from '../../utilities/xcode';

enum BuildSystem {
  Make = 'make',
  VisualStudio = 'visualstudio',
  Xcode = 'xcode',
}

const buildSystems = {
  [BuildSystem.Make]: BuildSystem.Make,
  [BuildSystem.VisualStudio]: BuildSystem.VisualStudio,
  [BuildSystem.Xcode]: BuildSystem.Xcode,
};

function getBuildSystemFromOS(): BuildSystem {
  switch (getOS()) {
    case OperatingSystem.macOS:
      return BuildSystem.Xcode;

    case OperatingSystem.Windows:
      return BuildSystem.VisualStudio;

    case OperatingSystem.Unix:
      return BuildSystem.Make;
  }
}

export default class Install extends Command {
  static description = 'Install a plugin to the current build system';

  static flags = {
    buildSystem: Flags.string({
      char: 'b',
      description: 'Which build system to touch',
      required: false,
    }),
    projectPath: Flags.string({
      char: 'p',
      description: 'Path to the location of the BZFlag clone',
      required: false,
    }),
  };

  static args = [
    {
      name: 'plugin',
      description: 'The plugin to install to the build system',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Install);
    const buildSystem = this.getBuildSystem(flags.buildSystem);

    let projectPath: string;

    try {
      projectPath = this.getProjectPath(flags.projectPath);
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }

      this.exit(1);
      return;
    }

    switch (buildSystem) {
      case BuildSystem.Xcode:
        installToXcode(
          join(projectPath, 'plugins', args.plugin),
          join(projectPath, 'Xcode/BZFlag.xcodeproj/project.pbxproj'),
        );
        break;

      default:
        this.error(`Unsupported build system: ${buildSystem}`);
    }
  }

  private getBuildSystem(buildSystem?: string): BuildSystem {
    let value: BuildSystem | undefined;

    if (typeof buildSystem === 'string') {
      value = buildSystems[buildSystem as keyof typeof buildSystems];
    }

    if (value === undefined) {
      value = getBuildSystemFromOS();
    }

    return value;
  }

  private getProjectPath(projectPath?: string): string {
    const projPath = resolve(projectPath ?? process.cwd());

    if (isBZFlagProject(projPath)) {
      return projPath;
    }

    throw Error('Could not determine a valid BZFlag project');
  }
}
