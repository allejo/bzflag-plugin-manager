import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as xcode from 'xcode';

import { BZFlagPlugin } from './BZFlagPlugin';

export function installToXcode(folder: string, pbxProject: string): boolean {
  const plugin = BZFlagPlugin.loadPluginFromFolder(folder);
  const xcodeProject = xcode.project(resolve(pbxProject));

  xcodeProject.parseSync();

  const pluginTarget = xcodeProject.addTarget(plugin.name, 'dynamic_library');
  const pluginFilesGroup = xcodeProject.addPbxGroup(
    plugin.xcodeFiles,
    plugin.name,
    plugin.name,
  );

  // Add the new plugin target to the `plugins` folder in the Xcode project
  xcodeProject.pbxGroupByName('plugins').children.push({
    value: pluginFilesGroup.uuid,
    comment: plugin.name,
  });

  // Tell Xcode to compile the plug-in's entrypoint as part of the plugin
  xcodeProject.addBuildPhase(
    [plugin.entryPoint],
    'PBXSourcesBuildPhase',
    `${plugin.entryPoint} in Sources`,
    pluginTarget.uuid,
    'resources',
  );

  if (plugin.needsPluginUtils) {
    xcodeProject.addBuildPhase(
      ['libplugin_utils.a'],
      'PBXFrameworksBuildPhase',
      'libplugin_utils.a in Frameworks',
      pluginTarget.uuid,
    );
  }

  const copyFilesBuildPhase = xcodeProject.addBuildPhase(
    plugin.filesToCopyOnBuild,
    'PBXCopyFilesBuildPhase',
    'Copy Files',
    pluginTarget.uuid,
  );
  copyFilesBuildPhase.buildPhase.dstSubfolderSpec = 7;

  xcodeProject.updateBuildProperty(
    'OTHER_LDFLAGS',
    ['"-undefined"', 'dynamic_lookup'],
    'Debug',
    `"${plugin.name}"`,
  );
  xcodeProject.updateBuildProperty(
    'OTHER_LDFLAGS',
    ['"-undefined"', 'dynamic_lookup'],
    'Release',
    `"${plugin.name}"`,
  );

  writeFileSync(pbxProject, xcodeProject.writeSync());

  return true;
}
