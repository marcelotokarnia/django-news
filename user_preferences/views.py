from rest_framework import viewsets
from user_preferences.models import Category
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from user_preferences.serializers import CategoriesSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_exempt


class CategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer

    def get_queryset(self):
        return Category.objects.all().order_by('name')


class WhoAmI(APIView):
    queryset = User.objects.all()

    def get(self, request):
        if request.user.is_anonymous:
            return JsonResponse({})
        else:
            return JsonResponse(request.user.profile.to_dict_json(True, True))


class UserCategories(APIView):
    queryset = User.objects.all()

    def post(self, request):
        preferences = request.data
        request.user.profile.categories.clear()
        for p in preferences:
            request.user.profile.categories.add(Category.objects.get(pk=p))
        return HttpResponse(status=204)

@csrf_exempt
def login_view(request):
    username = request.POST.get('username')

    user = User.objects.filter(username=username).first()
    if user:
        login(request, user)
        return redirect('/news')
    else:
        return redirect('/login?invalid=%s' % username)

@csrf_exempt
def logout_view(request):
    logout(request)
    return redirect('/news')
