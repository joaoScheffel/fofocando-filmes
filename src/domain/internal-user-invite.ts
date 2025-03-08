export default class InternalUserInvite {
    constructor(
        readonly inviteUuid: string,
        readonly email: string,
        readonly permission: InternalUserPermission,
        readonly invitedBy: string
    ) {}
}

export enum InternalUserPermission {
    ADMIN = "ADMIN",
    MASTER = "MASTER"
}