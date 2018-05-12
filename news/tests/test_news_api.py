import json

from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from news.views import NewsViewSet

from rest_framework import test
from django.contrib.auth.models import User


def filter_response(news, user):
    return list(filter(
        lambda news: news['category']['name'] in user.profile.preferences,
        news))


class ListNewsAPIEndpoint(test.APITestCase):
    fixtures = ["populate_db.json"]

    def setUp(self):
        factory = APIRequestFactory()
        self.view = NewsViewSet.as_view({"get": "list"})
        self.request = factory.get('/news')

    def list_news(self, username=None):
        if username:
            user = User.objects.get(username=username)
            force_authenticate(self.request, user=user)
        response = self.view(self.request)
        response.render()
        return response

    def test_annonymous_user_list_news(self):
        response = self.list_news()

        news = json.loads(response.content)
        self.assertEquals(len(news), 6)

    def test_logged_user_creed(self):
        response = self.list_news('creedbratton')
        user = user = User.objects.get(username='creedbratton')

        news = json.loads(response.content)
        self.assertEquals(len(news), 4)

        filtered_response = filter_response(news, user)
        self.assertEquals(len(filtered_response), 4)

    def test_logged_user_alexandre(self):
        response = self.list_news('alexandrehenrique')
        user = User.objects.get(username='alexandrehenrique')

        news = json.loads(response.content)
        self.assertEquals(len(news), 1)

        filtered_response = filter_response(news, user)
        self.assertEquals(len(filtered_response), 1)

    def test_logged_user_without_category_preferences(self):
        response = self.list_news('nopreferences')

        news = json.loads(response.content)
        self.assertEquals(len(news), 6)
