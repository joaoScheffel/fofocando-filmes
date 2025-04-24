import Post, {PostTypeEnum} from "../domain/entities/post";
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
        const createdPost = Post.create({
            title: input.title,
            type: input.type,
            genders: input.genders,
            categories: input.categories,
            releaseDate: input.releaseDate,
            director: input.director,
            whereWatch: input.whereWatch,
            mainCast: input.mainCast,
            hasAward: input.hasAward,
            awards: input.awards,
            funFacts: input.funFacts,
            coverImage: input.coverImage,
            cardImage: input.cardImage,
            movieDurationHours: input.movieDurationHours,
            seasons: input.seasons,
            createdBy: input.createdBy,
        })
        await this.postRepository.save(createdPost)
        return {
            postUuid: createdPost.getPostUuid()
        }
    }
}

export interface CreatePostInput {
    title: string
    type: PostTypeEnum
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