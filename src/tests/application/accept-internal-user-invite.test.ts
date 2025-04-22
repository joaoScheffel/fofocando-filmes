import * as crypto from "node:crypto";
import AcceptInternalUserInvite, {AcceptInternalUserInviteInput} from "../../application/accept-internal-user-invite";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite-fake.repository";
import InviteInternalUser from "../../application/invite-internal-user";
import {InternalUserPermission} from "../../domain/entities/internal-user";
import InternalUserRepositoryFake from "../../infra/internal-user-fake.repository";
import {InternalUserInviteRepository} from "../../domain/repositories/internal-user-invite.repository";
import {InternalUserRepository} from "../../domain/repositories/internal-user.repository";

test("Deve aceitar um convite de usuário interno", async () => {
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }
    const internalUserInviteRepository: InternalUserInviteRepository = new InternalUserInviteRepositoryFake()
    const internalUserRepository: InternalUserRepository = new InternalUserRepositoryFake()
    const invitedInternalUser = await new InviteInternalUser(
        internalUserInviteRepository
    ).execute(inviteInput)
    const acceptInviteInput: AcceptInternalUserInviteInput = {
        inviteUuid: invitedInternalUser.inviteUuid
    }
    const {internalUserUuid} = await new AcceptInternalUserInvite(
        internalUserInviteRepository,
        internalUserRepository
    ).execute(acceptInviteInput)
    const acceptedInvite = await internalUserInviteRepository.getInviteByUuid(
        acceptInviteInput.inviteUuid
    )
    const createdInternalUser = await internalUserRepository.getInternalUserByUuid(internalUserUuid)
    expect(acceptedInvite.isAccepted()).toBe(true)
    expect(createdInternalUser.internalUserUuid).toBeDefined()
    expect(createdInternalUser.email).toBe(acceptedInvite.email)
    expect(createdInternalUser.username).toBeDefined()
    expect(createdInternalUser.permission).toBe(acceptedInvite.permission)
    expect(createdInternalUser.createdAt).toBeDefined()
})