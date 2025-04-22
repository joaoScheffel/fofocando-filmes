import User, {UserPermission} from "../domain/entities/user";
import * as crypto from "node:crypto";
import {UserRepository} from "../domain/repositories/user.repository";

export default class Signup {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(input: {username: string, email: string}): Promise<User> {
        const createdUser = new User(
            crypto.randomUUID(),
            input.username,
            input.email,
            UserPermission.DEFAULT
        )

        await this.userRepository.save(createdUser)
        return createdUser
    }
}