from django.shortcuts import render
from rest_framework import viewsets
from news.models import News
from news.serializers import NewsSerializer


def index(request):
    return render(request, 'index.html')


class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous or len(user.profile.preferences) == 0:
            return News.objects.all().order_by('-thumbnail', '-create_time')
        else:
            return News.objects.filter(category__in=user.profile.preferences).order_by('-create_time')
