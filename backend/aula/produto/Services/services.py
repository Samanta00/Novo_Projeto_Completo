from django.http import HttpResponseRedirect
from ..models import Produto
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import logging
logger = logging.getLogger(__name__)



@csrf_exempt
class ProductsService:
    @staticmethod
    def listarProduto(request):
        produtos = Produto.objects.all().values()
        return JsonResponse(list(produtos),safe=False) 
    # vai retornar uma lista de array

    
    @staticmethod
    def obterProduto(request,product_id):
        filtro = Produto.objects.filter(id=product_id).values().first()
        return JsonResponse(filtro)
    # vai retornar apenas um objeto
    
    @staticmethod
    def cadastrarProduto(request):
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                produto = Produto.objects.create(
                    nome=data.get('nome'),
                    preco=data.get('preco'),
                    quantidade=data.get('quantidade'),
                    categoria_id=data.get('categoria', 1),
                    estoque_minimo=data.get('estoque_minimo'),
                    estoque_maximo=data.get('estoque_maximo'),
                )
                logger.info(f"Requisição recebida: {request.body}")
                return JsonResponse({"message": "Produto cadastrado com sucesso", "product_id": produto.id})
            except Exception as e:
                return JsonResponse({"error": str(e)})
            

    @staticmethod
    def editandoProduto(request, product_id):
        if request.method == 'PUT':
            try:
                # Decodifica os dados do corpo da requisição
                data = json.loads(request.body)

                # Busca o produto pelo ID
                produto = get_object_or_404(Produto, id=product_id)

                # Atualiza os campos do produto
                produto.nome = data.get('name', produto.nome)  # Atualize para corresponder à chave JSON
                produto.preco = data.get('price', produto.preco)  # Atualize para corresponder à chave JSON
                produto.quantidade = data.get('quantity', produto.quantidade)
                produto.estoque_minimo = data.get('estoque_minimo', produto.estoque_minimo)
                produto.estoque_maximo = data.get('estoque_maximo', produto.estoque_maximo)

                produto.save()

                # Retorna uma resposta de sucesso
                return JsonResponse({"message": "Produto atualizado com sucesso"}, status=200)
            except Produto.DoesNotExist:
                # Caso o produto não seja encontrado
                return JsonResponse({"error": "Produto não encontrado"}, status=404)
            except json.JSONDecodeError:
                # Caso o JSON esteja malformado
                return JsonResponse({"error": "Dados inválidos"}, status=400)
            except Exception as e:
                # Para outros erros
                return JsonResponse({"error": str(e)}, status=500)

        return JsonResponse({"error": "Método não permitido"}, status=405)


            
    @staticmethod
    def deletarProduto(request, product_id):
        if request.method == 'DELETE':
            try:

                produto = get_object_or_404(Produto, id=product_id)
                produto.delete()
                return JsonResponse({'message':"Produto deletado com sucesso"})
            except Produto.DoesNotExist:
                return JsonResponse({'error': "Produto Não encontrado"})
            except Exception as e:
                return JsonResponse({'error': str(e)})

    