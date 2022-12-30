import * as mock from 'mock-fs';

import { BZFlagPlugin } from '../../src/utilities/BZFlagPlugin';

const pluginFolder = '/app/samplePlugin';
const filesystem = {
  'LICENSE.md': '',
  'Makefile.am': '',
  'README.md': '',
  'README.samplePlugin.md': '',
  'samplePlugin.cpp': `
    #include "bzfsAPI.h"
    #include "plugin_utils.h"

    class GenericClass : public bz_Plugin
    {
    };
  `,
  'samplePlugin.def': '',
  'samplePlugin.sln': '',
  'samplePlugin.vcxproj': '',
  'samplePlugin.vcxproj.filters': '',
};

function mapKeys(
  obj: Record<string, any>,
  callback: (key: string) => string,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([filename, contents]) => [
      callback(filename),
      contents,
    ]),
  );
}

describe('BZFlagPlugin Class', () => {
  beforeEach(() => {
    mock(mapKeys(filesystem, (key) => `${pluginFolder}/${key}`));
  });

  afterEach(() => {
    mock.restore();
  });

  it('should load a plugin metadata automatically', () => {
    const plugin = BZFlagPlugin.loadPluginFromFolder(pluginFolder);

    expect(plugin.name).toEqual('samplePlugin');
    expect(plugin.realPath).toEqual(pluginFolder);
    expect(plugin.fileNames).toEqual(
      Object.keys(filesystem).map((file) => file.replace(pluginFolder, '')),
    );
    expect(plugin.xcodeFiles).toEqual([
      'LICENSE.md',
      'README.md',
      'samplePlugin.cpp',
    ]);
    expect(plugin.entryPoint).toEqual('samplePlugin.cpp');
    expect(plugin.needsPluginUtils).toBe(true);
  });
});
