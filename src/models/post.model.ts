export interface IPostsResponse {
    postsArr: IPost[]
}
export interface IPost {
    body: string;
    id: string;
    title: string;
    userId: string;
}