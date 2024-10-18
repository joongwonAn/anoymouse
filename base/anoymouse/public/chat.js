/**
 * ./public/chat.js
 * 
 * 코드 작성자 : 정지창
 */

(function(t,a,l,k,j,s){
s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
.push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);

const start = async function () {
await Talk.ready;
const me = new Talk.User({
  id: '123456',
  name: 'Alice',
  email: 'alice@example.com',
  photoUrl: 'https://demo.talkjs.com/img/alice.jpg',
  welcomeMessage: 'Hey there! How are you? :-)',
});
const session = new Talk.Session({
  appId: 'tCQRcnB1',
  me: me,
});
const other = new Talk.User({
  id: '854321',
  name: '판매자1',
  email: 'Sebastian@example.com',
  photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
  welcomeMessage: '상대가 입장하였습니다.',
});

const conversation = session.getOrCreateConversation(
  Talk.oneOnOneId(me, other)
);
conversation.setParticipant(me);
conversation.setParticipant(other);

const inbox = session.createInbox();
inbox.select(conversation);
inbox.mount(document.getElementById('talkjs-container'));
}

start();