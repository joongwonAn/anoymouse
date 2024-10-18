/**
 * ./public/myinfo.js
 * 
 * 코드 작성자 : 안중원
 */

// 닉네임 수정
document.getElementById('nick-form').addEventListener('submit', async (e) => {
    const newNick = e.target.newnick.value;
    
    if (!newNick) {
        return alert('새로운 닉네임을 입력하세요');
    }
    try {
       
        await axios.patch('/myinfo/editnick', { userNickname: newNick });
        confirm("SUCCSESS!!!!!!!!!!!!!!!!");
    } catch (err) {
        console.error(err);
    }

});

document.getElementById('pw-form').addEventListener('submit', async (e) => {
    const nowPw = e.target.nowpw.value;
    const newPw = e.target.newpw.value;
    const confirmNewPw = e.target.confirmnewpw.value;

    if(!nowPw){
        return alert('현재 비밀번호를 입력하세요');
    }
    if(!newPw){
        return alert('새로운 비밀번호를 입력하세요');
    }
    if(!confirmNewPw){
        return alert('새 비밀번호 확인을 입력하세요');
    }
    if( newPw != confirmNewPw ){
        return alert("새로운 비밀번호가 일치하지 않습니다.");
    }
    try {
        await axios.patch('/myinfo/editpw', { nowpw: nowPw, newpw: newPw });
    } catch (err) {
        console.error(err);
    }
});
