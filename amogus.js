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
	} else {
		let textElements = document.getElementsByClassName("ads-title");
        for(let i = 0; i < textElements.length; i++){
            let originalText = textElements[i].textContent;
            textElements[i].textContent = originalText;
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
        if (Math.random(1) == 1){
            imgs[i].firstChild.src = "cloud.png"; 
        }
        else imgs[i].firstChild.src = "cloud2.png";
    }
    move();

}
window.addEventListener('resize', move);

//Функция
