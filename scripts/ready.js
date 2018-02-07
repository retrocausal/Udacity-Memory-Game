//IMPORTANT
//We check for the webcomponent event first, because, we absolutely NEED them loaded
window.addEventListener('WebComponentsReady', (W) => {
  const Game = oGamebuilders.get('SuperheroMindMapBuilder');
  const play = function () {
    new Game()
      .play();
    return oGamebuilders.delete('SuperheroMindMapBuilder');
  };
  const playWhenReady = () => {
    document.onreadystatechange = function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        play();
      }
    }
  };
  return (document.readyState === 'interactive' || document.readyState === 'complete') ? play() : playWhenReady();
});