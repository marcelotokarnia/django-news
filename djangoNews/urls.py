from django.contrib import admin
from rest_framework import routers
from django.urls import path
from news.views import index, NewsViewSet

from django.conf.urls import url, include


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'news', NewsViewSet, base_name='news')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('index', index, name="index"),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
