// import {findRecipe, createModal} from ДЛЯ МОДАЛКИ РЕЦЕПТА

const popularModalOpen = document.querySelector('.js-card-button');

popularModalOpen.addEventListener('click', handlerClick);

function handlerClick(event) {
  event.preventDefault();

  const recipe = findRecipe(event.target);
  createModal(recipe);
}
