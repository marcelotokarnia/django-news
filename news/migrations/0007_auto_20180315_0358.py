# Generated by Django 2.0.2 on 2018-03-15 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0006_auto_20180308_0342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='big',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='picture',
            name='small',
            field=models.CharField(max_length=32),
        ),
    ]
