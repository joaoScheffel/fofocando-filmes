import * as crypto from "node:crypto";

export default class Post {
    constructor(
        readonly postUuid: string,
        readonly title: string,
        readonly type: string,
        readonly genders: string[],
        readonly categories: string[],
        readonly releaseDate: Date,
        readonly director: string,
        readonly whereWatch: string[],
        readonly mainCast: {
            name: string
            photo: string
        }[],
        readonly hasAward: boolean,
        readonly awards: {
            category: string
            awardType: string
            year: number
        }[],
        readonly funFacts: {
            name: string,
            description: string
        }[],
        readonly coverImage: string,
        readonly cardImage: string,
        readonly movieDurationHours: number,
        readonly seasons: {
            seasonName: string,
            releaseDate: Date,
            episodesCount: number
        }[],
        readonly createdBy: string,
    ) {
        if (type === "MOVIE") {
            if (seasons?.length) throw new Error("An movie post cannot have seasons")
            if (!movieDurationHours) throw new Error("An movie post must have movie duration")
        } else if (type === "SERIE") {
            if (movieDurationHours) throw new Error("An serie post cannot have movie duration")
            if (!seasons?.length) throw new Error("An serie post must have seasons")
        }
    }

    static create(
        title: string,
        type: string,
        genders: string[],
        categories: string[],
        releaseDate: Date,
        director: string,
        whereWatch: string[],
        mainCast: {
            name: string
            photo: string
        }[],
        hasAward: boolean,
        awards: {
            category: string
            awardType: string
            year: number
        }[],
        funFacts: {
            name: string,
            description: string
        }[],
        coverImage: string,
        cardImage: string,
        movieDurationHours: number,
        seasons: {
            seasonName: string,
            releaseDate: Date,
            episodesCount: number
        }[],
        createdBy: string,
    ) {
        return new Post(
            crypto.randomUUID(),
            title,
            type,
            genders,
            categories,
            releaseDate,
            director,
            whereWatch,
            mainCast,
            hasAward,
            awards,
            funFacts,
            coverImage,
            cardImage,
            movieDurationHours,
            seasons,
            createdBy
        )
    }
}