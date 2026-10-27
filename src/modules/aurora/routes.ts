export const BASE = "/aurora";
export const p = (path = "/") => (path === "/" ? BASE : BASE + path);
