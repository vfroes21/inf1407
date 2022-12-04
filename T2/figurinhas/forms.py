from django import forms
from figurinhas.models import Figurinha

class FigurinhaModel2Form(forms.ModelForm):
    class Meta:
        model = Figurinha
        fields = '__all__'
