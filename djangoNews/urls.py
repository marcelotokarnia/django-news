from django.contrib import admin
from rest_framework import routers
from django.urls import path
from news.views import index, NewsViewSet
from user_preferences.views import (
    CategoriesViewSet,
    WhoAmI, login_view,
    logout_view, UserCategories)
from django.conf.urls import url, include
from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/logo.png', permanent=True)


router = routers.DefaultRouter()
router.register(r'news', NewsViewSet, base_name='news')
router.register(r'categories', CategoriesViewSet, base_name='categories')

urlpatterns = [
    url(r'^favicon\.ico$', favicon_view),
    path('admin/', admin.site.urls),
    url(r'^api/whoami', WhoAmI.as_view(), name="whoami"),
    url(r'^api/user_categories', UserCategories.as_view(), name="user_categories"),
    url(r'^api/logout', logout_view, name="logout"),
    url(r'^api/login', login_view, name="login"),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'', index, name="index"),
]
