from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Message

def room(request):
    messages =  Message.objects.all()
    context = {'users': User.objects.exclude(username=request.user.username), "messages":messages}
    
    return render(request , 'room/room.html', context)
