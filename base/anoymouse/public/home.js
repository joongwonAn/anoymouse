/**
 * ./public/home.js
 * 
 * 코드 작성자 : 안중원
 */

//배너 슬라이드 영역
const slideList = document.querySelector('.banner_img_list'); // Slide parent dom
const slideContents = document.querySelectorAll('.slide_content'); // each slide dom
const slideBtnNext = document.querySelector('.next_btn'); // next button
const slideBtnPrev = document.querySelector('.prev_btn'); // prev button
const bar = document.querySelector('.bar');
const nowNum = document.querySelector('#now_num');
const mainImg1 = document.querySelector('.main_img_1');
const txt1 = document.querySelector('.txt_1');
const txt2 = document.querySelector('.txt_2');
const txt3 = document.querySelector('.txt_3');
const slideLen = slideContents.length; // slide length
const slideWidth = 650; // slide width
const slideSpeed = 400; // slide speed
const startNum = 0; // initial slide index (0 ~ 4)
let slideNum = 1;
slideList.style.width = slideWidth * (slideLen + 2) + "px";
// Copy first and last slide
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);
let autoSlideSpeed = 5000; // auto slide speed
let slideAuto;
// Add copied Slides
slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);
slideList.style.transform = "translateX(-" + (slideWidth * (startNum + 1)) + "px)";
let curIndex = startNum; // current slide index (except copied slide)
let curSlide = slideContents[curIndex]; // current slide dom
curSlide.classList.add('slide_active');
startInterval();
function startInterval() {
    startBarAuto();
    slideAuto = setInterval(function() {
        startBarAuto();
        slideNum++;
        numImgUpdate();
        if (curIndex <= slideLen - 1) {
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translateX(-" + (slideWidth * (curIndex + 2)) + "px)";
        }
        if (curIndex === slideLen - 1) {
            setTimeout(function() {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translateX(-" + slideWidth + "px)";
            }, slideSpeed);
            curIndex = -1;
        }
        curSlide.classList.remove('slide_active');
        curSlide = slideContents[++curIndex];
        curSlide.classList.add('slide_active');
    }, autoSlideSpeed);
}
/** Next Button Event */
slideBtnNext.addEventListener('click', function() {
    clearInterval(slideAuto);
    slideNum++;
    numImgUpdate();
    if (curIndex <= slideLen - 1) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translateX(-" + (slideWidth * (curIndex + 2)) + "px)";
    }
    if (curIndex === slideLen - 1) {
        setTimeout(function() {
            slideList.style.transition = "0ms";
            slideList.style.transform = "translateX(-" + slideWidth + "px)";
        }, slideSpeed);
        curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    this.setAttribute("disabled",true);
    setTimeout(function() {
        slideBtnNext.removeAttribute("disabled");
    }, slideSpeed);
    startInterval();
});
/** Prev Button Event */
slideBtnPrev.addEventListener('click', function() {
    clearInterval(slideAuto);
    slideNum--;
    numImgUpdate();
    if (curIndex >= 0) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translateX(-" + (slideWidth * curIndex) + "px)";
    }
    if (curIndex === 0) {
        setTimeout(function() {
            slideList.style.transition = "0ms";
            slideList.style.transform = "translateX(-" + (slideWidth * slideLen) + "px)";
        }, slideSpeed);
        curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    this.setAttribute("disabled",true);
    setTimeout(function() {
        slideBtnPrev.removeAttribute("disabled");
    }, slideSpeed);
    startInterval();
});

// 로딩바 설정 
function startBarAuto() {
    const barAuto = bar.animate([
            {width: '0'},
            {width: '240px'}
        ], 5000);
}
function numImgUpdate() {
    if(slideNum == 4) slideNum = 1;
    if(slideNum < 1) slideNum = 3;
    nowNum.innerText = `0${slideNum}`;
    if(slideNum == 1){
        mainImg1.setAttribute('src', 'logoimg/backmain_1.png');
        txt2.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt2.style.display = 'none';
            txt1.style.display = 'block';
            txt1.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt3.style.display === 'block'){
            // console.log(13);
            txt3.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt3.style.display = 'none';
                txt1.style.display = 'block';
                txt1.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
    else if(slideNum == 2){
        mainImg1.setAttribute('src', 'logoimg/backmain_2.jpg');
        txt1.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt1.style.display = 'none';
            txt2.style.display = 'block';
            txt2.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt3.style.display === 'block'){
             // console.log(23);
            txt3.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt3.style.display = 'none';
                txt2.style.display = 'block';
                txt2.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
    else if(slideNum == 3){
        mainImg1.setAttribute('src', 'logoimg/backmain_3.png');
        txt1.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(40px)', opacity: '0'}
        ], 400);
        setTimeout(() => {
            txt1.style.display = 'none';
            txt3.style.display = 'block';
            txt3.animate([
                {transform: 'translateY(-40px)', opacity: '0'},
                {transform: 'translateY(0)', opacity: '1'}
            ], 1000);
        }, 400);
        if(txt2.style.display === 'block'){
            // console.log(32);
            txt2.animate([
                {transform: 'translateY(0)', opacity: '1'},
                {transform: 'translateY(40px)', opacity: '0'}
            ], 400);
            setTimeout(() => {
                txt2.style.display = 'none';
                txt3.style.display = 'block';
                txt3.animate([
                    {transform: 'translateY(-40px)', opacity: '0'},
                    {transform: 'translateY(0)', opacity: '1'}
                ], 1000);
            }, 400);
        }
    }
}

// 슬라이드 콘텐츠에서
// 버튼을 사용해 다음 슬라이드로 이동함.
// 오른쪽 버튼을 클릭하면, 왼쪽 버튼 보임, 오른쪽 버튼 숨김, 이미지 리스트를 0.3초동안 왼쪽으로 이동시킴.
// 왼쪽 버튼을 클릭하면, 왼쪽 버튼 숨김, 오른쪽 버튼 보임, 이미지 리스트를 0.3초동안 원래대로 돌려놓음.