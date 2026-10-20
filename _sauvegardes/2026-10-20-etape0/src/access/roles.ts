import type { Access, FieldAccess } from 'payload'
import type { User } from '@/payload-types'

export type UserRole = 'admin' | 'editeur' | 'redacteur' | 'finance' | 'lecteur'

function getUser(user: unknown): User | undefined {
  return user as User | undefined
}

export const isAdmin: Access = ({ req: { user } }) =>
  getUser(user)?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const role = getUser(user)?.role
  return role === 'admin' || role === 'editeur'
}

export const isAdminOrFinance: Access = ({ req: { user } }) => {
  const role = getUser(user)?.role
  return role === 'admin' || role === 'finance'
}

export const canReadContent: Access = ({ req: { user } }) => {
  if (!user) return true
  const role = getUser(user)?.role
  return role ? ['admin', 'editeur', 'redacteur', 'finance', 'lecteur'].includes(role) : false
}

export const canPublish: Access = ({ req: { user } }) => {
  const role = getUser(user)?.role
  return role === 'admin' || role === 'editeur'
}

export const ownDraftOnly: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) return false
  const role = getUser(user)?.role
  if (role === 'admin' || role === 'editeur') return true
  if (role === 'redacteur') return doc?.createdBy === getUser(user)?.id
  return false
}

export const editorRoles: UserRole[] = ['admin', 'editeur']
export const financeRoles: UserRole[] = ['admin', 'finance']
