import { Task } from './task.model';

export interface Project {
    code: string;
    name: string;
    assignee: string;
    progress: string;
    task: Task[];
}