import SignupUsecase from "../application/signup.usecase";
import User, {UserPermission} from "../domain/user";
import {UserRepository} from "../domain/user.repository";

test("Deve registrar um usuário", async () => {
    const input = {
        username: 'jane doe',
        email: 'janeDoe@gmail.com',
    }

    const userRepositoryFake: UserRepository = {
        save(user: User): Promise<void> {
            return
        }
    }

    const createdUser = await new SignupUsecase(userRepositoryFake).execute(input)

    expect(createdUser.userUuid).toBeDefined()
    expect(createdUser.username).toBe(input.username)
    expect(createdUser.email).toBe(input.email)
    expect(createdUser.permission).toBe(UserPermission.DEFAULT)
})