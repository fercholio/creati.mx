'use client'

import React, { useState } from 'react'
import {
  Shield,
  X,
  Users,
  Key,
  PlusCircle,
  Check,
  UserCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Sparkles,
  Save,
  Trash2
} from 'lucide-react'
import { HubUser, RoleDefinition, PermissionKey, UserRole } from '@/lib/hub/types'
import { AVAILABLE_PERMISSIONS, DEFAULT_ROLES } from '@/lib/hub/permissions-config'

interface PermissionManagerModalProps {
  isOpen: boolean
  onClose: () => void
  users: HubUser[]
  roles: RoleDefinition[]
  onUpdateUsers: (updatedUsers: HubUser[]) => void
  onUpdateRoles: (updatedRoles: RoleDefinition[]) => void
  themeMode?: 'light' | 'dark'
}

export function PermissionManagerModal({
  isOpen,
  onClose,
  users,
  roles,
  onUpdateUsers,
  onUpdateRoles,
  themeMode = 'light',
}: PermissionManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'roles' | 'user_overrides'>('roles')
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || 'SUPER_ADMIN')
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '')

  // Modal para Crear Nuevo Rol
  const [showCreateRole, setShowCreateRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDescription, setNewRoleDescription] = useState('')
  const [newRolePerms, setNewRolePerms] = useState<PermissionKey[]>([
    'docs:read',
    'docs:edit',
    'audit:view_logs'
  ])

  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!isOpen) return null

  const isDark = themeMode === 'dark'
  const currentRole = roles.find((r) => r.id === selectedRoleId) || roles[0]
  const currentUserObj = users.find((u) => u.id === selectedUserId) || users[0]

  // Toggle permisos en el rol seleccionado
  const handleToggleRolePermission = (permKey: PermissionKey) => {
    if (currentRole.id === 'SUPER_ADMIN') return // Proteger al SuperAdmin

    const updatedRoles = roles.map((r) => {
      if (r.id === currentRole.id) {
        const has = r.permissions.includes(permKey)
        const newPerms = has
          ? r.permissions.filter((p) => p !== permKey)
          : [...r.permissions, permKey]
        return { ...r, permissions: newPerms }
      }
      return r
    })
    onUpdateRoles(updatedRoles)
    triggerFeedback()
  }

  // Toggle permiso específico para un usuario (User-Level Override)
  const handleToggleUserPermission = (permKey: PermissionKey) => {
    const user = currentUserObj
    const currentCustom = user.customPermissions || []
    const has = currentCustom.includes(permKey)
    const newCustom = has
      ? currentCustom.filter((p) => p !== permKey)
      : [...currentCustom, permKey]

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, customPermissions: newCustom } : u
    )
    onUpdateUsers(updatedUsers)
    triggerFeedback()
  }

  const triggerFeedback = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleCreateNewRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoleName.trim()) return

    const roleId = newRoleName.trim().toUpperCase().replace(/\s+/g, '_')
    const newRole: RoleDefinition = {
      id: roleId,
      name: newRoleName.trim(),
      description: newRoleDescription.trim() || 'Rol personalizado con permisos granulares',
      color: 'from-cyan-500 to-blue-600',
      permissions: newRolePerms,
      isCustom: true,
    }

    onUpdateRoles([...roles, newRole])
    setSelectedRoleId(roleId)
    setShowCreateRole(false)
    setNewRoleName('')
    setNewRoleDescription('')
    triggerFeedback()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Cabecera */}
        <div
          className={`p-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent-500/10 text-accent-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">Matriz de Control de Acceso IAM & Roles</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400 font-mono font-bold">
                  Granular RBAC + ACL Overrides
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Gestiona roles globales y otorga o revoca permisos específicos a nivel de usuario.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                <Check className="w-3.5 h-3.5" /> Permisos actualizados
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selector de Pestañas */}
        <div
          className={`px-4 pt-2 border-b flex gap-4 shrink-0 text-xs font-semibold ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
          }`}
        >
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roles'
                ? 'border-accent-500 text-accent-600 dark:text-accent-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>1. Roles & Permisos Globales</span>
          </button>

          <button
            onClick={() => setActiveTab('user_overrides')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'user_overrides'
                ? 'border-accent-500 text-accent-600 dark:text-accent-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Permisos Específicos por Usuario (Overrides)</span>
          </button>
        </div>

        {/* CUERPO: PESTAÑA 1 - ROLES */}
        {activeTab === 'roles' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Lista Lateral de Roles */}
            <div
              className={`w-72 border-r overflow-y-auto p-4 space-y-2 shrink-0 ${
                isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Roles ({roles.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowCreateRole(true)}
                  className="p-1 rounded-lg text-accent-600 hover:bg-accent-500/10 cursor-pointer text-xs flex items-center gap-1 font-semibold"
                  title="Crear Nuevo Rol"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Nuevo</span>
                </button>
              </div>

              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoleId(r.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedRoleId === r.id
                      ? isDark
                        ? 'bg-slate-800 border-accent-500 text-white shadow-xs'
                        : 'bg-white border-accent-500 text-slate-900 shadow-xs ring-1 ring-accent-500/30'
                      : isDark
                      ? 'border-slate-800 hover:bg-slate-800/40 text-slate-400'
                      : (isDark ? 'border-slate-800 hover:bg-slate-800/40 text-slate-300' : 'border-slate-200 hover:bg-white text-slate-700')
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{r.name}</span>
                    {r.isCustom && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono">
                        Personalizado
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {r.description}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-slate-400">
                    {r.permissions.length} permisos activos
                  </div>
                </button>
              ))}
            </div>

            {/* Configuración de Permisos del Rol */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {currentRole.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{currentRole.description}</p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 font-bold">
                    ID: {currentRole.id}
                  </span>
                </div>
              </div>

              {/* Matriz de Checkboxes de Permisos */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Permisos Asignados a este Rol
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_PERMISSIONS.map((p) => {
                    const isChecked = currentRole.permissions.includes(p.key)
                    const isLocked = currentRole.id === 'SUPER_ADMIN'

                    return (
                      <div
                        key={p.key}
                        onClick={() => !isLocked && handleToggleRolePermission(p.key)}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                          isLocked
                            ? 'opacity-80 cursor-not-allowed bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800'
                            : 'cursor-pointer ' +
                              (isChecked
                                ? isDark
                                  ? 'bg-slate-800/90 border-accent-500/50'
                                  : 'bg-white border-accent-500 shadow-xs'
                                : isDark
                                ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                : 'bg-slate-50 border-slate-200 hover:bg-white')
                        }`}
                      >
                        <div className="pt-0.5">
                          <input
                            type="checkbox"
                            disabled={isLocked}
                            checked={isChecked}
                            onChange={() => !isLocked && handleToggleRolePermission(p.key)}
                            className="w-4 h-4 rounded text-accent-600 focus:ring-accent-500 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold">{p.label}</span>
                            <span className="text-[9px] font-mono text-slate-400">{p.key}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CUERPO: PESTAÑA 2 - OVERRIDES POR USUARIO */
          <div className="flex-1 flex overflow-hidden">
            {/* Lista Lateral de Usuarios */}
            <div
              className={`w-72 border-r overflow-y-auto p-4 space-y-2 shrink-0 ${
                isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-2">
                Colaboradores ({users.length})
              </div>

              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedUserId === u.id
                      ? isDark
                        ? 'bg-slate-800 border-accent-500 text-white shadow-xs'
                        : 'bg-white border-accent-500 text-slate-900 shadow-xs ring-1 ring-accent-500/30'
                      : isDark
                      ? 'border-slate-800 hover:bg-slate-800/40 text-slate-400'
                      : 'border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-tr ${u.avatarColor} text-white flex items-center justify-center text-[9px] font-bold`}
                    >
                      {u.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-xs font-bold truncate">{u.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate font-mono">{u.email}</p>
                  <div className="flex items-center justify-between mt-2 text-[10px]">
                    <span className="font-mono text-accent-600 dark:text-accent-400 font-semibold">
                      {u.role}
                    </span>
                    {u.customPermissions && u.customPermissions.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[9px]">
                        +{u.customPermissions.length} extras
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Overrides Granulares del Usuario Seleccionado */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{currentUserObj.name}</h3>
                <p className="text-xs text-slate-500">
                  Rol base actual: <strong>{currentUserObj.role}</strong> ({currentUserObj.email})
                </p>
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  Aquí puedes otorgar permisos extraordinarios a este usuario sin necesidad de cambiar su rol base.
                </div>
              </div>

              {/* Matriz de Permisos Específicos */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Permisos Específicos Otorgados a este Usuario
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_PERMISSIONS.map((p) => {
                    // Check if granted through base role or through custom override
                    const rolePerms =
                      roles.find((r) => r.id === currentUserObj.role)?.permissions || []
                    const inheritedFromRole = rolePerms.includes(p.key)
                    const hasOverride = (currentUserObj.customPermissions || []).includes(p.key)

                    return (
                      <div
                        key={p.key}
                        onClick={() => !inheritedFromRole && handleToggleUserPermission(p.key)}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                          inheritedFromRole
                            ? 'opacity-80 bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-default'
                            : 'cursor-pointer ' +
                              (hasOverride
                                ? isDark
                                  ? 'bg-slate-800 border-amber-500/60 shadow-xs'
                                  : 'bg-white border-amber-500 shadow-xs'
                                : isDark
                                ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                : 'bg-slate-50 border-slate-200 hover:bg-white')
                        }`}
                      >
                        <div className="pt-0.5">
                          <input
                            type="checkbox"
                            disabled={inheritedFromRole}
                            checked={inheritedFromRole || hasOverride}
                            onChange={() =>
                              !inheritedFromRole && handleToggleUserPermission(p.key)
                            }
                            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold">{p.label}</span>
                            {inheritedFromRole ? (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono">
                                Heredado del Rol
                              </span>
                            ) : hasOverride ? (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono">
                                Permiso Especial Activo
                              </span>
                            ) : null}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Crear Nuevo Rol */}
        {showCreateRole && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div
              className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <h3 className="text-base font-bold mb-4 text-slate-900 dark:text-white">Crear Nuevo Rol Personalizado</h3>
              <form onSubmit={handleCreateNewRole} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Nombre del Rol</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Auditor Legal Externo"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Descripción</label>
                  <input
                    type="text"
                    placeholder="ej. Acceso a contratos y bóveda sin secretos"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateRole(false)}
                    className="flex-1 py-2.5 rounded-xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-bold cursor-pointer shadow-sm"
                  >
                    Crear Rol
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
