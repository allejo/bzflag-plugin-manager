import * as xcode from 'xcode';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const xcodeProjectPath = resolve('../development/Xcode/BZFlag.xcodeproj/project.pbxproj');
const xcodeProject = xcode.project(xcodeProjectPath);

xcodeProject.parseSync();

const newPluginName = 'neutralZones';
const newPluginTarget = xcodeProject.addTarget(newPluginName, 'dynamic_library')
const newPluginFilesGroup = xcodeProject.addPbxGroup([
    'LICENSE.md',
    'README.neutralZones.md',
    'README.md',
    'neutralZones.cpp',
], newPluginName, newPluginName);

xcodeProject.pbxGroupByName('plugins').children.push({
    value: newPluginFilesGroup.uuid,
    comment: newPluginName,
});
xcodeProject.addBuildPhase(
    ['neutralZones.cpp'],
    'PBXSourcesBuildPhase',
    'neutralZones.cpp in Sources',
    newPluginTarget.uuid,
    'resources'
)
xcodeProject.addBuildPhase(
    ['libplugin_utils.a'],
    'PBXFrameworksBuildPhase',
    'libplugin_utils.a in Frameworks',
    newPluginTarget.uuid,
);
const buildPhase = xcodeProject.addBuildPhase(
    ['README.neutralZones.md'],
    'PBXCopyFilesBuildPhase',
    'Copy Files',
    newPluginTarget.uuid,
)
buildPhase.buildPhase.dstSubfolderSpec = 7;

xcodeProject.updateBuildProperty('OTHER_LDFLAGS', ["\"-undefined\"", "dynamic_lookup"], "Debug", `"${newPluginName}"`)
xcodeProject.updateBuildProperty('OTHER_LDFLAGS', ["\"-undefined\"", "dynamic_lookup"], "Release", `"${newPluginName}"`)

writeFileSync(xcodeProjectPath, xcodeProject.writeSync());
