export function computeTopLanguages(nodes: any[]): { name: string; percent: number }[] {
  const langSize: Record<string, number> = {};
  let totalSize = 0;

  for (const repo of nodes) {
    if (!repo.languages || !repo.languages.edges) continue;
    
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      const size = edge.size;
      langSize[name] = (langSize[name] || 0) + size;
      totalSize += size;
    }
  }

  if (totalSize === 0) return [];

  const languages = Object.entries(langSize)
    .map(([name, size]) => ({
      name,
      percent: Number(((size / totalSize) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.percent - a.percent);

  return languages.slice(0, 5);
}
