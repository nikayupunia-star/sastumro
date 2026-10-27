import type { SiteModule } from './types';

// ახალი საიტის დასამატებლად საკმარისია src/modules/<name>/index.ts-ის შექმნა —
// ეს ფაილი და store.ts / App.tsx აღარ იცვლება (ამიტომ git-ზე კონფლიქტიც არ მოხდება).
const found = import.meta.glob<{ default: SiteModule }>('../modules/*/index.ts', { eager: true });

export const modules: SiteModule[] = Object.values(found)
  .map((m) => m.default)
  .sort((a, b) => a.id.localeCompare(b.id));
