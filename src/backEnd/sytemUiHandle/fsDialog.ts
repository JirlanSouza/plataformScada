import { dialog } from 'electron';
import { homedir } from 'os';

export async function openFolderDialog(title: string) {
  const directoryPath = await dialog.showOpenDialog({
    title,
    properties: ['openDirectory'],
    defaultPath: homedir(),
  });
  console.log('DIRECTORY :', directoryPath);

  if (directoryPath.canceled) return false;

  return directoryPath.filePaths[0];
}
