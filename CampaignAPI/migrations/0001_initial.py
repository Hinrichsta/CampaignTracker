# Generated by Django 5.1.1 on 2024-11-04 14:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('campaign_name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Campaigns',
            },
        ),
        migrations.CreateModel(
            name='ConsumItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('notes', models.TextField(blank=True)),
                ('type', models.CharField(choices=[('P', 'Potion'), ('S', 'Scroll'), ('A', 'Ammo,')], max_length=1)),
                ('amount', models.IntegerField()),
                ('link', models.URLField(blank=True)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
            ],
            options={
                'verbose_name_plural': 'Consumable Items',
            },
        ),
        migrations.CreateModel(
            name='Hirelings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('race', models.CharField(max_length=255)),
                ('stats', models.URLField()),
                ('equipment', models.TextField(blank=True)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
            ],
            options={
                'verbose_name_plural': 'Hirelings',
            },
        ),
        migrations.CreateModel(
            name='PartyMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character_name', models.CharField(max_length=255)),
                ('player', models.CharField(max_length=255)),
                ('class_name', models.CharField(max_length=255)),
                ('species', models.CharField(max_length=255)),
                ('notes', models.TextField(blank=True)),
                ('active', models.BooleanField()),
                ('join_date', models.DateField()),
                ('leave_date', models.DateField(blank=True, null=True)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
            ],
            options={
                'verbose_name_plural': 'Party Members',
            },
        ),
        migrations.CreateModel(
            name='Payable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('irl_date', models.DateField()),
                ('ig_date', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('pp', models.IntegerField(blank=True)),
                ('gp', models.IntegerField(blank=True)),
                ('sp', models.IntegerField(blank=True)),
                ('cp', models.IntegerField(blank=True)),
                ('party_trans', models.BooleanField()),
                ('payee', models.CharField(blank=True, max_length=255)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
                ('payer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.partymember')),
            ],
            options={
                'verbose_name_plural': 'Payables',
            },
        ),
        migrations.CreateModel(
            name='Receivable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('irl_date', models.DateField()),
                ('ig_date', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('pp', models.IntegerField(blank=True)),
                ('gp', models.IntegerField(blank=True)),
                ('sp', models.IntegerField(blank=True)),
                ('cp', models.IntegerField(blank=True)),
                ('party_trans', models.BooleanField()),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
                ('payer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.partymember')),
            ],
            options={
                'verbose_name_plural': 'Receivables',
            },
        ),
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('type', models.CharField(max_length=255)),
                ('size', models.TextField()),
                ('equipment', models.TextField(blank=True)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
            ],
            options={
                'verbose_name_plural': 'Vehicles',
            },
        ),
        migrations.CreateModel(
            name='MagicItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('irl_date', models.DateField()),
                ('ig_date', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('notes', models.TextField(blank=True)),
                ('rarity', models.CharField(choices=[('C', 'Common'), ('U', 'Uncommon'), ('R', 'Rare'), ('V', 'Very Rare'), ('L', 'Legendary'), ('A', 'Artifact')], max_length=1)),
                ('status', models.CharField(choices=[('A', 'Active'), ('B', 'Stored'), ('D', 'Destroyed'), ('S', 'Sold'), ('L', 'Lost'), ('T', 'Stolen'), ('U', 'Used')], max_length=1)),
                ('creator', models.CharField(choices=[('O', 'Official'), ('H', 'Homebrew')], max_length=1)),
                ('link', models.URLField(blank=True)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.campaign')),
                ('howner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.hirelings')),
                ('powner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.partymember')),
                ('vowner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.vehicles')),
            ],
            options={
                'verbose_name_plural': 'Magic Items',
            },
        ),
        migrations.AddField(
            model_name='hirelings',
            name='vehicle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='CampaignAPI.vehicles'),
        ),
    ]
