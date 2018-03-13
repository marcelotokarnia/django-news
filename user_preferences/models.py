from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from utils.model_utils import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=32, primary_key=True)
    color = models.CharField(max_length=8)


class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    categories = models.ManyToManyField(Category, related_name="profiles")

    @property
    def preferences(self):
        return self.categories.values_list('name', flat=True)

    def to_dict_json(self, detailed=False, deep_detailed=False):
        dictj = super(Profile, self).to_dict_json(detailed, deep_detailed)
        dictj['categories'] = [cat for cat in self.categories.values_list('name', flat=True)]
        return dictj


class Avatar(BaseModel):
    small = models.ImageField()
    big = models.ImageField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="avatar", null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


def to_dict_json(self, detailed=False, deep_detailed=False):
    return {
        "id": self.id,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "email": self.email,
        "username": self.username,
        "avatar": self.avatar.to_dict_json() if hasattr(self, 'avatar') else None
    }


User.add_to_class("to_dict_json", to_dict_json)
