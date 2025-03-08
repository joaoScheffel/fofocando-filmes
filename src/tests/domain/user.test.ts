import * as crypto from "node:crypto";
import User, {UserPermission} from "../../domain/user";

test('Deve instanciar um usuário', () => {
    const input = {
        userUuid: crypto.randomUUID(),
        username: 'jane doe',
        email: 'janeDoe@gmail.com',
        permission: UserPermission.DEFAULT
    }

    const user = new User(
        input.userUuid,
        input.username,
        input.email,
        input.permission,
    )

    expect(user.userUuid).toBe(input.userUuid)
    expect(user.username).toBe(input.username)
    expect(user.email).toBe(input.email)
    expect(user.permission).toBe(input.permission)
})