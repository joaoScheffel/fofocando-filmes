import * as crypto from "node:crypto";
import InternalUserInvite from "../../domain/internal-user-invite";
import {InternalUserPermission} from "../../domain/internal-user";

test("Deve instanciar um convite de usuário interno", () => {
    const inviteInput = {
        inviteUuid: crypto.randomUUID(),
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID(),
        acceptedAt: new Date()
    }
    const internalUserInvite = new InternalUserInvite(
        inviteInput.inviteUuid,
        inviteInput.email,
        inviteInput.permission,
        inviteInput.invitedBy,
        inviteInput.acceptedAt
    )
    expect(internalUserInvite.inviteUuid).toBe(inviteInput.inviteUuid)
    expect(internalUserInvite.email).toBe(inviteInput.email)
    expect(internalUserInvite.permission).toBe(inviteInput.permission)
    expect(internalUserInvite.invitedBy).toBe(inviteInput.invitedBy)
    expect(internalUserInvite.isAccepted()).toBe(true)
})

test("Deve aceitar um convite de usuário interno", () => {
    const inviteInput = {
        inviteUuid: crypto.randomUUID(),
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }
    const internalUserInvite = InternalUserInvite.create(
        inviteInput.email,
        inviteInput.permission,
        inviteInput.invitedBy,
    )
    expect(internalUserInvite.isAccepted()).toBe(false)
    internalUserInvite.accept()
    expect(internalUserInvite.isAccepted()).toBe(true)
})

test("Não deve aceitar um convite de usuário interno que já está aceito", () => {
    const inviteInput = {
        inviteUuid: crypto.randomUUID(),
        email: 'jane.doe@gmail.com',
        permission: InternalUserPermission.ADMIN,
        invitedBy: crypto.randomUUID()
    }
    const internalUserInvite = InternalUserInvite.create(
        inviteInput.email,
        inviteInput.permission,
        inviteInput.invitedBy,
    )
    internalUserInvite.accept()

    expect(internalUserInvite.isAccepted()).toBe(true)
    expect(() => internalUserInvite.accept()).toThrow(new Error("Invite already accepted"))
})