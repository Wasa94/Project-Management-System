import { Project } from './project.model';

export class Task {
    id: number;
    assignee: string;
    status: string;
    progress: number;
    deadline: Date;
    description: string;
    projectId: string;
    project: Project;
}