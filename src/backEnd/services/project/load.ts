import { Project } from '../../project/Project';

export function load(path: string) {
  return Project.load(path);
}
