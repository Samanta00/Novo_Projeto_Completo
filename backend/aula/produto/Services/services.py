from django.http import HttpResponseRedirect
from ..models import Produto
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import logging
logger = logging.getLogger(__name__)
from django.shortcuts import redirect




@csrf_exempt
class ProductsService:
    logger = logging.getLogger(__name__)

    @staticmethod
    def oauth(request):
        """
        Redireciona o usuário para o fluxo de autenticação do GitHub OAuth.

        :param request: Objeto HTTP da requisição.
        :return: Redirecionamento para a URL de autorização do GitHub.
        """
        try:
            client_id = 'Ov23liOf1bbtKsM0NXew'
            redirect_uri = 'http://localhost:8001/accounts/github/login/callback/'
            scope = 'read:user'

            # Monta a URL de autorização do GitHub
            auth_url = (
                f'https://github.com/login/oauth/authorize'
                f'?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}'
            )

            return HttpResponseRedirect(auth_url)
        except Exception as e:
            # Registra o erro e retorna uma mensagem de erro ao cliente
            ProductsService.logger.error(f"Erro no fluxo OAuth: {e}")
            return JsonResponse({"error": "Erro ao processar o fluxo OAuth"}, status=500)
        
    def login_view(request):
        # Se a autenticação for bem-sucedida
        return redirect('http://localhost:3000/members/')

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

    