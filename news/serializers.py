from news.models import News
from utils.serializer_utils import BaseSerializer


class NewsSerializer(BaseSerializer):
    def to_representation(self, obj):
        dicj = obj.to_dict_json(True, True)
        dicj['thumbnail'] = obj.thumbnail.to_dict_json() if hasattr(obj, 'thumbnail') else None
        return dicj

    class Meta:
        model = News
        fields = '__all__'
