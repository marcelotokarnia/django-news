from django.shortcuts import render
from rest_framework import viewsets
from news.models import News
from news.serializers import NewsSerializer


def index(request):
    return render(request, 'index.html')


class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return News.objects.filter(category__in=["TECH", "SCIENCE"]).order_by('-create_time')
