export default class User {
    constructor(
        readonly userUuid: string,
        readonly username: string,
        readonly email: string,
        readonly permission: UserPermission
    ) {}
}

export enum UserPermission {
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
    MASTER = "MASTER",
}