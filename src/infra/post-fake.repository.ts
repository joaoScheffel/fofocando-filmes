import {PostRepository} from "../domain/repositories/post.repository";
import Post from "../domain/entities/post";

export class PostFakeRepository implements PostRepository {
    constructor(
        public posts: Post[] = []
    ) {}

    async save(post: Post): Promise<void> {
        this.posts.push(post)
    }

    async getPostByUuid(postUuid: string): Promise<Post> {
        return this.posts.find((post) => post.getPostUuid() === postUuid)
    }

    async updateOne(post: Post): Promise<void> {

    }
}