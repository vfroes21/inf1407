from django.urls.conf import path
from figurinhas import views

app_name = 'figurinhas'

urlpatterns = [
    path('perfil/', views.FigurinhaListView.as_view(), name='sec-figurinhas-perfil'),
    path('perfil/nova-figurinha/', views.FigurinhaCreateView.as_view(), name='sec-figurinhas-nova'),
    path('perfil/atualiza-figurinha/<int:pk>/', views.FigurinhaUpdateView.as_view(), name='sec-figurinhas-atualiza'),
    path('perfil/apaga-figurinha/<int:pk>/', views.FigurinhaDeleteView.as_view(), name='sec-figurinhas-apaga'),
]