import InternalUserInvite from "../entities/internal-user-invite";

export interface InternalUserInviteRepository {
    save(internalUserInvite: InternalUserInvite): Promise<void>
    getInviteByUuid(inviteUuid: string): Promise<InternalUserInvite>
    update(internalUserInvite: InternalUserInvite): Promise<void>
}