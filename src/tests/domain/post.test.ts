import * as crypto from "node:crypto";
import Post from "../../domain/entities/post";

let createPostInput

beforeEach(() => {
    createPostInput = {
        postUuid: crypto.randomUUID(),
        title: "Title",
        type: "MOVIE",
        genders: ["ACTION", "COMEDY"],
        categories: ["Baseado em livros"],
        releaseDate: new Date(),
        director: "director",
        whereWatch: ["AMAZON_PRIME", "NETFLIX"],
        mainCast: [{
            name: "name",
            photo: "url"
        }],
        hasAward: true,
        awards: [{
            category: "Melhor filme",
            awardType: "OSCAR",
            year: 2023
        }],
        funFacts: [{
            name: "name",
            description: "description"
        }],
        coverImage: "url",
        cardImage: "url",
        movieDurationHours: 2,
        seasons: [{
            seasonName: "season",
            releaseDate: new Date(),
            episodesCount: 4
        }],
        createdBy: crypto.randomUUID()
    }
})

test("Não deve criar um post do tipo MOVIE inválido", () => {
    expect(() => new Post(
        createPostInput.postUuid,
        createPostInput.title,
        createPostInput.type,
        createPostInput.genders,
        createPostInput.categories,
        createPostInput.releaseDate,
        createPostInput.director,
        createPostInput.whereWatch,
        createPostInput.mainCast,
        createPostInput.hasAward,
        createPostInput.awards,
        createPostInput.funFacts,
        createPostInput.coverImage,
        createPostInput.cardImage,
        createPostInput.movieDurationHours,
        createPostInput.seasons,
        createPostInput.createdBy,
    )).toThrow(new Error("An movie post cannot have seasons"))

    expect(() => new Post(
        createPostInput.postUuid,
        createPostInput.title,
        createPostInput.type,
        createPostInput.genders,
        createPostInput.categories,
        createPostInput.releaseDate,
        createPostInput.director,
        createPostInput.whereWatch,
        createPostInput.mainCast,
        createPostInput.hasAward,
        createPostInput.awards,
        createPostInput.funFacts,
        createPostInput.coverImage,
        createPostInput.cardImage,
        null,
        [],
        createPostInput.createdBy,
    )).toThrow(new Error("An movie post must have movie duration"))
})

test("Não deve criar um post do tipo SERIE inválido", () => {
    expect(() => new Post(
        createPostInput.postUuid,
        createPostInput.title,
        "SERIE",
        createPostInput.genders,
        createPostInput.categories,
        createPostInput.releaseDate,
        createPostInput.director,
        createPostInput.whereWatch,
        createPostInput.mainCast,
        createPostInput.hasAward,
        createPostInput.awards,
        createPostInput.funFacts,
        createPostInput.coverImage,
        createPostInput.cardImage,
        createPostInput.movieDurationHours,
        createPostInput.seasons,
        createPostInput.createdBy,
    )).toThrow(new Error("An serie post cannot have movie duration"))

    expect(() => new Post(
        createPostInput.postUuid,
        createPostInput.title,
        "SERIE",
        createPostInput.genders,
        createPostInput.categories,
        createPostInput.releaseDate,
        createPostInput.director,
        createPostInput.whereWatch,
        createPostInput.mainCast,
        createPostInput.hasAward,
        createPostInput.awards,
        createPostInput.funFacts,
        createPostInput.coverImage,
        createPostInput.cardImage,
        null,
        [],
        createPostInput.createdBy,
    )).toThrow(new Error("An serie post must have seasons"))
})