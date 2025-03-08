import InternalUserInvite, {InternalUserPermission} from "../domain/internal-user-invite";
import * as crypto from "node:crypto";
import {InternalUserInviteRepository} from "../domain/internal-user-invite.repository";

export default class InviteInternalUser {
    constructor(
        private internalUserInviteRepository: InternalUserInviteRepository
    ) {
    }

    async execute(input: {email: string, permission: InternalUserPermission, invitedBy: string}) {
        const newInternalUserInvite = new InternalUserInvite(
            crypto.randomUUID(),
            input.email,
            input.permission,
            input.invitedBy
        )

        await this.internalUserInviteRepository.save(newInternalUserInvite)

        return newInternalUserInvite
    }
}