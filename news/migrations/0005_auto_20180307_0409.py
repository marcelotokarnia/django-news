# Generated by Django 2.0.2 on 2018-03-07 04:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_preferences', '0003_auto_20180307_0409'),
        ('news', '0004_auto_20180304_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='news', to='user_preferences.Category'),
        ),
    ]