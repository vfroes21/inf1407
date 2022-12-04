from django.shortcuts import render, get_object_or_404
from figurinhas.models import Figurinha
from django.views.generic.base import View
from figurinhas.forms import FigurinhaModel2Form
from django.http.response import HttpResponseRedirect
from django.urls.base import reverse_lazy

# Create your views here.
class FigurinhaListView(View):
    def get(self, request, *args, **kwargs):
        figurinhas = Figurinha.objects.filter(user=request.user)
        context = {'figurinhas': figurinhas,}

        return render(request, 'figurinhas/listaFigurinhas.html', context)

class FigurinhaCreateView(View):
    def get(self, request, *args, **kwargs):
        context = {'formulario': FigurinhaModel2Form,}
        
        return render(request, 'figurinhas/criaFigurinha.html', context)

    def post(self, request, *args, **kwargs):
        formulario = FigurinhaModel2Form(request.POST)
        
        if formulario.is_valid():
            figurinha = formulario.save()
            figurinha.save()

            return HttpResponseRedirect(reverse_lazy('figurinhas:sec-figurinhas-perfil'))

    def form_valid(self, form):
        form.instance.profile = Figurinha.objects.get(user=self.request.user)

        return super().form_valid(form)

class FigurinhaUpdateView(View):
    def get(self, request, pk, *args, **kwargs):
        figurinha = Figurinha.objects.get(pk=pk)
        formulario = FigurinhaModel2Form(instance=figurinha)
        context = {'figurinha': formulario}

        return render(request, 'figurinhas/atualizaFigurinha.html', context)

    def post(self, request, pk, *args, **kwargs):
        figurinha = get_object_or_404(Figurinha, pk=pk)
        formulario = FigurinhaModel2Form(request.POST, instance=figurinha)

        if formulario.is_valid():
            figurinha = formulario.save()
            figurinha.save()

            return HttpResponseRedirect(reverse_lazy("figurinhas:sec-figurinhas-perfil"))
        
        else:
            contexto = {'figurinha': formulario}
            return render(request, 'figurinhas/atualizaFigurinha.html', contexto)

class FigurinhaDeleteView(View):
    def get(self, request, pk, *args, **kwargs):
        figurinha = Figurinha.objects.get(pk=pk)
        contexto = {'figurinha': figurinha}
        
        return render(request, 'figurinhas/apagaFigurinha.html', contexto)

    def post(self, request, pk, *args, **kwargs):
        figurinha = Figurinha.objects.get(pk=pk)
        figurinha.delete()

        return HttpResponseRedirect(reverse_lazy("figurinhas:sec-figurinhas-perfil"))