from news.models import News
from utils.serializer_utils import BaseSerializer


class NewsSerializer(BaseSerializer):
    class Meta:
        model = News
