import {PostRepository} from "../domain/repositories/post.repository";
import {InternalUserRepository} from "../domain/repositories/internal-user.repository";

export class UpdatePost {
    constructor(
        private postRepository: PostRepository,
        private internalUserRepository: InternalUserRepository
    ) {}

    async execute(input: UpdatePostInput): Promise<void> {
        const internalUser = await this.internalUserRepository.getInternalUserByUuid(input.internalUserUuid)
        if (!internalUser?.internalUserUuid?.length) throw new Error("Internal user not found")

        const postToUpdate = await this.postRepository.getPostByUuid(input.postUuid)
        if (!postToUpdate.getPostUuid()?.length) throw new Error("Post to update not found")

        postToUpdate.update({
            title: input?.title,
            genders: input?.genders,
            categories: input?.categories,
            releaseDate: input?.releaseDate,
            director: input?.director,
            whereWatch: input?.whereWatch,
            mainCast: input?.mainCast,
            hasAward: input?.hasAward,
            awards: input?.awards,
            funFacts: input?.funFacts,
            coverImage: input?.coverImage,
            cardImage: input?.cardImage,
            movieDurationHours: input?.movieDurationHours,
            seasons: input?.seasons,
        })
        await this.postRepository.updateOne(postToUpdate)
    }
}

export interface UpdatePostInput {
    internalUserUuid: string
    postUuid: string
    title?: string
    genders?: string[]
    categories?: string[]
    releaseDate?: Date
    director?: string
    whereWatch?: string[]
    mainCast?: {
        name: string
        photo: string
    }[]
    hasAward?: boolean
    awards?: {
        category: string
        awardType: string
        year: number
    }[]
    funFacts?: {
        name: string,
        description: string
    }[]
    coverImage?: string
    cardImage?: string
    movieDurationHours?: number
    seasons?: {
        seasonName: string,
        releaseDate: Date,
        episodesCount: number
    }[]
}