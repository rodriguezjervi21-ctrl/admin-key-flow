export interface ProxyKey {
  key: string;
  type: 'Normal' | 'Premium';
  status: 'Activa' | 'Usada' | 'Expirada' | 'Bloqueada';
  duration: string;
  durationMs: number;
  createdAt: string;
  usedBy?: string;
  activatedAt?: string;
  expiresAt?: string;
}

export interface ActiveUser {
  name: string;
  key: string;
  type: string;
  loginAt: string;
  expiresAt: string;
  blocked: boolean;
}

const KEYS_STORAGE = 'proxy_keys';
const USERS_STORAGE = 'proxy_active_users';

export function getKeys(): ProxyKey[] {
  const raw = localStorage.getItem(KEYS_STORAGE);
  if (!raw) return [];
  const keys: ProxyKey[] = JSON.parse(raw);
  const now = new Date();
  return keys.map(k => {
    if (k.status === 'Usada' && k.expiresAt && new Date(k.expiresAt) < now) {
      return { ...k, status: 'Expirada' as const };
    }
    return k;
  });
}

export function saveKeys(keys: ProxyKey[]) {
  localStorage.setItem(KEYS_STORAGE, JSON.stringify(keys));
}

export function getActiveUsers(): ActiveUser[] {
  const raw = localStorage.getItem(USERS_STORAGE);
  if (!raw) return [];
  return JSON.parse(raw);
}

export function saveActiveUsers(users: ActiveUser[]) {
  localStorage.setItem(USERS_STORAGE, JSON.stringify(users));
}

export function registerActiveUser(name: string, key: string, type: string, expiresAt: string) {
  const users = getActiveUsers();
  const existing = users.findIndex(u => u.key === key);
  if (existing !== -1) {
    users[existing] = { ...users[existing], name, loginAt: new Date().toISOString(), expiresAt };
  } else {
    users.push({ name, key, type, loginAt: new Date().toISOString(), expiresAt, blocked: false });
  }
  saveActiveUsers(users);
}

export function blockUser(key: string) {
  const users = getActiveUsers();
  const idx = users.findIndex(u => u.key === key);
  if (idx !== -1) users[idx].blocked = true;
  saveActiveUsers(users);
}

export function unblockUser(key: string) {
  const users = getActiveUsers();
  const idx = users.findIndex(u => u.key === key);
  if (idx !== -1) users[idx].blocked = false;
  saveActiveUsers(users);
}

export function kickUser(key: string) {
  const users = getActiveUsers().filter(u => u.key !== key);
  saveActiveUsers(users);
}

export function deleteUser(key: string) {
  kickUser(key);
  const keys = getKeys().filter(k => k.key !== key);
  saveKeys(keys);
}

export function reduceKeyTime(key: string, reduceMs: number) {
  const keys = getKeys();
  const idx = keys.findIndex(k => k.key === key);
  if (idx !== -1 && keys[idx].expiresAt) {
    const newExpiry = new Date(new Date(keys[idx].expiresAt!).getTime() - reduceMs);
    keys[idx].expiresAt = newExpiry.toISOString();
    if (newExpiry < new Date()) keys[idx].status = 'Expirada';
  }
  saveKeys(keys);
}

export function isUserBlocked(key: string): boolean {
  const users = getActiveUsers();
  const clean = key.trim().toUpperCase();
  const user = users.find(u => u.key.trim().toUpperCase() === clean);
  return user?.blocked ?? false;
}

export function generateKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `PROXY-${segment()}-${segment()}`;
}

export function generateKeys(count: number, type: ProxyKey['type'], duration: string): ProxyKey[] {
  const durationMap: Record<string, number> = {
    '1 minuto': 60 * 1000,
    '1 día': 24 * 60 * 60 * 1000,
    '7 días': 7 * 24 * 60 * 60 * 1000,
    '30 días': 30 * 24 * 60 * 60 * 1000,
  };

  const newKeys: ProxyKey[] = [];
  for (let i = 0; i < count; i++) {
    newKeys.push({
      key: generateKey(),
      type,
      status: 'Activa',
      duration,
      durationMs: durationMap[duration] || 0,
      createdAt: new Date().toISOString(),
    });
  }
  return newKeys;
}

export function validateKey(inputKey: string): ProxyKey | null {
  const keys = getKeys();
  const clean = inputKey.trim().toUpperCase();
  return keys.find(k => k.key.trim().toUpperCase() === clean && k.status === 'Activa') || null;
}

export function activateKey(inputKey: string, userName: string): ProxyKey | null {
  const keys = getKeys();
  const clean = inputKey.trim().toUpperCase();
  const idx = keys.findIndex(k => k.key.trim().toUpperCase() === clean && k.status === 'Activa');
  if (idx === -1) return null;

  const now = new Date();
  keys[idx] = {
    ...keys[idx],
    status: 'Usada',
    usedBy: userName,
    activatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + keys[idx].durationMs).toISOString(),
  };
  saveKeys(keys);
  return keys[idx];
}
