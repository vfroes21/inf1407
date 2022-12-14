"""T2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from T2 import views
from django.contrib.auth.views import LoginView, LogoutView
from django.urls.base import reverse_lazy
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', LoginView.as_view(template_name='registro/home.html'), name='home'),
    path('accounts/registro/', views.registro, name='sec-registro'),
    path('accounts/login/', LoginView.as_view(template_name='registro/login.html'), name='sec-login'),
    path('accounts/figurinhas/', include('figurinhas.urls')),
    path('accounts/logout/', LogoutView.as_view(next_page=reverse_lazy('home')), name='sec-logout'),
    path('accounts/registro/verify-user/', views.verificaUser, name='sec-verify-user'),
]
