import * as crypto from "node:crypto";

export default class InternalUserInvite {
    constructor(
        readonly inviteUuid: string,
        readonly email: string,
        readonly permission: InternalUserPermission,
        readonly invitedBy: string,
        private acceptedAt: Date | null
    ) {}

    static create(
        email: string,
        permission: InternalUserPermission,
        invitedBy: string,
    ): InternalUserInvite {
        return new InternalUserInvite(
            crypto.randomUUID(),
            email,
            permission,
            invitedBy,
            null
        )
    }

    accept(): void {
        if (this.isAccepted()) throw new Error("Invite already accepted")
        this.acceptedAt = new Date()
    }

    isAccepted(): boolean {
        return !!this.acceptedAt
    }
}

export enum InternalUserPermission {
    ADMIN = "ADMIN",
    MASTER = "MASTER"
}