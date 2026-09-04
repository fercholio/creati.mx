'use client'

import { useState, useEffect } from 'react'
import { defaultUsers } from '@/lib/hub/users'
import { initialDocuments } from '@/lib/hub/documents'
import { HubUser, HubDocument, UserRole, EcosystemId } from '@/lib/hub/types'
import { obfuscateSensitiveContent } from '@/lib/hub/security-engine'
import { MarkdownRenderer } from '@/components/hub/MarkdownRenderer'
import { GlobalSearchModal } from '@/components/hub/GlobalSearchModal'
import { GeminiDocAssistant } from '@/components/hub/GeminiDocAssistant'
import { RichDocumentEditor } from '@/components/hub/RichDocumentEditor'
import { VersionHistoryModal } from '@/components/hub/VersionHistoryModal'
import { PermissionManagerModal } from '@/components/hub/PermissionManagerModal'
import { DEFAULT_ROLES } from '@/lib/hub/permissions-config'
import { RoleDefinition, DocumentVersion } from '@/lib/hub/types'
import { Key, History, ShieldAlert, CheckCircle2, PanelLeftClose, PanelLeftOpen, ChevronLeft, Scale, Building2, Stethoscope, Globe } from 'lucide-react'
import { Edit3, Check, Clock } from 'lucide-react'
import { Eye, EyeOff, Moon, Sun } from 'lucide-react'
import {
  BookOpen,
  Search,
  Users,
  Shield,
  Code,
  LineChart,
  Briefcase,
  Lock,
  LogOut,
  Folder,
  FileText,
  Layers,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
  PlusCircle,
  UserPlus, X, Edit2, Trash2,
  Tag,
  Calendar,
  AlertCircle
} from 'lucide-react'

// Simple SHA-256 in browser
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function HubClient() {
  const [currentUser, setCurrentUser] = useState<HubUser | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [usersList, setUsersList] = useState<HubUser[]>(defaultUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatarColor: u.avatarColor,
    active: u.active,
    createdAt: u.createdAt
  })))

  // UI Navigation State
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemId | 'all'>('all')
  const [selectedDocId, setSelectedDocId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [treeFilterTerm, setTreeFilterTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'docs' | 'admin_users'>('docs')
  const [maskSensitiveData, setMaskSensitiveData] = useState<boolean>(true)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [rolesList, setRolesList] = useState<RoleDefinition[]>(DEFAULT_ROLES)
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false)
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isGeminiOpen, setIsGeminiOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editableContent, setEditableContent] = useState('')
  const [saveFeedback, setSaveFeedback] = useState(false)
  const [documents, setDocuments] = useState<HubDocument[]>(initialDocuments)

  // SuperAdmin: Modal para Crear Usuario
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<HubUser | null>(null)
  const [editUserName, setEditUserName] = useState('')
  const [editUserEmail, setEditUserEmail] = useState('')
  const [editUserRole, setEditUserRole] = useState<UserRole>('DEVELOPER')
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserRole, setNewUserRole] = useState<UserRole>('DEVELOPER')

  // Cargar sesión guardada en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('creati_hub_user')
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved))
      } catch (e) {
        localStorage.removeItem('creati_hub_user')
      }
    }
    const savedDocs = localStorage.getItem('creati_hub_docs_v1')
    
    const savedRoles = localStorage.getItem('creati_hub_roles_v1')
        // Sincronizar documentos remotos dinámicos de la API B2B
    fetch('/api/hub/sync.php', {
      headers: {
        'Authorization': 'Bearer CREATI_VAULT_B2B_SYNC_KEY_99812_SECURE_ALPHA'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setDocuments((prevDocs) => {
            // Combinar documentos base con los sincronizados por repositorios externos
            const merged = [...prevDocs]
            data.forEach((remoteDoc: HubDocument) => {
              const idx = merged.findIndex((d) => d.id === remoteDoc.id)
              if (idx >= 0) {
                merged[idx] = remoteDoc
              } else {
                merged.push(remoteDoc)
              }
            })
            return merged
          })
        }
      })
      .catch((err) => console.log('Sync fetch fallback to local cache:', err))

    if (savedRoles) {
      try {
        const parsed = JSON.parse(savedRoles)
        if (Array.isArray(parsed) && parsed.length > 0) setRolesList(parsed)
      } catch (e) {}
    }

    
    const savedSidebar = localStorage.getItem('creati_hub_sidebar_collapsed')
    if (savedSidebar !== null) {
      setIsSidebarCollapsed(savedSidebar === 'true')
    }

    if (savedDocs) {
      try {
        const parsed = JSON.parse(savedDocs)
        if (Array.isArray(parsed) && parsed.length > 0) setDocuments(parsed)
      } catch (e) {}
    }
  }, [])

  // Auto-seleccionar primer documento visible
  useEffect(() => {
    if (currentUser && !selectedDocId) {
      const visible = documents.filter(canViewDoc)
      if (visible.length > 0) {
        setSelectedDocId(visible[0].id)
      }
    }
  }, [currentUser, selectedEcosystem])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchModalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Atajo de teclado '[' para colapsar/expandir el sidebar
  useEffect(() => {
    const handleSidebarKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in textarea or input
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.key === '[') {
        e.preventDefault()
        setIsSidebarCollapsed((prev) => {
          const next = !prev
          localStorage.setItem('creati_hub_sidebar_collapsed', String(next))
          return next
        })
      }
    }
    window.addEventListener('keydown', handleSidebarKey)
    return () => window.removeEventListener('keydown', handleSidebarKey)
  }, [])



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    const hash = await sha256(passwordInput)
    const userFound = defaultUsers.find(
      (u) => u.email.toLowerCase() === emailInput.trim().toLowerCase() && u.passwordHash === hash
    )

    if (userFound) {
      const userObj: HubUser = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        role: userFound.role,
        avatarColor: userFound.avatarColor,
        active: userFound.active,
        createdAt: userFound.createdAt,
      }
      setCurrentUser(userObj)
      localStorage.setItem('creati_hub_user', JSON.stringify(userObj))
    } else {
      setLoginError('Credenciales incorrectas. Verifica tu correo y contraseña.')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('creati_hub_user')
    setSelectedDocId('')
  }

  // Comprobar si el usuario actual tiene permisos para ver un documento
  const canViewDoc = (doc: HubDocument): boolean => {
    if (!currentUser) return false
    if (currentUser.role === 'SUPER_ADMIN') return true
    if (doc.requiredRole === 'ALL') return true
    return doc.requiredRole === currentUser.role
  }

  // Filtrado de documentos
  const filteredDocs = documents.filter((doc) => {
    if (!canViewDoc(doc)) return false
    if (selectedEcosystem !== 'all' && doc.ecosystem !== selectedEcosystem) return false
    if (treeFilterTerm.trim()) {
      const tq = treeFilterTerm.toLowerCase()
      const matchesTree = doc.title.toLowerCase().includes(tq) || doc.summary.toLowerCase().includes(tq) || doc.tags.some(t => t.toLowerCase().includes(tq))
      if (!matchesTree) return false
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const inTitle = doc.title.toLowerCase().includes(q)
      const inSummary = doc.summary.toLowerCase().includes(q)
      const inTags = doc.tags.some((t) => t.toLowerCase().includes(q))
      return inTitle || inSummary || inTags
    }
    return true
  })

  const currentDoc = documents.find((d) => d.id === selectedDocId)

  // Crear usuario (SuperAdmin)
  
    const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('creati_hub_sidebar_collapsed', String(next))
      return next
    })
  }

  const handleSelectDoc = (id: string) => {
    setSelectedDocId(id)
    setIsEditing(false)
    const d = documents.find((doc) => doc.id === id)
    if (d) setEditableContent(d.content)
  }

  const handleStartEdit = () => {
    if (currentDoc) {
      setEditableContent(currentDoc.content)
      setIsEditing(true)
    }
  }

  const handleSaveEdit = (newContent?: string, changeSummary?: string) => {
    if (!currentDoc || !currentUser) return
    const contentToSave = newContent !== undefined ? newContent : editableContent
    const summary = changeSummary || 'Actualización de especificación'
    const nowIso = new Date().toISOString()
    const nowDate = nowIso.split('T')[0]

    // Construir nueva versión para auditoría estricta
    const existingVersions = currentDoc.versions || []
    const newVersion: DocumentVersion = {
      versionId: `ver_${Date.now()}`,
      versionNumber: `v1.${existingVersions.length + 1}`,
      timestamp: nowIso,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      authorRole: currentUser.role,
      changeSummary: summary,
      contentSnapshot: contentToSave,
    }

    const updated = documents.map((d) =>
      d.id === currentDoc.id
        ? {
            ...d,
            content: contentToSave,
            lastUpdated: nowDate,
            lastModifiedBy: {
              name: currentUser.name,
              email: currentUser.email,
              role: currentUser.role,
              timestamp: nowIso,
            },
            versions: [...existingVersions, newVersion],
          }
        : d
    )

    setDocuments(updated)
    localStorage.setItem('creati_hub_docs_v1', JSON.stringify(updated))
    setIsEditing(false)
    setSaveFeedback(true)
    setTimeout(() => setSaveFeedback(false), 2500)
  }

  // Restaurar versión anterior desde el modal de auditoría
  const handleRestoreVersion = (version: DocumentVersion) => {
    if (!currentDoc) return
    handleSaveEdit(version.contentSnapshot, `Restauración de versión ${version.versionNumber}`)
  }

  // Actualizar roles persistentes
  const handleUpdateRoles = (updatedRoles: RoleDefinition[]) => {
    setRolesList(updatedRoles)
    localStorage.setItem('creati_hub_roles_v1', JSON.stringify(updatedRoles))
  }

  // Actualizar usuarios con permisos granulares
  const handleUpdateUsers = (updatedUsers: HubUser[]) => {
    setUsersList(updatedUsers)
    localStorage.setItem('creati_hub_users_v1', JSON.stringify(updatedUsers))
  }


  const handleStartEditUser = (user: HubUser) => {
    setEditingUser(user)
    setEditUserName(user.name)
    setEditUserEmail(user.email)
    setEditUserRole(user.role)
  }

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser || !editUserName.trim() || !editUserEmail.trim()) return

    const updated = usersList.map((u) => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          name: editUserName.trim(),
          email: editUserEmail.trim(),
          role: editUserRole,
        }
      }
      return u
    })

    setUsersList(updated)
    localStorage.setItem('creati_hub_users_v1', JSON.stringify(updated))
    
    if (currentUser?.id === editingUser.id) {
      const updatedSelf = { ...currentUser, name: editUserName.trim(), email: editUserEmail.trim(), role: editUserRole }
      setCurrentUser(updatedSelf)
      localStorage.setItem('creati_hub_session_v1', JSON.stringify(updatedSelf))
    }

    setEditingUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    if (usersList.length <= 1) {
      alert('Debe existir al menos un usuario en el sistema.')
      return
    }
    if (currentUser?.id === userId) {
      alert('No puedes eliminar al usuario con el que estás conectado actualmente.')
      return
    }
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      const updated = usersList.filter(u => u.id !== userId)
      setUsersList(updated)
      localStorage.setItem('creati_hub_users_v1', JSON.stringify(updated))
    }
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName.trim() || !newUserEmail.trim()) return

    const newUser: HubUser = {
      id: `usr_${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      avatarColor: 'from-blue-500 to-indigo-600',
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setUsersList((prev) => [newUser, ...prev])
    setShowCreateUserModal(false)
    setNewUserName('')
    setNewUserEmail('')
  }

  // PANTALLA DE LOGIN SI NO HAY SESIÓN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900/95 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-['Roboto',sans-serif]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex p-3 rounded-2xl bg-accent-500/10 text-accent-400 border border-accent-500/20 mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-sans font-bold text-white">
            Creati Knowledge Hub
          </h1>
          <p className="mt-2 text-sm text-navy-300">
            Base de conocimiento interna, arquitectura de sistemas y estrategia por roles.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-slate-700/70">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="ej. dev@creati.mx o admin@creati.mx"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-accent-500 hover:bg-accent-400 text-white font-bold text-sm shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                Ingresar al Hub
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy-400 block mb-3 text-center">
                Accesos de Demostración Rápida
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => { setEmailInput('admin@creati.mx'); setPasswordInput('admin123') }}
                  className="p-2 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-accent-400/60 text-left text-navy-300 hover:text-white transition-all cursor-pointer"
                >
                  👑 <strong>Super Admin</strong><br/><span className="text-[10px] text-navy-500">admin@creati.mx</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmailInput('dev@creati.mx'); setPasswordInput('admin123') }}
                  className="p-2 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-accent-400/60 text-left text-navy-300 hover:text-white transition-all cursor-pointer"
                >
                  💻 <strong>Developer</strong><br/><span className="text-[10px] text-navy-500">dev@creati.mx</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmailInput('pm@creati.mx'); setPasswordInput('admin123') }}
                  className="p-2 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-accent-400/60 text-left text-navy-300 hover:text-white transition-all cursor-pointer"
                >
                  📊 <strong>Product Mgr</strong><br/><span className="text-[10px] text-navy-500">pm@creati.mx</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmailInput('ventas@creati.mx'); setPasswordInput('admin123') }}
                  className="p-2 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-accent-400/60 text-left text-navy-300 hover:text-white transition-all cursor-pointer"
                >
                  💼 <strong>Sales / Mkt</strong><br/><span className="text-[10px] text-navy-500">ventas@creati.mx</span>
                </button>
              </div>
              <p className="text-center text-[10px] text-navy-500 mt-3">
                Contraseña demo para todos: <code>admin123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // INTERFAZ PRINCIPAL TIPO CONFLUENCE
  return (
    <div className={`min-h-screen flex flex-col pt-16 font-['Roboto',sans-serif] transition-colors ${themeMode === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>

      {/* Barra de Navegación Superior del Hub */}
      <header className={`fixed top-0 left-0 right-0 h-16 border-b z-50 flex items-center justify-between px-4 sm:px-6 transition-colors ${themeMode === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-500/20 text-accent-400 border border-accent-500/30 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base font-bold tracking-tight font-sans">
              Creati <span className="text-accent-400">Knowledge Hub</span>
            </span>
            <span className="text-[10px] bg-navy-800 text-navy-300 px-2 py-0.5 rounded-full ml-2 font-mono uppercase">
              v1.0 RBAC
            </span>
          </div>
        </div>

        {/* Buscador Global Tipo Spotlight */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className={`w-full flex items-center justify-between px-4 py-2 border rounded-xl text-xs transition-colors cursor-pointer ${
              themeMode === 'light'
                ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-500'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-accent-500" />
              <span>Buscar en proyectos, APIs, blueprints o roadmaps...</span>
            </div>
            <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-300">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Usuario & Acciones */}
        <div className="flex items-center gap-3">
          {currentUser.role === 'SUPER_ADMIN' && (
            <>
              <button
                onClick={() => setActiveTab(activeTab === 'docs' ? 'admin_users' : 'docs')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'admin_users'
                    ? 'bg-accent-600 text-white'
                    : themeMode === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{activeTab === 'admin_users' ? 'Ver Documentos' : 'Gestionar Usuarios'}</span>
              </button>
              <button
                onClick={() => setIsPermissionModalOpen(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-accent-500" />
                <span>Matriz de Permisos IAM</span>
              </button>
            </>
          )}

          
          {/* Selector de Tema Claro / Oscuro Suave */}
          <button
            type="button"
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
              themeMode === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Cambiar entre modo claro y oscuro suave"
          >
            {themeMode === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{themeMode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
          </button>

<div className="flex items-center gap-2 pl-3 border-l border-navy-800">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentUser.avatarColor} text-white flex items-center justify-center text-xs font-bold shadow-xs`}>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold block leading-tight font-medium">{currentUser.name}</span>
              <span className="text-[10px] text-accent-400 font-mono block uppercase">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="p-2 text-navy-400 hover:text-white rounded-lg hover:bg-navy-900 transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL DEL HUB */}
      {activeTab === 'admin_users' && currentUser.role === 'SUPER_ADMIN' ? (
        // PANEL SUPERADMIN: GESTIÓN DE USUARIOS
        <div className="max-w-6xl mx-auto w-full p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-200">
            <div>
              <h1 className="text-3xl font-extrabold font-sans font-bold text-slate-900">
                Gestión de Usuarios y Permisos RBAC
              </h1>
              <p className="text-sm text-navy-600 mt-1">
                Control de acceso a la documentación técnica, especificaciones de producto y planes comerciales.
              </p>
            </div>
            <button
              onClick={() => setShowCreateUserModal(true)}
              className="px-4 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Invitar / Crear Usuario
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy-50/70 text-navy-700 font-bold uppercase tracking-wider border-b border-navy-100">
                  <tr>
                    <th className="p-4">Usuario</th>
                    <th className="p-4">Correo</th>
                    <th className="p-4">Rol Asignado</th>
                    <th className="p-4">Acceso a Documentos</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Fecha Alta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-navy-950 flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${u.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-4 text-navy-600 font-mono">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                          u.role === 'SUPER_ADMIN' ? 'bg-amber-100 text-amber-800' :
                          u.role === 'DEVELOPER' ? 'bg-sky-100 text-sky-800' :
                          u.role === 'PRODUCT_MANAGER' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-navy-600">
                        {u.role === 'SUPER_ADMIN' && 'Acceso Ilimitado (100% de la Suite)'}
                        {u.role === 'DEVELOPER' && 'Arquitectura, APIs, Seguridad y Deploys'}
                        {u.role === 'PRODUCT_MANAGER' && 'FRDs, Roadmaps y Especificaciones'}
                        {u.role === 'SALES_MARKETING' && 'Pitches, Pricing y Estrategias SEO'}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Activo
                        </span>
                      </td>
                      <td className="p-4 text-navy-400 font-mono">{u.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Editar Usuario */}
          {editingUser && (
            <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-navy-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold font-sans text-slate-900">Editar Miembro del Equipo</h3>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-navy-600 mb-6">Modifica los datos personales y el rol RBAC asignado a este usuario.</p>
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Correo Corporativo</label>
                    <input
                      type="email"
                      required
                      value={editUserEmail}
                      onChange={(e) => setEditUserEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-accent-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Rol y Nivel de Acceso RBAC</label>
                    <select
                      value={editUserRole}
                      onChange={(e) => setEditUserRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 border rounded-xl text-sm bg-white outline-none focus:border-accent-500"
                    >
                      <option value="DEVELOPER">Developer (Arquitectura, APIs, Seguridad)</option>
                      <option value="PRODUCT_MANAGER">Product Manager (FRDs, Roadmaps)</option>
                      <option value="SALES_MARKETING">Sales & Marketing (Pricing, Pitches)</option>
                      <option value="SUPER_ADMIN">Super Admin (Control Total)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="flex-1 py-2.5 rounded-xl border border-navy-200 text-xs font-bold text-navy-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Crear Usuario */}
          {showCreateUserModal && (
            <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-navy-100">
                <h3 className="text-xl font-bold font-sans font-bold text-slate-900 mb-2">Crear Nuevo Miembro del Equipo</h3>
                <p className="text-xs text-navy-600 mb-6">El nuevo usuario podrá ingresar al Knowledge Hub con los permisos correspondientes.</p>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="ej. Valeria Méndez"
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Correo Corporativo</label>
                    <input
                      type="email"
                      required
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="ej. valeria@creati.mx"
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1">Rol y Nivel de Acceso</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
                    >
                      <option value="DEVELOPER">Developer (Arquitectura, APIs, Seguridad)</option>
                      <option value="PRODUCT_MANAGER">Product Manager (FRDs, Roadmaps)</option>
                      <option value="SALES_MARKETING">Sales & Marketing (Pricing, Pitches)</option>
                      <option value="SUPER_ADMIN">Super Admin (Control Total)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateUserModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-navy-200 text-xs font-bold text-navy-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold cursor-pointer shadow-sm"
                    >
                      Guardar Usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        // EXPERIENCIA CONFLUENCE: ARBOL DE NAVEGACION + VISOR MARKDOWN
        <div className="flex-1 flex overflow-hidden">
          {/* SIDEBAR IZQUIERDA: Árbol de Documentos */}
          <aside
            className={`border-r flex flex-col shrink-0 h-[calc(100vh-4rem)] relative transition-all duration-300 ease-in-out ${
              isSidebarCollapsed ? 'w-16' : 'w-80'
            } ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            {/* Botón flotante para alternar Sidebar (Atajo '[') */}
            <button
              type="button"
              onClick={toggleSidebar}
              className={`absolute top-3 -right-3 z-50 w-7 h-7 rounded-full border shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={isSidebarCollapsed ? "Expandir barra lateral ('[')" : "Colapsar barra lateral ('[')"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-3.5 h-3.5 text-accent-500" />
              ) : (
                <PanelLeftClose className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Vista Miniatura Colapsada */}
            {isSidebarCollapsed ? (
              <div className="flex-1 flex flex-col items-center py-4 space-y-4 select-none">
                <button
                  type="button"
                  onClick={toggleSidebar}
                  title="Expandir barra lateral ('[')"
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-accent-500 cursor-pointer"
                >
                  <Folder className="w-5 h-5" />
                </button>
                <div className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                <button
                  type="button"
                  onClick={() => { setSelectedEcosystem('abogalia'); if (isSidebarCollapsed) toggleSidebar() }}
                  title="Abogalia"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Scale className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedEcosystem('brokar'); if (isSidebarCollapsed) toggleSidebar() }}
                  title="Brokar"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Building2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedEcosystem('medical'); if (isSidebarCollapsed) toggleSidebar() }}
                  title="Medical"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Stethoscope className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedEcosystem('all'); if (isSidebarCollapsed) toggleSidebar() }}
                  title="Toda la Suite"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
            {/* Header del Sidebar: Ecosistemas + Buscador en el Tree */}
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Ecosistemas
                </label>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {filteredDocs.length} docs
                </span>
              </div>
              {/* Tabs de Ecosistemas con SVG */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedEcosystem('all')}
                  className={"px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer " + (selectedEcosystem === 'all' ? "bg-accent-600 text-white shadow-xs" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300")}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="truncate">Toda la Suite</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEcosystem('abogalia')}
                  className={"px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer " + (selectedEcosystem === 'abogalia' ? "bg-amber-600 text-white shadow-xs" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300")}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="truncate">Abogalia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEcosystem('brokar')}
                  className={"px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer " + (selectedEcosystem === 'brokar' ? "bg-blue-600 text-white shadow-xs" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300")}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="truncate">Brokar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEcosystem('medical')}
                  className={"px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer " + (selectedEcosystem === 'medical' ? "bg-emerald-600 text-white shadow-xs" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300")}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span className="truncate">Medical</span>
                </button>
              </div>
              {/* Buscador en el Tree */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={treeFilterTerm}
                  onChange={(e) => setTreeFilterTerm(e.target.value)}
                  placeholder="Buscar en árbol de documentos..."
                  className="w-full pl-8.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                />
                {treeFilterTerm && (
                  <button
                    type="button"
                    onClick={() => setTreeFilterTerm('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
{/* Listado de Documentos */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-navy-400 uppercase tracking-wider">
                <span>Documentos ({filteredDocs.length})</span>
                <span className="text-[10px] font-mono text-navy-500">Rol: {currentUser.role}</span>
              </div>

              {filteredDocs.length === 0 ? (
                <div className="p-6 text-center text-xs text-navy-400">
                  No hay documentos disponibles con tu filtro o nivel de acceso actual.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectDoc(doc.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-2.5 cursor-pointer ${
                      selectedDocId === doc.id
                        ? (themeMode === 'light' ? 'bg-slate-200/80 border border-slate-300 text-slate-950 font-semibold shadow-xs' : 'bg-slate-800 border border-slate-700 text-white font-semibold shadow-xs')
                        : (themeMode === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800/60 text-slate-300')
                    }`}
                  >
                    <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${
                      selectedDocId === doc.id ? 'text-accent-600' : 'text-navy-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{doc.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-navy-500">
                        <span className="uppercase font-semibold tracking-wider">{doc.ecosystem}</span>
                        <span>•</span>
                        <span className="font-mono text-accent-700 font-bold">
                          {doc.requiredRole === 'ALL' ? 'PÚBLICO' : doc.requiredRole.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
              </>
            )}
          </aside>

          {/* VISOR DE CONTENIDO (CONFLUENCE PAGE) */}
          <main className={`flex-1 overflow-y-auto h-[calc(100vh-4rem)] p-8 sm:p-12 transition-colors ${themeMode === 'light' ? 'bg-white text-slate-900' : 'bg-slate-900/60 text-slate-100'}`}>

            {currentDoc ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Barra de Acciones y Migas de Pan Confluence */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-400">Hub</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="uppercase font-bold text-accent-600 dark:text-accent-400">
                      {currentDoc.ecosystem}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="capitalize">{currentDoc.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Botón Historial de Versiones */}
                    <button
                      type="button"
                      onClick={() => setIsVersionHistoryOpen(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        themeMode === 'dark'
                          ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                      title="Ver historial de auditoría y versiones anteriores"
                    >
                      <History className="w-3.5 h-3.5 text-accent-500" />
                      <span>Historial ({currentDoc.versions?.length || 1})</span>
                    </button>

                    {saveFeedback && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                        <Check className="w-3.5 h-3.5" /> Guardado
                      </span>
                    )}

                                        {/* Botón Gemini AI Assistant */}
                    <button
                      type="button"
                      onClick={() => setIsGeminiOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-accent-500/40 bg-gradient-to-r from-sky-500/10 to-accent-500/10 hover:from-sky-500/20 hover:to-accent-500/20 text-accent-600 dark:text-accent-400 text-xs font-semibold cursor-pointer transition-all shadow-xs"
                      title="Abrir Asistente Gemini AI para resúmenes de venta o técnicos"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                      <span>Gemini AI</span>
                    </button>

                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={handleStartEdit}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                          themeMode === 'dark'
                            ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                            : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                        title="Modificar contenido del documento"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-accent-500" />
                        <span>Editar Página</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit()}
                          className="px-3 py-1.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Guardar Cambios</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta cabecera del documento */}
                <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-navy-100 text-navy-800 text-[11px] font-bold uppercase tracking-wider">
                      {currentDoc.ecosystem}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                      currentDoc.requiredRole === 'DEVELOPER' ? 'bg-sky-100 text-sky-800' :
                      currentDoc.requiredRole === 'PRODUCT_MANAGER' ? 'bg-emerald-100 text-emerald-800' :
                      currentDoc.requiredRole === 'SALES_MARKETING' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {currentDoc.requiredRole === 'ALL' ? 'Todos los Roles' : currentDoc.requiredRole.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-navy-400 ml-auto flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Actualizado: {currentDoc.lastUpdated}
                    </span>
                  </div>

                  <h1 className={`text-2xl sm:text-3xl font-bold font-['Roboto',sans-serif] tracking-tight leading-tight mb-3 ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>

                    {currentDoc.title}
                  </h1>
                  <p className={`text-sm leading-relaxed ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>

                    {currentDoc.summary}
                  </p>

                  
                {/* Barra de Control de Ofuscacion y Data-Masking */}
                <div className="flex items-center justify-between border-t border-b border-navy-100/60 py-2.5 my-4 px-3.5 py-2.5 rounded-xl border ${themeMode === 'light' ? 'bg-slate-100/80 border-slate-200 text-slate-800' : 'bg-slate-800/80 border-slate-700 text-slate-200'}">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-navy-800">Capa de Seguridad y Ofuscacion Dinamica RBAC</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">Activa ({currentUser?.role})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMaskSensitiveData(!maskSensitiveData)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-navy-200 hover:bg-white text-xs font-medium text-navy-700 transition-colors shadow-sm"
                  >
                    {maskSensitiveData ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{maskSensitiveData ? 'Mascara Activa (Datos Protegidos)' : 'Ver Sin Ofuscar'}</span>
                  </button>
                </div>
    
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {currentDoc.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-navy-600 text-[10px] font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visor Enriquecido / Editor Confluence Pro con Barra de Herramientas */}
                {isEditing ? (
                  <RichDocumentEditor
                    initialContent={currentDoc.content}
                    docTitle={currentDoc.title}
                    themeMode={themeMode}
                    onSave={(newContent, summary) => handleSaveEdit(newContent, summary)}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <div className="my-6">
                    <MarkdownRenderer
                      content={
                        maskSensitiveData && currentUser
                          ? obfuscateSensitiveContent(currentDoc.content, currentUser.role)
                          : currentDoc.content
                      }
                      themeMode={themeMode}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-navy-400">
                <div>
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Selecciona un documento de la barra lateral para comenzar la lectura.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
            {/* Asistente Google Gemini AI */}
      {currentDoc && (
        <GeminiDocAssistant
          isOpen={isGeminiOpen}
          onClose={() => setIsGeminiOpen(false)}
          docTitle={currentDoc.title}
          docContent={currentDoc.content}
          userRole={currentUser.role}
          themeMode={themeMode}
        />
      )}

            {/* Modal Historial de Versiones y Auditoría */}
      {currentDoc && (
        <VersionHistoryModal
          isOpen={isVersionHistoryOpen}
          onClose={() => setIsVersionHistoryOpen(false)}
          docTitle={currentDoc.title}
          versions={currentDoc.versions || []}
          currentContent={currentDoc.content}
          onRestoreVersion={handleRestoreVersion}
          themeMode={themeMode}
        />
      )}

      {/* Modal Matriz de Permisos IAM por Rol y por Usuario */}
      <PermissionManagerModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        users={usersList}
        roles={rolesList}
        onUpdateUsers={handleUpdateUsers}
        onUpdateRoles={handleUpdateRoles}
        themeMode={themeMode}
      />

      {/* Modal Buscador Spotlight */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        documents={documents.filter(canViewDoc)}
        onSelectDoc={handleSelectDoc}
        themeMode={themeMode}
      />
    </div>
  )
}