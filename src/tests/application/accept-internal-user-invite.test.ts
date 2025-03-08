import * as crypto from "node:crypto";
import AcceptInternalUserInvite from "../../application/accept-internal-user-invite";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite.repository";
import InviteInternalUser from "../../application/invite-internal-user";
import {InternalUserPermission} from "../../domain/internal-user";
import InternalUserRepositoryFake from "../../infra/internal-user.repository";
import {InternalUserInviteRepository} from "../../domain/internal-user-invite.repository";
import {InternalUserRepository} from "../../domain/internal-user.repository";

test("Deve aceitar um convite de usuário interno", async () => {
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }

    const internalUserInviteRepository: InternalUserInviteRepository = new InternalUserInviteRepositoryFake()
    const internalUserRepositoryFake: InternalUserRepository = new InternalUserRepositoryFake()

    const invitedInternalUser = await new InviteInternalUser(
        internalUserInviteRepository
    ).execute(inviteInput)

    const acceptInviteInput = {
        inviteUuid: invitedInternalUser.inviteUuid
    }

    await new AcceptInternalUserInvite(
        internalUserInviteRepository,
        internalUserRepositoryFake
    ).execute(acceptInviteInput.inviteUuid)

    const acceptedInvite = await internalUserInviteRepository.getInviteByUuid(
        acceptInviteInput.inviteUuid
    )

    const createdInternalUser = await internalUserRepositoryFake.getInternalUserByEmail(acceptedInvite.email)

    expect(acceptedInvite.isAccepted()).toBe(true)
    expect(createdInternalUser.internalUserUuid).toBeDefined()
    expect(createdInternalUser.email).toBe(acceptedInvite.email)
    expect(createdInternalUser.username).toBeDefined()
    expect(createdInternalUser.permission).toBe(acceptedInvite.permission)
    expect(createdInternalUser.createdAt).toBeDefined()
})