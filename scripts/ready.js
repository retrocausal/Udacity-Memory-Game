window.addEventListener('WebComponentsReady', (W) => {
  const superHeroMindMap = oGamebuilders.fSuperheroMindMapBuilder();
  const play = function () {
    superHeroMindMap.Game.oGame.build();
    superHeroMindMap.Game.oGame.layout();
    superHeroMindMap.Game.oGame.activate();
    return superHeroMindMap.destroyBuilder();
  };
  const docLoaded = () => {
    let check;
    if (document.readyState === "complete") {
      setTimeout(play, 100);
      return check = window.cancelAnimationFrame(check);
    }
    return check = window.requestAnimationFrame(() => {
      return docLoaded();
    });
  };
  return docLoaded();
});