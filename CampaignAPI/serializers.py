from rest_framework import serializers
from django.contrib.auth.models import User
from CampaignAPI.models import CampaignCore,CampaignUsers,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems,CalendarCore,CalMonth,CalEvent



class CampaignCore_Serial(serializers.ModelSerializer):
    class Meta:
        model = CampaignCore
        fields = ['id','campaign_name','description']

class CampaignUsers_Serial(serializers.ModelSerializer):
    class Meta:
        model = CampaignUsers
        fields = ['campaign','user','role']

class Party_Serial(serializers.ModelSerializer):
    class Meta:
        model = PartyMember
        fields = ['id','character_name','player','class_name','species','notes','active','join_date','leave_date','campaign']

class Receivable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Receivable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payer','campaign']

class Payable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Payable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payee','payer','campaign']

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

class CalendarCore_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalendarCore
        fields = ['id','name','current_day','current_month','current_year','current_era','campaign']

class CalMonth_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalMonth
        fields = ['id','name','calendar','order_num','day_count','campaign']

class CalEvent_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalEvent
        fields = ['id','name','calendar','month','day','year','description','campaign']