import * as crypto from "node:crypto";
import InviteInternalUser from "../../application/invite-internal-user";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite-fake.repository";
import {InternalUserPermission} from "../../domain/entities/internal-user";
import {InternalUserInviteRepository} from "../../domain/repositories/internal-user-invite.repository";

test('Deve convidar um usuário a ser interno', async () => {
    const internalUserInviteRepository: InternalUserInviteRepository = new InternalUserInviteRepositoryFake()
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }
    const {inviteUuid} = await new InviteInternalUser(
        internalUserInviteRepository
    ).execute(inviteInput)
    const invitedInternalUser = await internalUserInviteRepository.getInviteByUuid(inviteUuid)
    expect(invitedInternalUser.inviteUuid).toBeDefined()
    expect(invitedInternalUser.email).toBe(inviteInput.email)
    expect(invitedInternalUser.permission).toBe(inviteInput.permission)
    expect(invitedInternalUser.invitedBy).toBe(inviteInput.invitedBy)
})