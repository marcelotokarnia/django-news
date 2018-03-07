from django.db import models
from utils.model_utils import BaseModel
from user_preferences.models import Profile, Category


class Picture(BaseModel):
    small = models.ImageField()
    big = models.ImageField()


class News(BaseModel):
    title = models.CharField(max_length=1024)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField()
    category = models.ForeignKey(Category, related_name="news", on_delete=models.CASCADE)
    thumbnail = models.OneToOneField(Picture, on_delete=models.CASCADE, null=True, blank=True)
