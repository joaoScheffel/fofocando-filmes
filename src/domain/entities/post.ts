import * as crypto from "node:crypto";

export default class Post {
    constructor(
        private props: PostProps
    ) {
        this.validate()
    }

    static create(props: PostCreateProps) {
        return new Post({
            postUuid: crypto.randomUUID(),
            ...props
        })
    }

    update(propsUpdate: PostUpdateProps) {
        if (propsUpdate?.title !== undefined) this.props.title = propsUpdate.title
        if (propsUpdate?.genders !== undefined) this.props.genders = propsUpdate.genders
        if (propsUpdate?.categories !== undefined) this.props.categories = propsUpdate.categories
        if (propsUpdate?.releaseDate !== undefined) this.props.releaseDate = propsUpdate.releaseDate
        if (propsUpdate?.director !== undefined) this.props.director = propsUpdate.director
        if (propsUpdate?.whereWatch !== undefined) this.props.whereWatch = propsUpdate.whereWatch
        if (propsUpdate?.mainCast !== undefined) this.props.mainCast = propsUpdate.mainCast
        if (propsUpdate?.hasAward !== undefined) this.props.hasAward = propsUpdate.hasAward
        if (propsUpdate?.awards !== undefined) this.props.awards = propsUpdate.awards
        if (propsUpdate?.funFacts !== undefined) this.props.funFacts = propsUpdate.funFacts
        if (propsUpdate?.coverImage !== undefined) this.props.coverImage = propsUpdate.coverImage
        if (propsUpdate?.cardImage !== undefined) this.props.cardImage = propsUpdate.cardImage
        if (propsUpdate?.movieDurationHours !== undefined) this.props.movieDurationHours = propsUpdate.movieDurationHours
        if (propsUpdate?.seasons !== undefined) this.props.seasons = propsUpdate.seasons

        this.validate()
        this.props.updatedAt = new Date()
    }

    private validate() {
        if (this.props.type === PostTypeEnum.MOVIE) {
            if (this.props.seasons?.length) throw new Error("An movie post cannot have seasons")
            if (!this.props.movieDurationHours) throw new Error("An movie post must have movie duration")
        } else if (this.props.type === PostTypeEnum.SERIE) {
            if (this.props.movieDurationHours) throw new Error("An serie post cannot have movie duration")
            if (!this.props.seasons?.length) throw new Error("An serie post must have seasons")
        }
    }

    getPostUuid(): string {
        return this.props.postUuid
    }
    getTitle(): string {
        return this.props.title
    }
    getType(): string {
        return this.props.type
    }
    getGenders(): string[] {
        return this.props.genders
    }
    getCategories(): string[] {
        return this.props.categories
    }
    getReleaseDate(): Date {
        return this.props.releaseDate
    }
    getDirector(): string {
        return this.props.director
    }
    getWhereWatch(): string[] {
        return this.props.whereWatch
    }
    getMainCast(): {name: string, photo: string}[] {
        return this.props.mainCast
    }
    getHasAward(): boolean {
        return this.props.hasAward
    }
    getAwards(): {category: string, awardType: string, year: number}[] {
        return this.props.awards
    }
    getFunFacts(): {name: string, description: string}[] {
        return this.props.funFacts
    }
    getCoverImage(): string {
        return this.props.coverImage
    }
    getCardImage(): string {
        return this.props.cardImage
    }
    getMovieDurationHours(): number {
        return this.props.movieDurationHours
    }
    getSeasons(): {seasonName: string, releaseDate: Date, episodesCount: number}[] {
        return this.props.seasons
    }
    getCreatedBy(): string {
        return this.props.createdBy
    }
}

export type PostProps = {
    postUuid: string
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
    movieDurationHours?: number
    seasons?: {
        seasonName: string,
        releaseDate: Date,
        episodesCount: number
    }[]
    createdBy: string
    updatedAt?: Date
}

export enum PostTypeEnum {
    MOVIE = "MOVIE",
    SERIE = "SERIE"
}

export type PostCreateProps = Omit<PostProps, "postUuid">
export type PostUpdateProps = Omit<PostProps, "postUuid" | "createdBy" | "type">
