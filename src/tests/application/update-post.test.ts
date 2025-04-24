import {InternalUserInviteRepository} from "../../domain/repositories/internal-user-invite.repository";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite-fake.repository";
import {InternalUserRepository} from "../../domain/repositories/internal-user.repository";
import InternalUserRepositoryFake from "../../infra/internal-user-fake.repository";
import {PostRepository} from "../../domain/repositories/post.repository";
import {PostFakeRepository} from "../../infra/post-fake.repository";
import {InternalUserPermission} from "../../domain/entities/internal-user";
import crypto from "node:crypto";
import InviteInternalUser from "../../application/invite-internal-user";
import AcceptInternalUserInvite from "../../application/accept-internal-user-invite";
import CreatePost, {CreatePostInput} from "../../application/create-post";
import {PostTypeEnum} from "../../domain/entities/post";
import {UpdatePost} from "../../application/update-post";

let createMoviePostInput: CreatePostInput
let createSeriePostInput: CreatePostInput

let internalUserInviteRepository: InternalUserInviteRepository
let internalUserRepository: InternalUserRepository = new InternalUserRepositoryFake()
let postRepository: PostRepository = new PostFakeRepository()

beforeEach(async () => {
    internalUserInviteRepository = new InternalUserInviteRepositoryFake()
    internalUserRepository = new InternalUserRepositoryFake()
    postRepository = new PostFakeRepository()

    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }
    const invitedInternalUser = await new InviteInternalUser(
        internalUserInviteRepository
    ).execute(inviteInput)
    const acceptInviteInput = {
        inviteUuid: invitedInternalUser.inviteUuid
    }
    const {internalUserUuid} = await new AcceptInternalUserInvite(
        internalUserInviteRepository,
        internalUserRepository
    ).execute(acceptInviteInput)
    
    createMoviePostInput = {
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
        seasons: null,
        createdBy: internalUserUuid
    }
    
    createSeriePostInput = {
        title: "Title",
        type: PostTypeEnum.SERIE,
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
        movieDurationHours: undefined,
        seasons: [{
            seasonName: "season",
            releaseDate: new Date(),
            episodesCount: 4
        }],
        createdBy: internalUserUuid
    }
})

test("Deve atualizar um post do tipo MOVIE", async () => {
    const createSeriePostOutput = await new CreatePost(
        postRepository,
        internalUserRepository
    ).execute(createMoviePostInput)

    const updateMoviePostInput = {
        postUuid: createSeriePostOutput.postUuid,
        internalUserUuid: createMoviePostInput.createdBy,
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
    }
    await new UpdatePost(postRepository, internalUserRepository).execute(updateMoviePostInput)

    const updatedMoviePost = await postRepository.getPostByUuid(createSeriePostOutput.postUuid)
    expect(updatedMoviePost.getTitle()).toBe(updateMoviePostInput.title)
    expect(updatedMoviePost.getGenders()).toBe(updateMoviePostInput.genders)
    expect(updatedMoviePost.getCategories()).toBe(updateMoviePostInput.categories)
    expect(updatedMoviePost.getReleaseDate()).toBe(updateMoviePostInput.releaseDate)
    expect(updatedMoviePost.getDirector()).toBe(updateMoviePostInput.director)
    expect(updatedMoviePost.getWhereWatch()).toBe(updateMoviePostInput.whereWatch)
    expect(updatedMoviePost.getMainCast()).toBe(updateMoviePostInput.mainCast)
    expect(updatedMoviePost.getHasAward()).toBe(updateMoviePostInput.hasAward)
    expect(updatedMoviePost.getAwards()).toBe(updateMoviePostInput.awards)
    expect(updatedMoviePost.getFunFacts()).toBe(updateMoviePostInput.funFacts)
    expect(updatedMoviePost.getCoverImage()).toBe(updateMoviePostInput.coverImage)
    expect(updatedMoviePost.getCardImage()).toBe(updateMoviePostInput.cardImage)
    expect(updatedMoviePost.getMovieDurationHours()).toBe(updateMoviePostInput.movieDurationHours)
})

test("Deve atualizar um post do tipo SERIE", async () => {
    const createSeriePostOutput = await new CreatePost(
        postRepository,
        internalUserRepository
    ).execute(createSeriePostInput)

    const updateSeriePostInput = {
        postUuid: createSeriePostOutput.postUuid,
        internalUserUuid: createSeriePostInput.createdBy,
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
        seasons: [{
            seasonName: "season 2",
            releaseDate: new Date(),
            episodesCount: 3
        }]
    }
    await new UpdatePost(postRepository, internalUserRepository).execute(updateSeriePostInput)

    const updatedSeriePost = await postRepository.getPostByUuid(createSeriePostOutput.postUuid)
    expect(updatedSeriePost.getTitle()).toBe(updateSeriePostInput.title)
    expect(updatedSeriePost.getGenders()).toBe(updateSeriePostInput.genders)
    expect(updatedSeriePost.getCategories()).toBe(updateSeriePostInput.categories)
    expect(updatedSeriePost.getReleaseDate()).toBe(updateSeriePostInput.releaseDate)
    expect(updatedSeriePost.getDirector()).toBe(updateSeriePostInput.director)
    expect(updatedSeriePost.getWhereWatch()).toBe(updateSeriePostInput.whereWatch)
    expect(updatedSeriePost.getMainCast()).toBe(updateSeriePostInput.mainCast)
    expect(updatedSeriePost.getHasAward()).toBe(updateSeriePostInput.hasAward)
    expect(updatedSeriePost.getAwards()).toBe(updateSeriePostInput.awards)
    expect(updatedSeriePost.getFunFacts()).toBe(updateSeriePostInput.funFacts)
    expect(updatedSeriePost.getCoverImage()).toBe(updateSeriePostInput.coverImage)
    expect(updatedSeriePost.getCardImage()).toBe(updateSeriePostInput.cardImage)
    expect(updatedSeriePost.getSeasons()).toBe(updateSeriePostInput.seasons)
})