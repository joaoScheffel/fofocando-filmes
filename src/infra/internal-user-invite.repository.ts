import {InternalUserInviteRepository} from "../domain/internal-user-invite.repository";
import InternalUserInvite from "../domain/internal-user-invite";

export class InternalUserInviteRepositoryFake implements InternalUserInviteRepository {
    constructor(
        private invites: InternalUserInvite[] = []
    ) {
    }

    async save(internalUserInvite: InternalUserInvite): Promise<void> {
        this.invites.push(internalUserInvite)
    }

    async getInviteByUuid(inviteUuid: string): Promise<InternalUserInvite> {
        return this.invites.find((invite) => invite.inviteUuid === inviteUuid)
    }

    async update(internalUserInvite: InternalUserInvite): Promise<void> {
        return
    }
}