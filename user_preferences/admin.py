from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from user_preferences.models import Profile, Avatar
from utils.admin_utils import RawIdAdminModel


class ProfileInline(admin.TabularInline):
    model = Profile
    can_delete = False


class AvatarInline(admin.TabularInline):
    model = Avatar
    can_delete = False


class CustomUserAdmin(UserAdmin, RawIdAdminModel):
    inlines = (ProfileInline, AvatarInline,)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
