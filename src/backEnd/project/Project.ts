import fs from 'fs';
import path from 'path';
import { ProjectConection } from './Conetion';
import { Id } from './Id';
import { ProjectImagePath } from './Image';
import { ProjectScreen } from './Screen';
import { ProjectScript } from './Script';
import { ProjectUserAndUsersGroup } from './serAndUsersGroup';
import { ProjectTableAlarms } from './TableAlarms';
import { ProjectTableEvents } from './TableEvents';
import { ProjectTableTags } from './TableTags';

interface ProjectStructure {
  id: Id;
  name: string;
  version: string;
  platformVersion: string;
  conections: ProjectConection[];
  screens: ProjectScreen[];
  images: ProjectImagePath[];
  scripts: ProjectScript[];
  tags: ProjectTableTags[];
  alarms: ProjectTableAlarms[];
  events: ProjectTableEvents[];
  usersAndUsersGroups: ProjectUserAndUsersGroup;
}

export class Project {
  readonly id: Id;

  readonly name: string;

  readonly version: string;

  readonly platformVersion: string;

  readonly conections: ProjectConection[];

  readonly screens: ProjectScreen[];

  readonly images: ProjectImagePath[];

  readonly scripts: ProjectScript[];

  readonly tags: ProjectTableTags[];

  readonly alarms: ProjectTableAlarms[];

  readonly events: ProjectTableEvents[];

  readonly usersAndUsersGroups: ProjectUserAndUsersGroup;

  constructor(ProjectSturcture: ProjectStructure) {
    this.id = ProjectSturcture.id;
    this.name = ProjectSturcture.name;
    this.version = ProjectSturcture.version;
    this.platformVersion = ProjectSturcture.platformVersion;
    this.conections = ProjectSturcture.conections;
    this.screens = ProjectSturcture.screens;
    this.images = ProjectSturcture.images;
    this.scripts = ProjectSturcture.scripts;
    this.tags = ProjectSturcture.tags;
    this.alarms = ProjectSturcture.alarms;
    this.events = ProjectSturcture.events;
    this.usersAndUsersGroups = ProjectSturcture.usersAndUsersGroups;
  }

  static load(projectPath: string) {
    if (
      !fs.existsSync(path.join(projectPath, 'platFormScadaProject.config.json'))
    ) {
      return false;
    }

    const projectConfig = JSON.parse(
      fs
        .readFileSync(
          path.join('./projects', 'platFormScadaProject.config.json')
        )
        .toString()
    );

    const folders = fs.readdirSync(projectPath);

    const ProjectStructureFolders = folders.reduce(
      (acumulator, currentFolder) => {
        const dirPath = path.join(projectPath, currentFolder);

        if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isFile()) {
          return acumulator;
        }

        const folderFilder = fs.readdirSync(dirPath);

        const fild = folderFilder.reduce((fildAcumulator, currentFild) => {
          const dirFildPath = path.join(
            projectPath,
            currentFolder,
            currentFild
          );

          if (
            fs.existsSync(dirFildPath) &&
            fs.lstatSync(dirFildPath).isFile()
          ) {
            const fildFile = JSON.parse(
              fs.readFileSync(dirFildPath).toString()
            );

            const fildFileName = currentFild.substr(
              0,
              currentFild.lastIndexOf('.')
            );

            return { ...fildAcumulator, [fildFileName]: fildFile };
          }

          return {
            ...fildAcumulator,
          };
        }, {});

        return {
          ...acumulator,
          [currentFolder]: fild,
        };
      },
      projectConfig as ProjectStructure
    );

    fs.writeFileSync(
      './projectStructureTeste.json',
      JSON.stringify(ProjectStructureFolders)
    );

    // eslint-disable-next-line consistent-return
    return new Project(ProjectStructureFolders);
  }
}
