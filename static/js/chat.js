var text_box = '<div class="imessage"><div id= \'{message.id}\' style="align-self: flex-end;">  <p class="from-me"> <a onclick= \'delete_msj("{message.id}")\'>x</a> <br><b>Tú: </b> <br> {message}</p> </div></div>';

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



function send(sender, message,image){
    console.log(sender);
    console.log(message);
    
    var form = new FormData(document.getElementById('chat-box'));
    var imageURL = $('#image').val();

    console.log(imageURL);
    
    const request = new XMLHttpRequest();
    request.open("POST","/api/message/");
    request.setRequestHeader("X-CSRFToken", getCookie('csrftoken')); 
    
    request.send(form);
    request.onload = ()=>{
        console.log("request");
        console.log(request);
        console.log(request.response);
    }

    var box = text_box.replace('{sender}', "You");
        box = box.replace('{message}', message);
        box = box.replace('{message.id}', "Last_created");
        
        $('#board').append(box);
        scrolltoend();
    document.getElementById("id_message").value = "";
    document.getElementById("image").value = "";
}


function scrolltoend() {
    $('#board').stop().animate({
        scrollTop: $('#board')[0].scrollHeight
    }, 800);
}


function delete_msj(id){
    console.log("Elimi")
    console.log(id);
    const formData = new FormData();
    formData.append('id', id);

    fetch("/api/message/"+id,{
        method:"DELETE",
        body: formData,
        headers :{
             "X-CSRFToken": getCookie('csrftoken'),
        }
        })
        
        window.alert("Mensaje eliminado");
        
}


function updateBoard(){
    $('#board').load('mensages');
}

function receiveDeamon(){
    //DEAMON QUE BUSCA SI HAY NUEVOS MENSAJES
    //SACO LOS MENSAJES QUE TENEMOS EN EL CHATSESION
    const myElement = document.getElementById('chat-session');
    var last_msg=myElement.children[myElement.children.length -1].dataset.time;//SACO LA FECHA DE CRACION DEL ULTIMO MENSAJE EN TEMPLATE ACTUAL
    var date_ultimo_pantalla = new Date(last_msg.substr(0, 21));// LO  CONVIERTO A FECHA, ENTONCES TENEMOS LA FECHA CON HORA DEL ULTIMO MENSAJE
    //REALIZO CONSULTA AL API REST DE LOS MENSAJES
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1900/api/message',
        success: function(res){//RESPUESTA DEL API
            var consultMaxTime = res[res.length-1].timestamp //SACO EL TIEMPO DEL ULTIMO MENSAJE CREADO EN LA BD
            var  date_ultimo_servidor= new Date(consultMaxTime.substr(0, 19));// CONVIERTO A TIEMPO

            //COMPROBACION PARA VER SI DEBEMOS RECARGAR LOS MENSAJES
            var actualizar = true;
            if(date_ultimo_servidor.getDay() == date_ultimo_pantalla.getDay()){
                if(date_ultimo_servidor.getMonth() == date_ultimo_pantalla.getMonth()){
                    if(date_ultimo_servidor.getFullYear() == date_ultimo_pantalla.getFullYear()){
                        if(date_ultimo_servidor.getHours() == date_ultimo_pantalla.getHours()){
                            if(date_ultimo_servidor.getMinutes() == date_ultimo_pantalla.getMinutes()){
                                if(date_ultimo_servidor.getSeconds() == date_ultimo_pantalla.getSeconds()){
                                    actualizar=false;// SI EL ULTIMO EN PANTALLA ES IGUAL AL ULTIMO EN EL SERVIDOREN DIA,MES,AÑO,HORA,MINUTOS,SEGUNDOS ENTONCES 
                                    //NO ES NECESARIO ACTUALIZAR EL TEMPLATE
                                }
                        }
                    }
                }
            }
        }

            if (actualizar){
                console.log("Actualizar!!!");
                updateBoard();// HABRIA QUE RECARGAR EL TEMPLATE DEL MENSAJE
            }else{
            }

                $.ajaxSetup({
                   headers: {
                     "token": res.token
                   }
                });
        },
        error: function(error) {
            callbackErr(error,self)
        }
    });
}