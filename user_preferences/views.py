from rest_framework import viewsets
from user_preferences.models import Category
from user_preferences.serializers import CategoriesSerializer


class CategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer

    def get_queryset(self):
        return Category.objects.all().order_by('name')
