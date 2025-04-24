import * as crypto from "node:crypto";
import CreatePost, {CreatePostInput} from "../../application/create-post";
import {PostFakeRepository} from "../../infra/post-fake.repository";
import InternalUserRepositoryFake from "../../infra/internal-user-fake.repository";
import {InternalUserPermission} from "../../domain/entities/internal-user";
import InviteInternalUser from "../../application/invite-internal-user";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite-fake.repository";
import {InternalUserInviteRepository} from "../../domain/repositories/internal-user-invite.repository";
import {InternalUserRepository} from "../../domain/repositories/internal-user.repository";
import AcceptInternalUserInvite from "../../application/accept-internal-user-invite";
import {PostRepository} from "../../domain/repositories/post.repository";
import {PostTypeEnum} from "../../domain/entities/post";

test("Deve criar um post", async () => {
    const internalUserInviteRepository: InternalUserInviteRepository = new InternalUserInviteRepositoryFake()
    const internalUserRepository: InternalUserRepository = new InternalUserRepositoryFake()
    const postRepository: PostRepository = new PostFakeRepository()

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

    const createPostInput: CreatePostInput = {
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
    const createPostOutput = await new CreatePost(
        postRepository,
        internalUserRepository
    ).execute(createPostInput)
    expect(createPostOutput.postUuid).toBeDefined()
    const createdPost = await postRepository.getPostByUuid(createPostOutput.postUuid)
    expect(createdPost.getTitle()).toBe(createPostInput.title)
    expect(createdPost.getType()).toBe(createPostInput.type)
    expect(createdPost.getGenders()).toBe(createPostInput.genders)
    expect(createdPost.getCategories()).toBe(createPostInput.categories)
    expect(createdPost.getReleaseDate()).toBe(createPostInput.releaseDate)
    expect(createdPost.getDirector()).toBe(createPostInput.director)
    expect(createdPost.getWhereWatch()).toBe(createPostInput.whereWatch)
    expect(createdPost.getMainCast()).toBe(createPostInput.mainCast)
    expect(createdPost.getHasAward()).toBe(createPostInput.hasAward)
    expect(createdPost.getAwards()).toBe(createPostInput.awards)
    expect(createdPost.getFunFacts()).toBe(createPostInput.funFacts)
    expect(createdPost.getCoverImage()).toBe(createPostInput.coverImage)
    expect(createdPost.getCardImage()).toBe(createPostInput.cardImage)
    expect(createdPost.getMovieDurationHours()).toBe(createPostInput.movieDurationHours)
    expect(createdPost.getSeasons()).toBe(createPostInput.seasons)
    expect(createdPost.getCreatedBy()).toBe(createPostInput.createdBy)
})