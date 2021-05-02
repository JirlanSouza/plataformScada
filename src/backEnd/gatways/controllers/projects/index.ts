import { ipcMain } from 'electron';

import { openFolderDialog } from '../../../sytemUiHandle/fsDialog';
import { load } from '../../../services/project/load';
import { Project } from '../../../project/Project';

export function projectContollers() {
  ipcMain.on('openProject', async (event) => {
    const projectDirectoryPath = await openFolderDialog(
      'Select PlatForm Scada project'
    );

    let resultLoadProject: boolean | Project = false;
    if (projectDirectoryPath) {
      resultLoadProject = load(projectDirectoryPath);
    }

    event.reply('projectLoded', resultLoadProject);
  });
}
