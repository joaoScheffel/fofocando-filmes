import * as crypto from "node:crypto";
import InternalUserInvite, {InternalUserPermission} from "../domain/internal-user-invite";

test("Deve instanciar um convite de usuário interno", () => {
    const inviteInput = {
        inviteUuid: crypto.randomUUID(),
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }

    const internalUserInvite = new InternalUserInvite(
        inviteInput.inviteUuid,
        inviteInput.email,
        inviteInput.permission,
        inviteInput.invitedBy
    )

    expect(internalUserInvite.inviteUuid).toBe(inviteInput.inviteUuid)
    expect(internalUserInvite.email).toBe(inviteInput.email)
    expect(internalUserInvite.permission).toBe(inviteInput.permission)
    expect(internalUserInvite.invitedBy).toBe(inviteInput.invitedBy)
})