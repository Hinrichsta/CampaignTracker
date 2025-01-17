from django.shortcuts import render
from rest_framework import viewsets, permissions, response, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from CampaignAPI.models import *
from CampaignAPI.serializers import *
from .permissions import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q

def authenticate_user(request):
    """
    Authenticates a user using HTTP Basic Authentication.

    Returns:
        user (User): The authenticated user object, or None if authentication fails.
        error_response (tuple): A tuple containing the HTTP status code and message if authentication fails.
    """
    if 'HTTP_AUTHORIZATION' in request:
        auth = request['HTTP_AUTHORIZATION'].split()
        if len(auth) == 2 and auth[0].lower() == 'basic':
            import base64
            try:
                username, password = base64.b64decode(auth[1]).decode('utf-8').split(':')
                user = authenticate(username=username, password=password)
                if user is not None and user.is_authenticated:
                    return user, None
            except (UnicodeDecodeError, ValueError):
                pass

    # Authentication failed
    return None, (401, 'Unauthorized', {'WWW-Authenticate': 'Basic realm="CampaignTracker"'})



class TokenObtainPair_Views(TokenObtainPairView):
    serializer_class = TokenObtainPair_Serial

class UserJoin_Views(viewsets.ModelViewSet):
    '''
    Allows anybody to sign up for the service.
    '''
    queryset = User.objects.all()
    serializer_class = UserJoin_Serial

    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [permissions.AllowAny]
        else:
            #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
            permission_classes = [campaignPermissions]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer = UserJoin_Serial(data=request.data)

        if  serializer.is_valid():
            user = serializer.save()
            response_data = serializer.save()
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class User_Views(viewsets.ModelViewSet):
    '''
    Returns users, for searching to add people to the campaign.
    '''
    queryset = User.objects.all()
    serializer_class = User_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
    permission_classes = [campaignPermissions]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']


    #This needs to get fixed, but need to sit down and figure out the best way to fix it
    #def get_queryset(self):
    #    if self.request.user.is_authenticated:
    #        if self.request.method in permissions.SAFE_METHODS:
    #            if self.request.query_params.get('username') is not None:
    #                user = self.request.query_params.get('username')
    #                return User.objects.filter(user in user)
    #            elif self.kwargs.get('pk') is not None:
    #                user = self.kwargs.get('pk')
    #                return User.objects.filter(user__id=user)
    #        if self.request.user == User.objects.filter(user=self.request.user):
    #            return User.objects.filter(user=self.request.user)
    #    return CampaignCore.objects.none()


class CampaignCore_Views(viewsets.ModelViewSet):
    """
    Returns a list of Campaigns based on the logged in user.
    """
    queryset = CampaignCore.objects.all()
    serializer_class = CampaignCore_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    permission_classes = [campaignPermissions|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['campaign_name']

    def get_queryset(self):
        """
        Filters the Campaigns based on what user is logged in, by checking against the permissions table.
        """
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    return CampaignCore.objects.filter(public=public)
            else:
                user = self.request.user
                return CampaignCore.objects.filter(Q(campaignusers__user=user) | Q(public=True))
        else:
            return CampaignCore.objects.filter(public=True)
            
        return CampaignCore.objects.none()


class CampaignUsers_Views(viewsets.ModelViewSet):
    """
    Returns a list of Campaigns and User Roles based on the logged in user
    
    Can be filtered with ?campaign=#
    """
    queryset = CampaignUsers.objects.all()
    serializer_class = CampaignUsers_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    permission_classes = [campaignPermissions]
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'role']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return CampaignUsers.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return CampaignUsers.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return CampaignUsers.objects.filter(campaign=public_campaigns)
        return CampaignUsers.objects.none()
    

class Party_Views(viewsets.ModelViewSet):
    """
    Returns all of the characters in a campaign or all of the characters in all of the user's campaigns
    """
    queryset = PartyMember.objects.all()
    serializer_class = Party_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['character_name', 'user__username']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return PartyMember.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return PartyMember.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return PartyMember.objects.filter(campaign=public_campaigns)
        return PartyMember.objects.none()

class Receivable_Views(viewsets.ModelViewSet):
    """
    Returns all of the income transactions in a campaign or all of the income transactions in all of the user's campaigns
    """
    queryset = Receivable.objects.all()
    serializer_class = Receivable_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    permission_classes = [campaignPermissions|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['description']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return Receivable.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return Receivable.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return Receivable.objects.filter(campaign=public_campaigns)
        return Receivable.objects.none()

class Payable_Views(viewsets.ModelViewSet):
    """
    Returns all of the expense transactions in a campaign or all of the expense transactions in all of the user's campaigns
    """
    queryset = Payable.objects.all()
    serializer_class = Payable_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    permission_classes = [campaignPermissions|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['description', 'payee']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return Payable.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return Payable.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return Payable.objects.filter(campaign=public_campaigns)
        return Payable.objects.none()
class Vehicles_Views(viewsets.ModelViewSet):
    """
    Returns all of the vehicles in a campaign or all of the vehicles in all of the user's campaigns
    """
    queryset = Vehicles.objects.all()
    serializer_class = Vehicles_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'type']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return Vehicles.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return Vehicles.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return Vehicles.objects.filter(campaign=public_campaigns)
        return Vehicles.objects.none()

class Hirelings_Views(viewsets.ModelViewSet):
    """
    Returns all of the hirelings in a campaign or all of the hirelings in all of the user's campaigns
    """
    queryset = Hirelings.objects.all()
    serializer_class = Hirelings_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return Hirelings.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return Hirelings.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return Hirelings.objects.filter(campaign=public_campaigns)
        return Hirelings.objects.none()

class MagicItems_Views(viewsets.ModelViewSet):
    """
    Returns all of the Magical Items in a campaign or all of the Magical Items in all of the user's campaigns
    """
    queryset = MagicItems.objects.all()
    serializer_class = MagicItems_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'rarity']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return MagicItems.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return MagicItems.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return MagicItems.objects.filter(campaign=public_campaigns)
        return MagicItems.objects.none()

class ConsumItems_Views(viewsets.ModelViewSet):
    """
    Returns all of the Consumable Items in a campaign or all of the Consumable Items in all of the user's campaigns
    """
    queryset = ConsumItems.objects.all()
    serializer_class = ConsumItems_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'type']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return ConsumItems.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return ConsumItems.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return ConsumItems.objects.filter(campaign=public_campaigns)
        return ConsumItems.objects.none()

class CalendarCore_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendars in a campaign or all of the Calendars in all of the user's campaigns
    """
    queryset = CalendarCore.objects.all()
    serializer_class = CalendarCore_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return CalendarCore.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return CalendarCore.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return CalendarCore.objects.filter(campaign=public_campaigns)
        return CalendarCore.objects.none()

class CalMonth_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendar Months in a campaign or all of the Calendar Months in all of the user's campaigns
    """
    queryset = CalMonth.objects.all()
    serializer_class = CalMonth_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return CalMonth.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return CalMonth.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return CalMonth.objects.filter(campaign=public_campaigns)
        return CalMonth.objects.none()

class CalEvent_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendar Events in a campaign or all of the Calendar Events in all of the user's campaigns
    """
    queryset = CalEvent.objects.all()
    serializer_class = CalEvent_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer|CampaignIsPublic]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        campaign_id = self.kwargs.get('cid')
        if self.request.user.is_authenticated:
            if 'public' in self.request.query_params:
                public = self.request.query_params.get('public')
                if public:
                    public_campaigns = CampaignCore.objects.filter(public=public)
                    return CalEvent.objects.filter(campaign=public_campaigns)
            else:
                user = self.request.user
                campaign = self.request.query_params.get('campaign')
                # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
                access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
                # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
                return CalEvent.objects.filter(campaign_id__in=access,campaign=campaign_id) 
        else:
            public_campaigns = CampaignCore.objects.get(public=True,id=campaign_id)
            return CalEvent.objects.filter(campaign=public_campaigns)
        return CalEvent.objects.none()