import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

function toggleClass(element, isVisible) {
  element.classList.toggle('ss-hidden', !isVisible);
}

function selectorUpload() {
  fetchBreeds()
    .then(function (breeds) {
      const slimSelector = breeds.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
      );
      selector.insertAdjacentHTML('afterbegin', slimSelector.join(''));
      new SlimSelect({
        select: selector,
      });
    })
    .catch(function (error) {
      onError();
    })
    .finally(function () {
      toggleClass(loader, false);
      toggleClass(catInfo, false);
    });
}

function createMarkup(evt) {
  toggleClass(catInfo, false);
  toggleClass(loader, true);
  toggleClass(selector, true);

  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(function (catData) {
      const { url, breeds } = catData[0];

      catInfo.innerHTML = `
        <img class="cat-picture" src="${url}" alt="${breeds[0].name}" width="400" loading="lazy" />
        <div class="text-box">
          <h2>${breeds[0].name}</h2>
          <p>${breeds[0].description}</p>
          <p><b>Temperament: </b>${breeds[0].temperament}</p>
          <p><b>Origin: </b>${breeds[0].origin}</p>
        </div>`;
    })
    .catch(function (error) {
      onError();
    })
    .finally(function () {
      toggleClass(loader, false);
      toggleClass(selector, true);
      toggleClass(catInfo, true);
    });
}

function onError() {
  iziToast.error({
    title: '🔻 Oops!',
    message: 'Something went wrong! Try reloading the page!',
    position: 'topCenter',
    timeout: 1500,
  });
  toggleClass(loader, false);
  toggleClass(selector, true);
}

selector.addEventListener('change', createMarkup);
selectorUpload();
