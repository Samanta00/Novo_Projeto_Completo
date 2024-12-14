from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.http import JsonResponse

# from .services import ProductsService
from .Services.services import ProductsService

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class ProdutoView(View):
    def get(self, request, product_id=None):
        if product_id:
            return ProductsService.obterProduto(product_id)
        return ProductsService.listarProduto()
    
    def post(self, request):
        return ProductsService.cadastrarProduto(request)
    
    def put(self, request):
        return ProductsService.editandoProduto(request)
    
    def delete(self, request, product_id):
        if not product_id:
            return JsonResponse({"error": "ID do produto é obrigatório"}, status=400)
        return ProductsService.deletarProduto(request, product_id)
