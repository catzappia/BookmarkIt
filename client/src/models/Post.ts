import { User } from './UserData';

export interface Post {
    id: string;
    text: string;
    user: User;
    comments: Comment[] | null;
}

export interface Comment {
    id: string;
    text: string;
    user: User;
}