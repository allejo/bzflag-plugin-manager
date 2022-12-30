export enum OperatingSystem {
  macOS,
  Windows,
  Unix,
}

export function getOS(): OperatingSystem {
  switch (process.platform) {
    case 'darwin':
      return OperatingSystem.macOS;

    case 'win32':
      return OperatingSystem.Windows;

    case 'linux':
    default:
      return OperatingSystem.Unix;
  }
}
