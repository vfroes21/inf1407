# Generated by Django 4.1.2 on 2022-12-03 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('figurinhas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='figurinha',
            name='tipo',
            field=models.CharField(choices=[('JG', 'Jogador'), ('ES', 'Especial'), ('BR', 'Brilhante')], default='JG', help_text='Informe o tipo da figurinha.', max_length=100),
        ),
    ]
