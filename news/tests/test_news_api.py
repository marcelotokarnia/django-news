import json

from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from news.views import NewsViewSet

from rest_framework import test
from django.contrib.auth.models import User


class ListNewsAPIEndpoint(test.APITestCase):
    fixtures = ["populate_db.json"]

    def setUp(self):
        factory = APIRequestFactory()
        self.view = NewsViewSet.as_view({"get": "list"})
        self.request = factory.get('/news')

    def test_annonymous_user_list_news(self):
        response = self.view(self.request)
        response.render()

        news = json.loads(response.content)
        self.assertEquals(len(news), 6)

    def test_logged_user_with_preferences(self):
        user = User.objects.get(username='creedbratton')
        force_authenticate(self.request, user=user)
        response = self.view(self.request)
        response.render()

        news = json.loads(response.content)
        self.assertEquals(len(news), 4)
