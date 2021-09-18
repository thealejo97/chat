var text_box = '<div class="imessage">  <p class="from-me"> <b>Tú: </b> <br> {message}</p> </div>';

current_mesages=null;
const csrftoken = getCookie('csrftoken');
//Saco el tocken csrftoken
function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }


    
function send(sender, message){
    console.log(sender);
    console.log(message);
    var form = new FormData(document.getElementById('chat-box'));
    bodyC ='/api/message/', '{"sender": "'+ sender +'","message": "'+ message +'" }';
    fetch("/api/message/",{
        method:"POST",
        body: form,
        headers :{
             "X-CSRFToken": getCookie('csrftoken'),
        }
        })
    
    var box = text_box.replace('{sender}', "You");
        box = box.replace('{message}', message);
        $('#board').append(box);
        scrolltoend();
    var inputMessage= document.getElementById("id_message").value = "";
}


function scrolltoend() {
    $('#board').stop().animate({
        scrollTop: $('#board')[0].scrollHeight
    }, 800);
}

function receive() {
    console.log("Consultando2 ",current_msj.length);
    //console.log("Mensajes actuales en pantalla ", current_show_messages);
    //respuesta= null;

    const request = new XMLHttpRequest();
    request.open("GET","/api/message/");
    request.send();
    request.onload = ()=>{
        console.log("request");
        console.log(request.response.lenght);
    }
}