from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .models import Message
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from .serializer import MessageSerializer
from .forms import UserRegisterForm
from django.contrib.auth.forms import UserCreationForm


from django.http import JsonResponse
import json

def room(request):
    messages =  Message.objects.all()
    context = {'users': User.objects.exclude(username=request.user.username), "messages":messages}
    return render(request , 'room/room.html', context)

def mensages(request):
    print("")
    print("CARGANDO")
    messages =  Message.objects.all()
    context = {'users': User.objects.exclude(username=request.user.username), "messages":messages}
    return render(request , 'room/mensages.html', context)

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST) #Creo la form por defecto de Django
        if form.is_valid():
            form.save()
            return redirect('room')
    else:
        form = UserRegisterForm()
    context = {'form':form}
    
    return render(request, 'room/register.html',context)



class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    def get (self,request):
        messages =  list(Message.objects.all())
        if len(messages)>0:
            datos = {"messages":messages}
        return JsonResponse(datos)

    def post (self,request):
        
        datos = {"messages":"sucess"}
        return JsonResponse(datos)

    def delete(self,request,id):
        messages =  list(Message.objects.all())
        if len(messages)>0:
            Message.objects.filter(id=id).delete
        else:
            datos= {'message':'Mensaje no encontrado'}
