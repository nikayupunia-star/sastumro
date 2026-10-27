// თითოეული src/modules/<name>/*.css ავტომატურად იზოლირდება .<name>-root wrapper-ში,
// რომ ორი საიტის .btn, .grid, .hero და ა.შ. ერთმანეთს არ შეეჯახოს.
// CSS-ს ჩვეულებრივად წერთ — პრეფიქსებს ამატებს build/dev.
export default function scopeModules() {
  return {
    postcssPlugin: 'scope-modules',
    Once(root) {
      const file = (root.source?.input.file ?? '').replace(/\\/g, '/');
      const m = file.match(/\/src\/modules\/([^/]+)\//);
      if (!m) return;
      const name = m[1];
      const W = `.${name}-root`;

      const kf = new Set();
      root.walkAtRules(/keyframes$/, (r) => { kf.add(r.params); r.params = `${name}-${r.params}`; });
      root.walkDecls(/^animation(-name)?$/, (d) => {
        for (const n of kf) d.value = d.value.replace(new RegExp(`(^|[\\s,])${n}(?=[\\s,;]|$)`, 'g'), `$1${name}-${n}`);
      });

      const scope = (sel) => {
        sel = sel.trim();
        if (/^(:root|html|body)$/.test(sel)) return W;
        if (/^(:root|html|body)[\s.#:[]/.test(sel)) return sel.replace(/^(:root|html|body)/, W);
        return `${W} ${sel}`;
      };
      root.walkRules((rule) => {
        if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
        rule.selectors = rule.selectors.map(scope);
      });
    },
  };
}
scopeModules.postcss = true;
