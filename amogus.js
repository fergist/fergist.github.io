function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + "…";
    }
    return str;
}
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 1000) {
        let textElements = document.getElementsByClassName("ads-title");
        for(let i = 0; i < textElements.length; i++){
            let originalText = textElements[i].textContent;
            let maxLength = 34;
            textElements[i].textContent = truncate(originalText, maxLength);
        }
	}
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
window.onload = function(){
    let dates = document.getElementsByClassName("date");
    let mat = document.getElementsByClassName("maxtemp");
    let rat,rit;
    let mit = document.getElementsByClassName("mintemp");
    let imgs = document.getElementsByClassName("wheather-type-icon");
    for (let i = 0; i < dates.length; i++){
        dates[i].textContent = i > 29 ? i-31+2 : i+1; 
        rat = Math.round(getRandomArbitrary(11,23));
        rit = Math.round(getRandomArbitrary(-8,+8));
        mat[i].textContent = '+'+rat;
        mit[i].textContent = rit < 0 ? rit : '+'+rit;
        let c = Math.random();
        if (c > 0.6){
            imgs[i].getElementsByTagName("img")[0].src = "cloud.png";
        }
        else if (c > 0.3){ imgs[i].getElementsByTagName("img")[0].src= "cloud2.png";}
        else { imgs[i].getElementsByTagName("img")[0].src= "sun.png"; }
    }
    move(); 
}
window.addEventListener('resize', move);



;(function() {
	'use strict'

	class ScrollBox {
		// минимальная высота ползунка скроллбара
		static SCROLLER_HEIGHT_MIN = 25;

		constructor(container) {
			// область просмотра, в которой находится контент и скроллбар
			this.viewport = container.querySelector('.viewport');
			// контейнер, в котором будет прокручиваться информация
			this.contentBox = container.querySelector('.content-box');
			// флаг нажатия на левую кнопку мыши
			this.pressed = false;
			this.init();
		}

		init() {
			// высоты полученных элементов
			this.viewportHeight = this.viewport.offsetHeight;
			this.contentHeight = this.contentBox.scrollHeight;
			// если высота контента меньше или равна высоте вьюпорта,
			// выходим из функции
			if (this.viewportHeight >= this.contentHeight) return;
			
			// возможная максимальная прокрутка контента
			this.max = this.viewport.clientHeight - this.contentHeight;
			// соотношение между высотами вьюпорта и контента
			this.ratio = this.viewportHeight / this.contentHeight;
			// формируем полосу прокрутки и полунок
			this.createScrollbar();
			// устанавливаем обработчики событий
			this.registerEventsHandler();
		}

		createScrollbar() {
			// создаём новые DOM-элементы DIV из которых будет
			// сформирован скроллбар
			const scrollbar = document.createElement('div'),
				  scroller = document.createElement('div');

			// присваиваем созданным элементам соответствующие классы
			scrollbar.className = 'scrollbar';
			scroller.className = 'scroller';

			// вставляем созданные элементы в document
			scrollbar.appendChild(scroller);
			this.viewport.appendChild(scrollbar);

			// получаем DOM-объект ползунка полосы прокрутки, вычисляем и
			// устанавливаем его высоту
			this.scroller = this.viewport.querySelector('.scroller');
			this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
			this.scrollerHeight = (this.scrollerHeight <= ScrollBox.SCROLLER_HEIGHT_MIN) ? ScrollBox.SCROLLER_HEIGHT_MIN : this.scrollerHeight;
			this.scroller.style.height = this.scrollerHeight + 'px';
		}

		// регистрация обработчиков событий
		registerEventsHandler(e) {
			// вращение колёсика мыши
			this.contentBox.addEventListener('scroll', () => {
				this.scroller.style.top = (this.contentBox.scrollTop * this.ratio) + 'px';
			});

			// нажатие на левую кнопку мыши
			this.scroller.addEventListener('mousedown', e => {
				// координата по оси Y нажатия левой кнопки мыши
				this.start = e.clientY;
				// устанавливаем флаг, информирующий о нажатии левой кнопки мыши
				this.pressed = true;
			});

			// перемещение мыши
			document.addEventListener('mousemove', this.drop.bind(this));

			// отпускание левой кнопки мыши
			document.addEventListener('mouseup', () => this.pressed = false);
		}

		drop(e) {
			e.preventDefault();
			// если кнопка мыши не нажата, прекращаем работу функции
			if (this.pressed === false) return;

			// величина перемещения мыши
			let shiftScroller = this.start - e.clientY;
			// изменяем положение бегунка на величину перемещения мыши
			this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';

			// величина, на которую должен переместиться контент
			let shiftContent = this.scroller.offsetTop / this.ratio;
			// сумма высоты ползунка и его отступа от верхней границы вьюпорта
			const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
			// максимальный отступ, который может быть у ползунка в зависимости от его
			// высоты и высоты вьюпорта
			const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;

			// ограничиваем перемещение ползунка
			// по верхней границе вьюпорта
			if (this.scroller.offsetTop < 0) this.scroller.style.top = '0px';
			// по нижней границе вьюпорта
			if (totalheightScroller >= this.viewportHeight) this.scroller.style.top = maxOffsetScroller + 'px';

			// прокручиваем контент на величину пропорциональную перемещению ползунка
			this.contentBox.scrollTo(0, shiftContent);
			// устанавливаем координату Y начала движения мыши равной текущей координате Y
			this.start = e.clientY;
		}
	}

	// выбираем все блоки на странице, в которых может понадобиться
	// прокрутка контента
	const containers = document.querySelectorAll('.containerc');
	// перебираем полученную коллекцию элементов
	for (let container of containers) {
		// создаём экземпляр контейнера, в котором будем прокручивать контент
		const scrollbox = new ScrollBox(container);
	}
})();