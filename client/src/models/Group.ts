import { IPost } from './../../../server/src/models/Post';

export interface Group {
    groupId: string;
    name: string;
    is_private: boolean;
    admin?: string;
    users?: string[];
    currentBook?: string;
    books?: string[];
    posts?: IPost[];
}

export interface NewGroupInput {
    name: string;
    is_private: boolean;
}