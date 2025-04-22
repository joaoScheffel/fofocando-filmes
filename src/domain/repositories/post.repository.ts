import Post from "../entities/post";

export interface PostRepository {
    save: (post: Post) => Promise<void>
    getPostByUuid: (postUuid: string) => Promise<Post>
}