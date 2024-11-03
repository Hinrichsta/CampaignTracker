# Generated by Django 5.1.1 on 2024-11-03 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CampaignAPI', '0003_campaign_consumitems_campaign_hirelings_campaign_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='partymember',
            old_name='name',
            new_name='characterName',
        ),
        migrations.RenameField(
            model_name='partymember',
            old_name='race',
            new_name='species',
        ),
        migrations.RemoveField(
            model_name='partymember',
            name='role',
        ),
        migrations.AddField(
            model_name='partymember',
            name='class_name',
            field=models.CharField(db_column='class', default='Fighter', max_length=255, verbose_name='class'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='partymember',
            name='joinDate',
            field=models.DateField(default='1-1-1'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='partymember',
            name='leaveDate',
            field=models.DateField(blank=True, default='1-1-1'),
            preserve_default=False,
        ),
    ]
