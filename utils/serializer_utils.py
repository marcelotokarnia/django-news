from rest_framework import serializers


class BaseSerializer(serializers.HyperlinkedModelSerializer):
    def to_representation(self, obj):
        return obj.to_dict_json(True, True)
