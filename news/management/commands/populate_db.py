# coding: utf-8
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from news.models import News, Picture, Category
from user_preferences.models import Avatar


descriptions = [("In his last State of the Union address, President Obama sought to paint a "
                 "hopeful portrait. But he acknowledged that many Americans felt shut out of "
                 "a political and economic system they view as rigged."),
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


def populate_avatars(user, big, small):
    Avatar.objects.get_or_create(user=user, defaults={'big': big, 'small': small})


def populate_pictures(news, big, small):
    Picture.objects.get_or_create(news=news, defaults={'big': big, 'small': small})


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
        "big_image": "news_03@2x.jpg",
        "small_image": "news_03.jpg",
    }, {
        "title": "Picking a Windows 10 Security Package",
        "author": creed,
        "text": descriptions[4],
        "category": Category.objects.get(name="TECH"),
        "big_image": "news_03@2x.jpg",
        "small_image": "news_03.jpg",
    }, {
        "title": "As U.S. Modernizes Nuclear Weapons, ‘Smaller’ Leaves Some Uneasy",
        "author": creed,
        "text": descriptions[5],
        "category": Category.objects.get(name="SCIENCE"),
        "big_image": "news_03@2x.jpg",
        "small_image": "news_03.jpg",
    }]


def create_or_update_news():
    data = get_news_data()
    data.reverse()
    for news in data:
        News.objects.update_or_create(title=news["title"],
                                      defaults={
                                          "author": news["author"],
                                          "text": news["text"],
                                          "category": news["category"],
                                      })
    for news in data:
        if news.get("big_image") and news.get("small_image"):
            n = News.objects.get(title=news["title"])
            populate_pictures(n, news["big_image"], news["small_image"])


def create_or_update_users():
    create_or_update_user_info()
    for username in ["creedbratton", "alexandrehenrique"]:
        usr = User.objects.get(username=username)
        populate_avatars(usr, "creed-bratton-45.png", "creed-bratton-32.png")


def create_or_update_categories():
    for category, color in {
      "POLITICS": "#D0021B",
      "TECH": "#4A90E2",
      "SCIENCE": "#7CBB37",
      "SPORTS": "#F5A623",
      "BUSINESS": "#BD10E0"}.items():
        Category.objects.update_or_create(name=category, defaults={"color": color})


class Command(BaseCommand):
    help = "Populate your DB with application data"

    def handle(self, *args, **options):
        create_or_update_categories()
        create_or_update_users()
        create_or_update_news()
