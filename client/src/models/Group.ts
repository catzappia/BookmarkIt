export interface Group {
    groupId: string;
    name: string;
    description: string;
    is_private: boolean;
    admin?: string;
    users?: string[];
    currentBook?: string;
    books?: string[];
    posts?: string[];
}

export interface NewGroupInput {
    name: string;
    description: string;
}