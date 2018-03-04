from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from utils.model_utils import BaseModel


class Avatar(BaseModel):
    small = models.ImageField()
    big = models.ImageField()


class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.OneToOneField(Avatar, on_delete=models.CASCADE, related_name="profile", null=True, blank=True)


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
        "username": self.username
    }


User.add_to_class("to_dict_json", to_dict_json)