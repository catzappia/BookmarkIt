import { Book } from "./Book";
// import { GroupId } from "./../model";

export interface UserLogin {
    username: string;
    email: string;
    password: string;
    savedBooks: Book[];
    // savedGroups: GroupId[]; // this will be an array of group ids
}