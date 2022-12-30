import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function isBZFlagProject(path: string): boolean {
  const files = readdirSync(path);
  const hasDevInfo = files.includes('DEVINFO');

  if (!hasDevInfo) {
    return false;
  }

  const devInfo = readFileSync(resolve(path, 'DEVINFO'), 'utf-8');

  return devInfo.includes('BZFlag');
}
