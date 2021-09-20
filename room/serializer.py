
from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User
#Serializador para la api
class MessageSerializer(serializers.ModelSerializer):


    class Meta:
        model = Message
        fields = ['message','timestamp','sender','image']

