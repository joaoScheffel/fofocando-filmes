import Post from "../domain/entities/post";
import {InternalUserRepository} from "../domain/repositories/internal-user.repository";
import {PostRepository} from "../domain/repositories/post.repository";

export default class CreatePost {
    constructor(
        private postRepository: PostRepository,
        private internalUserRepository: InternalUserRepository
    ) {}

    async execute(input: CreatePostInput): Promise<CreatePostOutput> {
        const internalUser = await this.internalUserRepository.getInternalUserByUuid(input.createdBy)
        if (!internalUser?.internalUserUuid?.length) throw new Error("Internal user not found")
        const createdPost = Post.create(
            input.title,
            input.type,
            input.genders,
            input.categories,
            input.releaseDate,
            input.director,
            input.whereWatch,
            input.mainCast,
            input.hasAward,
            input.awards,
            input.funFacts,
            input.coverImage,
            input.cardImage,
            input.movieDurationHours,
            input.seasons,
            input.createdBy,
        )
        await this.postRepository.save(createdPost)
        return {
            postUuid: createdPost.postUuid
        }
    }
}

export interface CreatePostInput {
    title: string
    type: string
    genders: string[]
    categories: string[]
    releaseDate: Date
    director: string
    whereWatch: string[]
    mainCast: {
        name: string
        photo: string
    }[]
    hasAward: boolean
    awards: {
        category: string
        awardType: string
        year: number
    }[]
    funFacts: {
        name: string,
        description: string
    }[]
    coverImage: string
    cardImage: string
    movieDurationHours: number
    seasons: {
        seasonName: string,
        releaseDate: Date,
        episodesCount: number
    }[]
    createdBy: string
}

export interface CreatePostOutput {
    postUuid: string
}