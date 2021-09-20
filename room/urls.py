
from django.contrib import admin
from django.urls import path, include
from . import views
from .views import MessageViewSet
from rest_framework import routers
from django.contrib.auth.views import LoginView, LogoutView
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register('message', MessageViewSet)

urlpatterns = [
    path('/room', views.room , name='room'),
    path('api/', include(router.urls)),
    path('api/<str:idusu/<str:msg>', include(router.urls),name="apiGetMsg"),
    path('register/',views.register, name ='register'),
    path('',LoginView.as_view(template_name="room/login.html"), name ='login'),
    path('logout/',LogoutView.as_view(template_name="room/logout.html"), name ='logout'),
    path('mensages/',views.mensages, name ='mensages'),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
