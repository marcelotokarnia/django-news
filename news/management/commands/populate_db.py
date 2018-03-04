# coding: utf-8
from django.core.management.base import BaseCommand
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from django.contrib.auth.models import User
from django.conf import settings

import urllib.request
from optparse import make_option

from news.models import News
from user_preferences.models import Avatar


def create_news():
    pass


def create_users():
    User.objects.update_or_create(username="creedbratton", defaults={
        "password": "creedbrattonpass",
        "first_name": "Creed",
        "last_name": "Bratton",
        "is_active": True,
        "is_staff": False,
        "is_superuser": False,
    })
    User.objects.update_or_create(username="alexandrehenrique", defaults={
        "password": "shaileshzetajones",
        "first_name": "Alexandre Henrique Shailesh",
        "last_name": "Zeta-Jones",
        "is_active": True,
        "is_staff": False,
        "is_superuser": False,
    })
    for username in ["creedbratton", "alexandrehenrique"]:
        usr = User.objects.get(username=username)
        avatar = Avatar.objects.filter(profile__user__username=username).first()
        if avatar is None:
            avatar = Avatar()

        big_temp = NamedTemporaryFile(delete=True)
        big_temp.write(urllib.request.urlopen(settings.STATIC_URL + "assets/creed-bratton-45.png").read())
        big_temp.flush()
        small_temp = NamedTemporaryFile(delete=True)
        small_temp.write(urllib.request.urlopen(settings.STATIC_URL + "assets/creed-bratton-32.png").read())
        small_temp.flush()

        avatar.big.save("creedbratton-45.png", File(big_temp), save=False)
        avatar.small.save("creedbratton-32.png", File(small_temp), save=True)
        usr.profile.avatar = avatar
        usr.profile.avatar.save()
        usr.profile.save()
        usr.save()


class Command(BaseCommand):
    help = "Populate your DB with application data"

    def handle(self, *args, **options):
        create_users()
        create_news()
