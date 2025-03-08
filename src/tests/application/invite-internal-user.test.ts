import {InternalUserPermission} from "../../domain/internal-user-invite";
import * as crypto from "node:crypto";
import InviteInternalUser from "../../application/invite-internal-user";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite.repository";

test('Deve convidar um usuário a ser interno', async () => {
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }

    const invitedInternalUser = await new InviteInternalUser(
        new InternalUserInviteRepositoryFake()
    ).execute(inviteInput)

    expect(invitedInternalUser.inviteUuid).toBeDefined()
    expect(invitedInternalUser.email).toBe(inviteInput.email)
    expect(invitedInternalUser.permission).toBe(inviteInput.permission)
    expect(invitedInternalUser.invitedBy).toBe(inviteInput.invitedBy)
})