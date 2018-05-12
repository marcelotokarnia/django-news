from django.http import JsonResponse
from news.models import News


def get_news(request):
    return JsonResponse([n.to_dict_json(True, True) for n in News.objects.all()], safe=False)
