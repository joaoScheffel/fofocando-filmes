import InternalUserInvite from "../domain/entities/internal-user-invite";
import {InternalUserInviteRepository} from "../domain/repositories/internal-user-invite.repository";
import {InternalUserPermission} from "../domain/entities/internal-user";

export default class InviteInternalUser {
    constructor(
        private internalUserInviteRepository: InternalUserInviteRepository
    ) {}

    async execute(input: InviteInternalUserInput): Promise<InviteInternalUserOutput> {
        const newInternalUserInvite = InternalUserInvite.create(
            input.email,
            input.permission,
            input.invitedBy
        )
        await this.internalUserInviteRepository.save(newInternalUserInvite)
        return {
            inviteUuid: newInternalUserInvite.inviteUuid
        }
    }
}
export interface InviteInternalUserInput {
    email: string,
    permission: InternalUserPermission,
    invitedBy: string
}
export interface InviteInternalUserOutput {
    inviteUuid: string
}