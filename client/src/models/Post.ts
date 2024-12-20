import { User } from './UserData';

export interface Post {
    _id: string;
    text: string;
    user: User;
    comments: Comment[] | null;
}

export interface Comment {
    id: string;
    text: string;
    user: User;
}