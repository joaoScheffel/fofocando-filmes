import InternalUserInvite, {InternalUserPermission} from "../domain/internal-user-invite";
import * as crypto from "node:crypto";
import InviteInternalUser from "../application/invite-internal-user";
import {InternalUserInviteRepository} from "../domain/internal-user-invite.repository";

test('Deve convidar um usuário a ser interno', async () => {
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }

    const internalUserInviteRepositoryFake: InternalUserInviteRepository = {
        save(internalUserInvite: InternalUserInvite): Promise<void> {
            return
        }
    }

    const invitedInternalUser = await new InviteInternalUser(
        internalUserInviteRepositoryFake
    ).execute(inviteInput)

    expect(invitedInternalUser.inviteUuid).toBeDefined()
    expect(invitedInternalUser.email).toBe(inviteInput.email)
    expect(invitedInternalUser.permission).toBe(inviteInput.permission)
    expect(invitedInternalUser.invitedBy).toBe(inviteInput.invitedBy)
})