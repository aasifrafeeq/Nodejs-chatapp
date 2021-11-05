const socket = io()
const chatInfo = document.querySelector('.chat-info')
const chatMain = document.querySelector('#chat-section')
const chatForm =  document.querySelector('.chat-form')
const chatInput = document.getElementById('chat-input')
const userName = document.getElementById('username')
const chatMsgs = document.querySelector('.chat-msgs')
const sendBtn = document.querySelector('.chat-submit')
const Uname =  document.querySelector('.uname')
let user = ''
sendBtn.disabled = true

userName.onchange = ()=>{
    if (userName.value.lenght != 0){
        sendBtn.disabled = false
    }
}

function scrollDown(){
    chatMsgs.scrollTop = chatMsgs.scrollHeight
}
chatForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    user = userName.value
    userName.style.display = 'none'
    Uname.style.display = 'none'
    if(chatInput.value != ""){
        let div = document.createElement('div')
        div.innerText = `You : ${chatInput.value}`
        div.style='position:relative;right:0'
        chatMsgs.appendChild(div)
        scrollDown()
        socket.emit('chat',{user:user, msg:chatInput.value})
        chatInput.value =''
    }
})
socket.on('chat',(data)=>{
    if (data.user != user){
        const div = document.createElement('div')
        div.innerText = `${data.user} : ${data.msg}`
        chatMsgs.appendChild(div)
        scrollDown()
    }
})

socket.on('users',(data)=>{
    console.log(data)
    chatInfo.innerText = `${data.online} users online.`
})