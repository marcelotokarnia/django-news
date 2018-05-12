from django.db import models
from utils.date_utils import date2milis


class BaseModel(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def to_dict_json(self, detailed=False, deep_detailed=False):
        object_dicj = {}
        for field in self.__class__._meta.concrete_fields:
            if isinstance(field, models.ForeignKey):
                if detailed:
                    val = getattr(self, field.name)
                    object_dicj[field.name] = val.to_dict_json(deep_detailed, deep_detailed) if val else None
                else:
                    propname = field.name + '_id'
                    val = getattr(self, propname)
                    object_dicj[propname] = val
            else:
                val = getattr(self, field.name)
                if val is None:
                    object_dicj[field.name] = None
                    continue
                if isinstance(field, models.DateTimeField):
                    object_dicj[field.name] = date2milis(val) if val else None
                elif isinstance(field, models.DateField):
                    object_dicj[field.name] = val.strftime('%m/%d/%Y') if val else None
                elif isinstance(field, models.ImageField):
                    object_dicj[field.name] = str(val) if val else None
                else:
                    object_dicj[field.name] = val
        return object_dicj
