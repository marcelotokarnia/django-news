from django.contrib import admin
from news.models import News
from utils.admin_utils import RawIdAdminModel


admin.site.register(News, RawIdAdminModel)
