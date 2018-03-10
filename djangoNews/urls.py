from django.contrib import admin
from rest_framework import routers
from django.urls import path
from news.views import index, NewsViewSet
from user_preferences.views import CategoriesViewSet
from django.conf import settings
from django.views.static import serve

from django.conf.urls import url, include


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'news', NewsViewSet, base_name='news')
router.register(r'categories', CategoriesViewSet, base_name='categories')

urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
    path('admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'', index, name="index"),
]
