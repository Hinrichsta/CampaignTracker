from rest_framework import serializers
from django.contrib.auth.models import User
from CampaignAPI.models import CampaignCore,CampaignUsers,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems,CalendarCore,CalMonth,CalEvent
from django.core.exceptions import ValidationError



class CampaignCore_Serial(serializers.ModelSerializer):
    class Meta:
        model = CampaignCore
        fields = ['id','campaign_name','description','public']

class CampaignUsers_Serial(serializers.ModelSerializer):
    class Meta:
        model = CampaignUsers
        fields = ['campaign','user','role']
    
    def validate_role(self, data):
        if not CampaignUsers.objects.get(user=self.context['request'].user, role='S'):
            campaign_req = data['campaign']
            role_req = data['role']
            user_req = data['user']
            requesting_user = CampaignUsers.objects.get(user=self.context['request'].user, campaign=campaign_req)
            edit_user = CampaignUsers.objects.get(user=user_req, campaign=campaign_req)
            roles = {
                'V': 1,
                'P': 2,
                'A': 3,
                'O': 4,
                'S': 5
            }
        
            if campaign_req != requesting_user.campaign:
                raise ValidationError("You must be in the same campaign to modify roles.")
            
            if role_req == 'O' & CampaignUsers.objects.filter(campaign=campaign_req, role='O').exists():
                raise ValidationError("There can only be one Owner per campaign.")
            
            if roles[role_req] <= roles[requesting_user.role]:
                raise ValidationError("You cannot assign a higher role than your own role.")
            
            if roles[requesting_user.role] < roles[edit_user.role]:
                raise ValidationError("You must have a higher role to modify this user's role.")
        
        return data

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