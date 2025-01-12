from rest_framework import serializers
from django.contrib.auth.models import User
from CampaignAPI.models import CampaignCore,CampaignUsers,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems,CalendarCore,CalMonth,CalEvent
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserJoin_Serial(serializers.ModelSerializer):
    '''
    Used for creation of users in the system.

    Validates that the passwords are correct when submitted during signup and then runs through the Django Password checks

    It then creates the user and returns an access code for them to be logged in automatically.
    '''
    pass2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id','username','password','email', 'pass2']
        write_only_fields = ('password',)
        read_only_fields = ('id',)
    
    def validate(self, attrs):
        if attrs['password'] != attrs['pass2']:
            raise serializers.ValidationError({"password": "The passwords do not match"})
        try:
            validate_password(attrs['password'])
        except ValidationError as error:
            raise serializers.ValidationError(str(error))
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password']) # Needed or else you get the following error and users cannot login. error: Invalid password format or unknown hashing algorithm.
        user.save()

        token = RefreshToken.for_user(user)
        user = User_Serial(user)
        
        return {
            'user': user,
            'refresh_token': str(token),
            'access_token': str(token.access_token),
        }
    
class TokenObtainPair_Serial(TokenObtainPairSerializer):
    '''
    This is used for modifying what is returned, as the logged in user ID is needed.
    '''

    def validate(self, attrs):
        data = super().validate(attrs)

        data['id'] = self.user.id
        return data
    
class User_Serial(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']
        read_only_fields = ('id',)


class CampaignCore_Serial(serializers.ModelSerializer):
    class Meta:
        model = CampaignCore
        fields = ['id','campaign_name','description','public']
        read_only_fields = ('id',)

    def validate(self, attrs):
        """
        Add custom validation to ensure the user has the right permissions
        """
        user = self.context['request'].user
        campaign_id = self.context['request'].data.get('campaign_id')

        try:
            user_role = CampaignUsers.objects.get(user=user, campaign_id=campaign_id)
        except CampaignUsers.DoesNotExist:
            raise serializers.ValidationError("You do not have access to this campaign.")

        # Ensure user has appropriate role for action
        if not self.is_user_authorized_for_action(user_role.role):
            raise serializers.ValidationError("You do not have permission for this action.")
        
        return attrs
    
    def is_user_authorized_for_action(self, role):
        """
        Check if the user has a high enough role to perform the action
        """
        required_role = self.context['view'].get_required_role(self.context['view'])
        role_order = {'V': 0, 'P': 1, 'A': 2, 'O': 3, 'S': 4}
        
        return role_order[role] >= role_order[required_role]

class CampaignUsers_Serial(serializers.ModelSerializer):
    '''
    This is for individual roles within campaigns themselves.

    It validates that the person changing the role is in the same campaign and users of the same role cannot move someone down or a user cannot assign themselves a higher role.
    '''
    class Meta:
        model = CampaignUsers
        fields = ['campaign','user','role']
        read_only_fields = ('campaign','user','id',)
    
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
        read_only_fields = ('id',)

class Receivable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Receivable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payer','campaign']
        read_only_fields = ('id',)

class Payable_Serial(serializers.ModelSerializer):
    class Meta:
        model = Payable
        fields = ['id','irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payee','payer','campaign']
        read_only_fields = ('id',)

class Vehicles_Serial(serializers.ModelSerializer):
    class Meta:
        model = Vehicles
        fields = ['id','name','type','size','equipment','campaign']
        read_only_fields = ('id',)

class Hirelings_Serial(serializers.ModelSerializer):
    class Meta:
        model = Hirelings
        fields = ['id','name','race','stats','vehicle','equipment','campaign']
        read_only_fields = ('id',)

class MagicItems_Serial(serializers.ModelSerializer):
    class Meta:
        model = MagicItems
        fields = ['id','irl_date','ig_date','name','notes','rarity','status','creator','link','powner','vowner','howner','campaign']
        read_only_fields = ('id',)

class ConsumItems_Serial(serializers.ModelSerializer):
    class Meta:
        model = ConsumItems
        fields = ['id','name','notes','type','amount','link','campaign']
        read_only_fields = ('id',)

class CalendarCore_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalendarCore
        fields = ['id','name','current_day','current_month','current_year','current_era','campaign']
        read_only_fields = ('id',)

class CalMonth_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalMonth
        fields = ['id','name','calendar','order_num','day_count','campaign']
        read_only_fields = ('id',)

class CalEvent_Serial(serializers.ModelSerializer):
    class Meta:
        model = CalEvent
        fields = ['id','name','calendar','month','day','year','description','campaign']
        read_only_fields = ('id',)