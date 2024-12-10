export interface Group {
    groupId: string;
    name: string;
    is_private: boolean;
    admin?: string;
    users?: string[];
    currentBook?: string;
    books?: string[];
}

export interface NewGroupInput {
    name: string;
    is_private: boolean;
}