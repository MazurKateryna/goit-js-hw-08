import galleryItems from './gallery-items.js';

const markupRender = function() {
  return galleryItems.reduce(
    (acc, item) =>
      acc +
      ` <li class="gallery__item">
          <a class="gallery__link" href="${item.original}">
           <img class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"/>
           </a>
        </li> `,
    ""
  );
};

const galleryList = document.querySelector(".js-gallery");
galleryList.insertAdjacentHTML("beforeend", markupRender());

const lightbox = document.querySelector(".js-lightbox");
const lightboxImg = document.querySelector(".lightbox__image");
const lightboxButton = document.querySelector('button[data-action="close-lightbox"]');
const lightboxContent = document.querySelector('.lightbox__content')

galleryList.addEventListener('click', onGalleryClick);
lightboxButton.addEventListener('click', closeModal);
lightboxContent.addEventListener('click', closeButton);

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;

  if(imageRef.nodeName !== 'IMG'){
    return;
  }
  lightboxImg.setAttribute("src", imageRef.dataset.source);
  lightboxImg.setAttribute("alt", imageRef.alt);
  lightbox.classList.add("is-open");
  window.addEventListener('keydown', keyPressEscape);
}

function closeModal(event) { 
  lightbox.classList.remove("is-open");
  lightboxImg.src = '';
  lightboxImg.alt = '';
  window.removeEventListener('keydown', keyPressEscape);
}

function closeButton(event) {
  if(event.target !== "BUTTON"){
    return
  }
  closeModal();
}

function keyPressEscape (event) {
  if (event.code !== "Escape") {
    return
  }
  closeModal();
}