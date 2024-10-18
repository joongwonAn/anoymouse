/**
 * ./public/layout.js
 * 
 * 코드 작성자 : 안중원
 */

//검색 관련 
$searchBox=$(".search_box");
$searchIcon=$("#search_icon");

//사용자 설정 관련
$clickProfile=$(".click_profile");
$downIcon=$("#down_icon");
$upIcon=$("#up_icon");
$settingArea=$(".setting_area");

// 메인 메뉴 아이템들 
$mainMenu=$(".main_menu");

$homeLink=$(".home_link");
$partnerLink=$(".partner_link");
$meetingLink=$(".meeting_link");
$feedLink=$(".feed_link");
$menuLink=$(".menu_link");

//검색 박스

// 검색 박스에서 마우스 오버 시, 검색 아이콘 강조
$searchBox.hover(function(){
    $searchIcon.css('color','#042D6F');
});
// 검색 박스에서 마우스 벗어날 시, 검색 아이콘 원래대로
$searchBox.mouseleave(function(){
    $searchIcon.css('color','rgba(4, 45, 111, .7)');
})



//헤더 오른쪽 설정 드롭다운 
let isOpen=true; //드롭다운 여닫기 위한 변수

//프로필 영역을 클릭하여 설정을 열면 사용자 설정 영역, 닫는 아이콘 보이고, 여는 아이콘은 숨김.
//프로필 영역을 클릭하여 설정을 닫는다면 사용자 설정 영역, 닫는 아이콘 숨기고, 여는 아이콘은 보임.
$clickProfile.click(function(){
        if(isOpen==true){
            $settingArea.css('display','block');
            $downIcon.css('display','none');
            $upIcon.css('display','block');
            
            isOpen=false;
            
        }else{
            $settingArea.css('display','none');
            $downIcon.css('display','block');
            $upIcon.css('display','none');
            isOpen=true;
        }
});

//로그아웃 클릭시, 로그인 전 화면
// before_login 보이고 after_login 숨기기
$logout=$("#logout");
$beforeLogin=$(".before_login li p");
$afterLogin=$(".after_login");

$beforeLogin.hover(function(){
    $(this).css('color','#ADC5E7');
})
$beforeLogin.mouseleave(function(){
    $(this).css('color','black');
})

//메인 메뉴 마우스 오버시 흰색으로 강조
$menuLink.hover(function(){
    $(this).css('color','#042D6F');
    $homeLink.css('color','#ADC5E7')
})
$homeLink.hover(function(){
    $homeLink.css('color','#042D6F')

})
$menuLink.mouseleave(function(){
    $(this).css('color','#ADC5E7');
})
$mainMenu.mouseleave(function(){
    $homeLink.css('color','#042D6F');
})


// popUp
function showPopupLogin() {
    const popup = document.querySelector('#login_popup');

    popup.classList.add('has-filter');

    popup.classList.remove('hide');
}
function closePopupLogin() {
    const popup = document.querySelector('#login_popup');
    popup.classList.add('hide');
}
function showPopupJoin() {
    const popup = document.querySelector('#join_popup');

    popup.classList.add('has-filter');

    popup.classList.remove('hide');
}
function closePopupJoin() {
    const popup = document.querySelector('#join_popup');
    popup.classList.add('hide');
}