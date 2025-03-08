import {InternalUserInviteRepository} from "../domain/internal-user-invite.repository";

export default class AcceptInternalUserInvite {
    constructor(
        private internalUserInviteRepository: InternalUserInviteRepository
    ) {
    }

    async execute(inviteUuid: string) {
        const inviteToAccept = await this.internalUserInviteRepository.getInviteByUuid(inviteUuid)

        inviteToAccept.accept()
        await this.internalUserInviteRepository.update(inviteToAccept)
    }
}