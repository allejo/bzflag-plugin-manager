declare module 'xcode' {
  interface XcodeProjectBuildPhaseAddition {
    uuid: string;
    buildPhase: XcodeProjectBuildPhase;
  }
  interface XcodeProjectBuildPhase {
    dstSubfolderSpec: number;
  }
  interface XcodeProjectTargetAddition {
    uuid: string;
    pbxTarget: XcodeProjectTarget;
  }
  interface XcodeProjectTarget {}
  interface XcodeProjectGroupAddition {
    uuid: string;
    pbxGroup: XcodeProjectGroup;
  }
  interface XcodeProjectGroup {
    children: {
      value: string;
      comment: string;
    }[];
  }

  interface XcodeProject {
    addBuildPhase(
      filePaths: string[],
      buildBaseType: string,
      comment: string,
      targetUUID: string,
      optionsOrFolderType?: string,
    ): XcodeProjectBuildPhaseAddition;
    addTarget(
      name: string,
      type: 'dynamic_library',
    ): XcodeProjectTargetAddition;
    addPbxGroup(
      filePaths: string[],
      groupName: string,
      path: string,
    ): XcodeProjectGroupAddition;
    pbxGroupByName(name: string): XcodeProjectGroup;
    parseSync(): void;
    updateBuildProperty(
      prop: string,
      value: string[],
      build: 'Debug' | 'Release',
      targetName: string,
    ): void;
    writeSync(): string;
  }

  function project(pbxProj: string): XcodeProject;
}
