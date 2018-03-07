from django.db import models
from utils.model_utils import BaseModel
from user_preferences.models import Profile, CATEGORIES


class Picture(BaseModel):
    small = models.ImageField()
    big = models.ImageField()


class News(BaseModel):
    title = models.CharField(max_length=1024)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField()
    category = models.CharField(max_length=128, choices=((cat,) * 2 for cat in CATEGORIES))
    thumbnail = models.OneToOneField(Picture, on_delete=models.CASCADE, null=True, blank=True)
