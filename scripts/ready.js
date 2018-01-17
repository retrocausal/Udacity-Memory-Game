$(() => {
  const superHeroMindMap = games.oSuperheroMindMap();
  superHeroMindMap.build();
  superHeroMindMap.layout(".deck");
  return superHeroMindMap.activate();
});