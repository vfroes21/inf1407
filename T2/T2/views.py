from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

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