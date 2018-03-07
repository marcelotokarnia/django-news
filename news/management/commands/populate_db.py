# coding: utf-8
from django.core.management.base import BaseCommand
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from django.contrib.auth.models import User
from django.conf import settings

import urllib.request

from news.models import News, Picture, Category
from user_preferences.models import Avatar


descriptions = [("Lorem ipsum dolor sit amet, consectetur adipiscing elit, "
                 "sed do eiusmod tempor incididunt ut labore et dolore magna "
                 "aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
                 "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis "
                 "aute irure dolor in reprehenderit in voluptate velit esse cillum"
                 " dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"
                 " proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                ("One day after Uber updated its API to add ‘content experiences’ "
                 "for passengers, the U.S. company’s biggest rival — Didi Kuaidi in China — "
                 "has opened its own platform up by releasing an SDK for developers and third-parties."),
                ("Last week, NASA announced a new program called the Planetary "
                 "Defense Coordination Office (PDCO) which will coordinate NASA’s efforts for "
                 "detecting and tracking near-Earth objects (NEOs). If a large object comes "
                 "hurtling toward our planet… "),
                ("The favored in-flight pastime of a group of players including Al "
                 "Horford, Kent Bazemore and Dennis Schroder is a schoolchildren’s card game with "
                 "some added twists."),
                ("Oscar the Grouch has a recycling bin and Big Bird has moved to a "
                 "tree as the children’s classic debuts on HBO, aiming at a generation that doesn’t"
                 " distinguish between TV and mobile screens."),
                ("The Energy Department and the Pentagon have been readying a weapon with a "
                 "build-it-smaller approach, setting off a philosophical clash in the world of "
                 "nuclear arms.")]


def create_or_update_user_info():
    User.objects.update_or_create(username="creedbratton", defaults={
        "password": "creedbrattonpass",
        "email": "creed@bratton.com",
        "first_name": "Creed",
        "last_name": "Bratton",
        "is_active": True,
        "is_staff": False,
        "is_superuser": False,
    })
    User.objects.update_or_create(username="alexandrehenrique", defaults={
        "password": "shaileshzetajones",
        "first_name": "Alexandre Henrique Shailesh",
        "email": "alexandre@shailesh.com",
        "last_name": "Zeta-Jones",
        "is_active": True,
        "is_staff": False,
        "is_superuser": False,
    })


def populate_images(entity, big, small):
    big_temp = NamedTemporaryFile(delete=True)
    big_temp.write(urllib.request.urlopen(settings.STATIC_URL + "assets/%s" % big).read())
    big_temp.flush()
    small_temp = NamedTemporaryFile(delete=True)
    small_temp.write(urllib.request.urlopen(settings.STATIC_URL + "assets/%s" % small).read())
    small_temp.flush()

    entity.big.save(big, File(big_temp), save=False)
    entity.small.save(small, File(small_temp), save=True)
    return entity


def get_news_data():
    creed = User.objects.get(username="creedbratton").profile
    alexandre = User.objects.get(username="alexandrehenrique").profile
    return [{
        "title": "Obama Offers Hopeful Vision While Noting Nation's Fears",
        "author": creed,
        "text": descriptions[0],
        "category": Category.objects.get(name="POLITICS"),
        "big_image": "news_01@2x.png",
        "small_image": "news_01.jpg",
    }, {
        "title": "Didi Kuaidi, The Company Beating Uber In China, Opens Its API To Third Party Apps",
        "author": creed,
        "text": descriptions[1],
        "category": Category.objects.get(name="TECH"),
        "big_image": "news_02@2x.jpg",
        "small_image": "news_02.jpg",
    }, {
        "title": "NASA Formalizes Efforts To Protect Earth From Asteroids",
        "author": alexandre,
        "text": descriptions[2],
        "category": Category.objects.get(name="SCIENCE"),
        "big_image": "news_03@2x.jpg",
        "small_image": "news_03.jpg",
    }, {
        "title": "For Some Atlanta Hawks, a Revved-Up Game of Uno Is Diversion No. 1",
        "author": creed,
        "text": descriptions[3],
        "category": Category.objects.get(name="SPORTS"),
    }, {
        "title": "Picking a Windows 10 Security Package",
        "author": creed,
        "text": descriptions[4],
        "category": Category.objects.get(name="TECH"),
    }, {
        "title": "As U.S. Modernizes Nuclear Weapons, ‘Smaller’ Leaves Some Uneasy",
        "author": creed,
        "text": descriptions[5],
        "category": Category.objects.get(name="SCIENCE"),
    }]


def create_or_update_news():
    data = get_news_data()
    for news in data:
        News.objects.update_or_create(title=news["title"],
                                      defaults={
                                          "author": news["author"],
                                          "text": news["text"],
                                          "category": news["category"],
                                      })
    for news in data[:3]:
        entity = News.objects.get(title=news["title"])
        if entity.thumbnail is None:
            entity.thumbnail = Picture()

        entity.thumbnail = populate_images(entity.thumbnail, news["big_image"], news["small_image"])
        entity.save()


def create_or_update_users():
    create_or_update_user_info()
    for username in ["creedbratton", "alexandrehenrique"]:
        usr = User.objects.get(username=username)
        avatar = Avatar.objects.filter(profile__user__username=username).first()
        if avatar is None:
            avatar = Avatar()

        usr.profile.avatar = populate_images(avatar, "creed-bratton-45.png", "creed-bratton-32.png")
        usr.profile.save()
        usr.save()


def create_or_update_categories():
    for category in ["POLITICS", "TECH", "SCIENCE", "SPORTS", "BUSINESS"]:
        Category.objects.update_or_create(name=category)


class Command(BaseCommand):
    help = "Populate your DB with application data"

    def handle(self, *args, **options):
        create_or_update_categories()
        create_or_update_users()
        create_or_update_news()
