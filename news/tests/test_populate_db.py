from django.test import TestCase

from django.core import management
from news.models import News
from user_preferences.models import Profile
from django.contrib.auth.models import User


class PopulateDBTest(TestCase):
    def test_populate_db(self):
        # Assert initial state
        self.assertEquals(News.objects.count(), 0)
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(Profile.objects.count(), 0)
        management.call_command('populate_db')
        self.assertSetEqual({"Obama Offers Hopeful Vision While Noting Nation's Fears",
                             "Didi Kuaidi, The Company Beating Uber In China, Opens Its API To Third Party Apps",
                             "NASA Formalizes Efforts To Protect Earth From Asteroids",
                             "For Some Atlanta Hawks, a Revved-Up Game of Uno Is Diversion No. 1",
                             "Picking a Windows 10 Security Package",
                             "As U.S. Modernizes Nuclear Weapons, ‘Smaller’ Leaves Some Uneasy"},
                            set(News.objects.values_list("title", flat=True)))
        self.assertSetEqual({"creedbratton", "alexandrehenrique"},
                            set(User.objects.values_list("username", flat=True)))
        self.assertEquals(Profile.objects.count(), 2)
