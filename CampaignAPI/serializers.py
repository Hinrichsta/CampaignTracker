from rest_framework import serializers
from CampaignAPI.models import Campaign,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems

class Campaign_Serial(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ['campaignName',]

class Party_Serial(serializers.ModelSerializer):
    class Meta:
        model = PartyMember
        fields = ['id','characterName','player','class_name','species','notes','active','campaign']

class Receivable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Receivable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','payer','campaign']

class Payable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Payable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','payee','payer','campaign']

class Vehicles_Serial(serializers.ModelSerializer):
    class Meta:
        model = Vehicles
        fields = ['id','name','type','size','equipment','campaign']

class Hirelings_Serial(serializers.ModelSerializer):
    class Meta:
        model = Hirelings
        fields = ['id','name','race','stats','vehicle','equipment','campaign']

class MagicItems_Serial(serializers.ModelSerializer):
    class Meta:
        model = MagicItems
        fields = ['id','irl_date','ig_date','name','notes','rarity','status','creator','link','powner','vowner','howner','campaign']

class ConsumItems_Serial(serializers.ModelSerializer):
    class Meta:
        model = ConsumItems
        fields = ['id','name','notes','type','amount','link','campaign']