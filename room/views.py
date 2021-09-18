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
        jd= json.loads(request.body)
        datos = {"messages":"sucess"}
        #Message.objects.create(message = jd['message', sender=jd['sender']])
        return JsonResponse(datos)