import * as crypto from "node:crypto";

export default class InternalUser {
    constructor(
       readonly internalUserUuid: string,
       readonly email: string,
       readonly username: string,
       readonly permission: InternalUserPermission,
       readonly createdAt: Date
    ) {}

    static create(
        email: string,
        username: string,
        permission: InternalUserPermission,
    ): InternalUser {
        return new InternalUser(
            crypto.randomUUID(),
            email,
            username,
            permission,
            new Date()
        )
    }
}

export enum InternalUserPermission {
    ADMIN = "ADMIN",
    MASTER = "MASTER"
}