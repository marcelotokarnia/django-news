from rest_framework import viewsets
from user_preferences.models import Category
from django.http import JsonResponse
from django.shortcuts import redirect
from user_preferences.serializers import CategoriesSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import login, logout


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


def login_view(request):
    username = request.POST.get('username')

    user = User.objects.get(username=username)
    login(request, user)
    return redirect('/news')


def logout_view(request):
    logout(request)
    return redirect('/news')
