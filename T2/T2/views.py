from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView
from django.contrib.auth.models import User
from django.http import JsonResponse

def home(request):
    return render(request, 'registro/home.html')

def registro(request):
    if request.method == 'POST':
        formulario = UserCreationForm(request.POST)
        if formulario.is_valid():
            formulario.save()
            return redirect('home')

    formulario = UserCreationForm()
    context = {'form': formulario}
        
    return render(request, 'registro/registro.html', context)

def profile(request):
    return render(request, 'registro/perfil.html')

class LoginView(CreateView):
    template_name = 'registro/login.html'
    form_class = UserCreationForm

def verificaUser(request):
    username = request.GET.get('username', None)
    resposta = { 'existe': User.objects.filter(username__iexact=username).exists()}

    return JsonResponse(resposta)
