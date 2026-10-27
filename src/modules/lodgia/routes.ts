export const BASE = '/lodgia';
export const p = (path = '/') => (path === '/' ? BASE : BASE + path);
