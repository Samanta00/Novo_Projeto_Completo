from django.db import models

# Create your models here.
class Product(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()
    data_cadastro = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, default=1)
    estoque_minimo = models.PositiveIntegerField()
    estoque_maximo = models.PositiveIntegerField()
    disponivel = models.BooleanField(default=True)
    em_promoção = models.BooleanField(default=False)
    desconto = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return self.nome
    

class Categoria(models.Model):
    nome = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nome
