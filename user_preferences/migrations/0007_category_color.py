# Generated by Django 2.0.2 on 2018-03-12 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_preferences', '0006_auto_20180308_0353'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='', max_length=8),
            preserve_default=False,
        ),
    ]
