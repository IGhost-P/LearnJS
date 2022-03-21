import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // pagination안에 있는 어떠한 자식들중 하나라도 이벤트가 생긴다면, svg, span등 여튼 그렇담 그 위로 .btn--inline'를 가진게 btn이니깐 btn을 찾아 갈수 있다
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(btn);
      handler(goToPage); // dataset을 이용한 값을 핸들러에 전달해준다
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages && numPages > 1) {
      return ` <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // Last Page
    if (curPage === numPages) {
      return ` <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    // other page
    if (curPage < numPages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-goto="${
      curPage + 1
    }">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    }

    // Page 1, and there are No other pages
    return '';
  }
}

export default new PaginationView();
