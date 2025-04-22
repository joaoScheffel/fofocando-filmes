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

test("Deve criar um post", async () => {
    const internalUserInviteRepository: InternalUserInviteRepository = new InternalUserInviteRepositoryFake()
    const internalUserRepositoryFake: InternalUserRepository = new InternalUserRepositoryFake()
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
        internalUserRepositoryFake
    ).execute(acceptInviteInput)

    const createPostInput: CreatePostInput = {
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
        seasons: null,
        createdBy: internalUserUuid
    }
    const createPostOutput = await new CreatePost(
        postRepository,
        internalUserRepositoryFake
    ).execute(createPostInput)
    expect(createPostOutput.postUuid).toBeDefined()
    const createdPost = await postRepository.getPostByUuid(createPostOutput.postUuid)
    expect(createdPost.title).toBe(createPostInput.title)
    expect(createdPost.type).toBe(createPostInput.type)
    expect(createdPost.genders).toBe(createPostInput.genders)
    expect(createdPost.categories).toBe(createPostInput.categories)
    expect(createdPost.releaseDate).toBe(createPostInput.releaseDate)
    expect(createdPost.director).toBe(createPostInput.director)
    expect(createdPost.whereWatch).toBe(createPostInput.whereWatch)
    expect(createdPost.mainCast).toBe(createPostInput.mainCast)
    expect(createdPost.hasAward).toBe(createPostInput.hasAward)
    expect(createdPost.awards).toBe(createPostInput.awards)
    expect(createdPost.funFacts).toBe(createPostInput.funFacts)
    expect(createdPost.coverImage).toBe(createPostInput.coverImage)
    expect(createdPost.cardImage).toBe(createPostInput.cardImage)
    expect(createdPost.movieDurationHours).toBe(createPostInput.movieDurationHours)
    expect(createdPost.seasons).toBe(createPostInput.seasons)
    expect(createdPost.createdBy).toBe(createPostInput.createdBy)
})