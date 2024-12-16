import { IPost } from './../../../server/src/models/Post';
import { IUser } from './../../../server/src/models/User';

export interface Group {
    _id: string;
    name: string;
    description: string;
    is_private: boolean;
    admin?: IUser;
    profilePicture?: string;
    users?: IUser[];
    currentBook?: string;
    books?: string[];
    posts?: IPost[];
}

export interface NewGroupInput {
    name: string;
    description: string;
}