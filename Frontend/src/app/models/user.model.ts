import { Task } from './task.model';

export interface User {
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    role: string;
    tasks: Task[];
}