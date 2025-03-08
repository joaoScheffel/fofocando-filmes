import {InternalUserInviteRepository} from "../domain/internal-user-invite.repository";
import InternalUser from "../domain/internal-user";
import {InternalUserRepository} from "../domain/internal-user.repository";

export default class AcceptInternalUserInvite {
    constructor(
        private internalUserInviteRepository: InternalUserInviteRepository,
        private internalUserRepository: InternalUserRepository
    ) {
    }

    async execute(inviteUuid: string) {
        const inviteToAccept = await this.internalUserInviteRepository.getInviteByUuid(inviteUuid)

        inviteToAccept.accept()
        await this.internalUserInviteRepository.update(inviteToAccept)

        const createdInternalUser = InternalUser.create(
            inviteToAccept.email,
            '',
            inviteToAccept.permission
        )

        await this.internalUserRepository.save(createdInternalUser)
    }
}