# Generated by Django 5.1.1 on 2024-12-05 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CampaignAPI', '0005_campaigncore_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaigncore',
            name='public',
            field=models.BooleanField(default=False),
        ),
    ]