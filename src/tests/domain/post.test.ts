import * as crypto from "node:crypto";
import Post, {PostProps, PostTypeEnum, PostUpdateProps} from "../../domain/entities/post";

let postProps: PostProps
let postUpdateProps: PostUpdateProps

beforeEach(() => {
    postProps = {
        postUuid: crypto.randomUUID(),
        title: "Title",
        type: PostTypeEnum.MOVIE,
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

    postUpdateProps = {
        title: "Title",
        genders: ["COMEDY"],
        categories: ["Baseado em fatos reais"],
        releaseDate: new Date(),
        director: "director 2",
        whereWatch: ["NETFLIX"],
        mainCast: [{
            name: "name 2",
            photo: "url 2"
        }],
        hasAward: true,
        awards: [{
            category: "Melhor filme 2",
            awardType: "OSCAR_2",
            year: 2024
        }],
        funFacts: [{
            name: "name 2",
            description: "description 2"
        }],
        coverImage: "url 2",
        cardImage: "url 2",
        movieDurationHours: 3,
        seasons: [{
            seasonName: "season 2",
            releaseDate: new Date(),
            episodesCount: 3
        }]
    }
})

test("Deve criar um post do tipo MOVIE", () => {
    postProps.type = PostTypeEnum.MOVIE
    delete postProps.seasons

    const post = new Post(postProps)
    expect(post.getPostUuid()).toBeDefined()
    expect(post.getTitle()).toBe(postProps.title)
    expect(post.getType()).toBe(PostTypeEnum.MOVIE)
    expect(post.getGenders()).toBe(postProps.genders)
    expect(post.getCategories()).toBe(postProps.categories)
    expect(post.getReleaseDate()).toBe(postProps.releaseDate)
    expect(post.getDirector()).toBe(postProps.director)
    expect(post.getWhereWatch()).toBe(postProps.whereWatch)
    expect(post.getMainCast()).toBe(postProps.mainCast)
    expect(post.getHasAward()).toBe(postProps.hasAward)
    expect(post.getAwards()).toBe(postProps.awards)
    expect(post.getFunFacts()).toBe(postProps.funFacts)
    expect(post.getCoverImage()).toBe(postProps.coverImage)
    expect(post.getCardImage()).toBe(postProps.cardImage)
    expect(post.getMovieDurationHours()).toBe(postProps.movieDurationHours)
    expect(post.getSeasons()).toBe(postProps.seasons)
    expect(post.getCreatedBy()).toBe(postProps.createdBy)
})

test("Deve criar um post do tipo SERIE", () => {
    postProps.type = PostTypeEnum.SERIE
    delete postProps.movieDurationHours

    const post = new Post(postProps)
    expect(post.getPostUuid()).toBeDefined()
    expect(post.getTitle()).toBe(postProps.title)
    expect(post.getType()).toBe(PostTypeEnum.SERIE)
    expect(post.getGenders()).toBe(postProps.genders)
    expect(post.getCategories()).toBe(postProps.categories)
    expect(post.getReleaseDate()).toBe(postProps.releaseDate)
    expect(post.getDirector()).toBe(postProps.director)
    expect(post.getWhereWatch()).toBe(postProps.whereWatch)
    expect(post.getMainCast()).toBe(postProps.mainCast)
    expect(post.getHasAward()).toBe(postProps.hasAward)
    expect(post.getAwards()).toBe(postProps.awards)
    expect(post.getFunFacts()).toBe(postProps.funFacts)
    expect(post.getCoverImage()).toBe(postProps.coverImage)
    expect(post.getCardImage()).toBe(postProps.cardImage)
    expect(post.getMovieDurationHours()).toBe(postProps.movieDurationHours)
    expect(post.getSeasons()).toBe(postProps.seasons)
    expect(post.getCreatedBy()).toBe(postProps.createdBy)
})

test("Deve atualizar um post do tipo MOVIE", () => {
    postProps.type = PostTypeEnum.MOVIE
    delete postProps.seasons

    const post = new Post(postProps)
    delete postUpdateProps.seasons
    post.update(postUpdateProps)
    expect(post.getTitle()).toBe(postUpdateProps.title)
    expect(post.getGenders()).toBe(postUpdateProps.genders)
    expect(post.getCategories()).toBe(postUpdateProps.categories)
    expect(post.getReleaseDate()).toBe(postUpdateProps.releaseDate)
    expect(post.getDirector()).toBe(postUpdateProps.director)
    expect(post.getWhereWatch()).toBe(postUpdateProps.whereWatch)
    expect(post.getMainCast()).toBe(postUpdateProps.mainCast)
    expect(post.getHasAward()).toBe(postUpdateProps.hasAward)
    expect(post.getAwards()).toBe(postUpdateProps.awards)
    expect(post.getFunFacts()).toBe(postUpdateProps.funFacts)
    expect(post.getCoverImage()).toBe(postUpdateProps.coverImage)
    expect(post.getCardImage()).toBe(postUpdateProps.cardImage)
    expect(post.getMovieDurationHours()).toBe(postUpdateProps.movieDurationHours)
})

test("Deve atualizar um post do tipo SERIE", () => {
    postProps.type = PostTypeEnum.SERIE
    delete postProps.movieDurationHours

    const post = new Post(postProps)
    delete postUpdateProps.movieDurationHours
    post.update(postUpdateProps)
    expect(post.getTitle()).toBe(postUpdateProps.title)
    expect(post.getGenders()).toBe(postUpdateProps.genders)
    expect(post.getCategories()).toBe(postUpdateProps.categories)
    expect(post.getReleaseDate()).toBe(postUpdateProps.releaseDate)
    expect(post.getDirector()).toBe(postUpdateProps.director)
    expect(post.getWhereWatch()).toBe(postUpdateProps.whereWatch)
    expect(post.getMainCast()).toBe(postUpdateProps.mainCast)
    expect(post.getHasAward()).toBe(postUpdateProps.hasAward)
    expect(post.getAwards()).toBe(postUpdateProps.awards)
    expect(post.getFunFacts()).toBe(postUpdateProps.funFacts)
    expect(post.getCoverImage()).toBe(postUpdateProps.coverImage)
    expect(post.getCardImage()).toBe(postUpdateProps.cardImage)
    expect(post.getMovieDurationHours()).toBe(postUpdateProps.movieDurationHours)
})

test("Não deve criar um post do tipo MOVIE inválido", () => {
    postProps.type = PostTypeEnum.MOVIE
    expect(() => new Post(postProps)).toThrow(new Error("An movie post cannot have seasons"))
    delete postProps.seasons
    delete postProps.movieDurationHours
    expect(() => new Post(postProps)).toThrow(new Error("An movie post must have movie duration"))
})

test("Não deve criar um post do tipo SERIE inválido", () => {
    postProps.type = PostTypeEnum.SERIE
    expect(() => new Post(postProps)).toThrow(new Error("An serie post cannot have movie duration"))
    delete postProps.movieDurationHours
    delete postProps.seasons
    expect(() => new Post(postProps)).toThrow(new Error("An serie post must have seasons"))
})