/**
 * ./public/detail.js
 * 
 * 코드 작성자 : 안중원
 */

// 관심 button Click
const attentionBtn =  document.querySelector('.attention');

attentionBtn.addEventListener('click', function() {
    confirm("관심 상품 등록");
})

// 사용자가 등록한 이미지 click
const userIMG =  document.querySelector('.user_book_img');

userIMG.addEventListener('click', function() {
    showPopupIMG();

})

function showPopupIMG() {
    const popup = document.querySelector('#img_popup');

    popup.classList.add('has-filter');

    popup.classList.remove('hide');
}
function closePopupIMG() {
    const popup = document.querySelector('#img_popup');
    popup.classList.add('hide');
}