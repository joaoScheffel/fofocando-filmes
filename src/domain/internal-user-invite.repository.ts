import InternalUserInvite from "./internal-user-invite";

export interface InternalUserInviteRepository {
    save(internalUserInvite: InternalUserInvite): Promise<void>
}