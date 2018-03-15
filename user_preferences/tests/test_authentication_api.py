import json

from rest_framework import test


class ListNewsAPIEndpoint(test.APITestCase):
    fixtures = ["populate_db.json"]

    def test_not_logged(self):
        response = self.client.get('/api/whoami')
        self.assertEquals(response.content, b'{}')

    def test_login_logout(self):
        USERNAME = 'creedbratton'
        self.client.post('/api/login', {'username': USERNAME, 'password': 'notimportant'})
        profile = json.loads(self.client.get('/api/whoami').content)
        self.assertEquals(profile['user']['username'], USERNAME)
        self.client.get('/api/logout')
        response = self.client.get('/api/whoami')
        self.assertEquals(response.content, b'{}')