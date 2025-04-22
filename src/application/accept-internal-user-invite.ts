import {InternalUserInviteRepository} from "../domain/repositories/internal-user-invite.repository";
import InternalUser from "../domain/entities/internal-user";
import {InternalUserRepository} from "../domain/repositories/internal-user.repository";

export default class AcceptInternalUserInvite {
    constructor(
        private internalUserInviteRepository: InternalUserInviteRepository,
        private internalUserRepository: InternalUserRepository
    ) {
    }

    async execute(input: AcceptInternalUserInviteInput): Promise<AcceptInternalUserInviteOutput> {
        const inviteToAccept = await this.internalUserInviteRepository.getInviteByUuid(input.inviteUuid)
        inviteToAccept.accept()
        await this.internalUserInviteRepository.update(inviteToAccept)
        const createdInternalUser = InternalUser.create(
            inviteToAccept.email,
            '',
            inviteToAccept.permission
        )
        await this.internalUserRepository.save(createdInternalUser)
        return {
            internalUserUuid: createdInternalUser.internalUserUuid
        }
    }
}
export interface AcceptInternalUserInviteInput {
    inviteUuid: string
}
export interface AcceptInternalUserInviteOutput {
    internalUserUuid: string
}