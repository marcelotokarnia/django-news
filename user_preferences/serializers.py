from user_preferences.models import Category
from utils.serializer_utils import BaseSerializer


class CategoriesSerializer(BaseSerializer):
    class Meta:
        model = Category
        fields = '__all__'
