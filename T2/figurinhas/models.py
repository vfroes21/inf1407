from django.db import models
from django.conf import settings

# Create your models here.
class Figurinha(models.Model):
    JOGADOR = 'JG'
    ESPECIAL = 'ES'
    BRILHANTE = 'BR'
    ESCOLHAS = [
        (JOGADOR, 'Jogador'),
        (ESPECIAL, 'Especial'),
        (BRILHANTE, 'Brilhante'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    tipo = models.CharField(max_length=100, choices=ESCOLHAS, default=JOGADOR, help_text='Informe o tipo da figurinha.')
    nome = models.CharField(max_length=100, help_text='Informe o nome.')
    codigo = models.CharField(max_length=100, help_text='Informe o código correspondente à figurinha. Ex: BRA5')
    pais = models.CharField(max_length=100, help_text='Informe o país.')
    quantidade = models.IntegerField(help_text='Informe quantas figurinhas você dispõe.')

    def __str__(self):
        return self.codigo