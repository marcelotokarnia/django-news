from django.contrib import admin
from news.models import News, Picture
from utils.admin_utils import RawIdAdminModel


class PictureInline(admin.TabularInline):
    model = Picture
    can_delete = False


class CustomNewsAdmin(RawIdAdminModel):
    inlines = (PictureInline, )


admin.site.register(News, CustomNewsAdmin)
