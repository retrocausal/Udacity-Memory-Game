//IMPORTANT
//We check for the webcomponent event first, because, we absolutely NEED them loaded
window.addEventListener('WebComponentsReady', (W) => {
  const Game = oGamebuilders.get('SuperheroMindMapBuilder');
  const play = function () {
    new Game()
      .play();
    return oGamebuilders.delete('SuperheroMindMapBuilder');
  }; //Sometimes, because webcomponents load quicker (No Idea how to predict the sequence of loads)
  //we need to check if doc parsing has finished within
  const docLoaded = () => {
    let polly;
    if (document.readyState === "complete") {
      polly = window.cancelAnimationFrame(polly);
      //On doc ready, blink and play
      return play();
    }
    //Keep polling polly!
    return polly = window.requestAnimationFrame(() => {
      return docLoaded();
    });
  };
  return docLoaded();
});