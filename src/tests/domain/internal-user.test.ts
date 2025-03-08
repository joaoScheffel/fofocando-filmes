import * as crypto from "node:crypto";
import InternalUser, {InternalUserPermission} from "../../domain/internal-user";

test("Deve instanciar um usuário interno", () => {
    const internalUserInput = {
        internalUserUuid: crypto.randomUUID(),
        email: 'jane.doe@gmail.com',
        username: 'jane doe',
        permission: InternalUserPermission.ADMIN,
        createdAt: new Date()
    }

    const internalUser = new InternalUser(
        internalUserInput.internalUserUuid,
        internalUserInput.email,
        internalUserInput.username,
        internalUserInput.permission,
        internalUserInput.createdAt
    )

    expect(internalUser.internalUserUuid).toBe(internalUserInput.internalUserUuid)
    expect(internalUser.email).toBe(internalUserInput.email)
    expect(internalUser.username).toBe(internalUserInput.username)
    expect(internalUser.permission).toBe(internalUserInput.permission)
    expect(internalUser.createdAt).toBe(internalUserInput.createdAt)
})

test("Deve instanciar um usuário interno pelo método de factory", () => {
    const internalUserInput = {
        email: 'jane.doe@gmail.com',
        username: 'jane doe',
        permission: InternalUserPermission.ADMIN,
    }

    const internalUser = InternalUser.create(
        internalUserInput.email,
        internalUserInput.username,
        internalUserInput.permission,
    )

    expect(internalUser.internalUserUuid).toBeDefined()
    expect(internalUser.email).toBe(internalUserInput.email)
    expect(internalUser.username).toBe(internalUserInput.username)
    expect(internalUser.permission).toBe(internalUserInput.permission)
    expect(internalUser.createdAt).toBeDefined()
})