import * as crypto from "node:crypto";
import AcceptInternalUserInvite from "../../application/accept-internal-user-invite";
import {InternalUserInviteRepositoryFake} from "../../infra/internal-user-invite.repository";
import {InternalUserPermission} from "../../domain/internal-user-invite";
import InviteInternalUser from "../../application/invite-internal-user";

test("Deve aceitar um convite de usuário interno", async () => {
    const inviteInput = {
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }

    const internalUserInviteRepositoryFake = new InternalUserInviteRepositoryFake()

    const invitedInternalUser = await new InviteInternalUser(
        internalUserInviteRepositoryFake
    ).execute(inviteInput)

    const acceptInviteInput = {
        inviteUuid: invitedInternalUser.inviteUuid
    }

    await new AcceptInternalUserInvite(
        internalUserInviteRepositoryFake
    ).execute(acceptInviteInput.inviteUuid)

    const acceptedInvite = await internalUserInviteRepositoryFake.getInviteByUuid(
        acceptInviteInput.inviteUuid
    )

    expect(acceptedInvite.isAccepted()).toBe(true)
})