import Post from "./Post";

export default interface User{
    id: string;
    name: string;
    email: string;
    photo:string;
    password:string;
    post?: Post;
}