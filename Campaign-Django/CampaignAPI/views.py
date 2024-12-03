from django.shortcuts import render
from rest_framework import viewsets, permissions
from CampaignAPI.models import *
from CampaignAPI.serializers import *
from .permissions import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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


class CampaignCore_Views(viewsets.ModelViewSet):
    """
    Returns a list of Campaigns based on the logged in user.
    """
    queryset = CampaignCore.objects.all()
    serializer_class = CampaignCore_Serial
    permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]


    def get_queryset(self):
        """
        Filters the Campaigns based on what user is logged in, by checking against the permissions table.
        """
        user = self.request.user

        return CampaignCore.objects.filter(campaignusers__user=user)

class CampaignUsers_Views(viewsets.ModelViewSet):
    """
    Returns a list of Campaigns and User Roles based on the logged in user
    
    Can be filtered with ?campaign=#
    """
    queryset = CampaignUsers.objects.all()
    serializer_class = CampaignUsers_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return CampaignUsers.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return CampaignUsers.objects.filter(campaign_id__in=access)       

class Party_Views(viewsets.ModelViewSet):
    """
    Returns all of the characters in a campaign or all of the characters in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = PartyMember.objects.all()
    serializer_class = Party_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]
        

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return PartyMember.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return PartyMember.objects.filter(campaign_id__in=access)  

class Receivable_Views(viewsets.ModelViewSet):
    """
    Returns all of the income transactions in a campaign or all of the income transactions in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = Receivable.objects.all()
    serializer_class = Receivable_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return Receivable.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return Receivable.objects.filter(campaign_id__in=access)  

class Payable_Views(viewsets.ModelViewSet):
    """
    Returns all of the expense transactions in a campaign or all of the expense transactions in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = Payable.objects.all()
    serializer_class = Payable_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return Payable.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return Payable.objects.filter(campaign_id__in=access)  

class Vehicles_Views(viewsets.ModelViewSet):
    """
    Returns all of the vehicles in a campaign or all of the vehicles in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = Vehicles.objects.all()
    serializer_class = Vehicles_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return Vehicles.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return Vehicles.objects.filter(campaign_id__in=access)  

class Hirelings_Views(viewsets.ModelViewSet):
    """
    Returns all of the hirelings in a campaign or all of the hirelings in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = Hirelings.objects.all()
    serializer_class = Hirelings_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return Hirelings.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return Hirelings.objects.filter(campaign_id__in=access)  

class MagicItems_Views(viewsets.ModelViewSet):
    """
    Returns all of the Magical Items in a campaign or all of the Magical Items in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = MagicItems.objects.all()
    serializer_class = MagicItems_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return MagicItems.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return MagicItems.objects.filter(campaign_id__in=access)  

class ConsumItems_Views(viewsets.ModelViewSet):
    """
    Returns all of the Consummable Items in a campaign or all of the Consummable Items in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = ConsumItems.objects.all()
    serializer_class = ConsumItems_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return ConsumItems.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return ConsumItems.objects.filter(campaign_id__in=access)  

class CalendarCore_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendars in a campaign or all of the Calendars in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = CalendarCore.objects.all()
    serializer_class = CalendarCore_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return CalendarCore.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return CalendarCore.objects.filter(campaign_id__in=access)  

class CalMonth_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendar Months in a campaign or all of the Calendar Months in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = CalMonth.objects.all()
    serializer_class = CalMonth_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return CalMonth.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return CalMonth.objects.filter(campaign_id__in=access)  

class CalEvent_Views(viewsets.ModelViewSet):
    """
    Returns all of the Calendar Events in a campaign or all of the Calendar Events in all of the user's campaigns

    Can be filtered with ?campaign=#
    """
    queryset = CalEvent.objects.all()
    serializer_class = CalEvent_Serial
    #permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignUser|IsCampaignViewer]

    def get_permissions(self):
        """
        Sets what permissions a user needs to perform an action based on the HTTP method they are using
        
        Being authenticated is a requirement off all the Custom permissions, and permissions are set per campaign
        """
        if self.action == 'list' or 'retrieve':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser|IsCampaignViewer]
        if self.action == 'create' or 'update' or 'partial_update':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin|IsCampaignUser]
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner|IsCampaignAdmin]
        else:
            permission_classes = [permissions.IsAdminUser|IsCampaignOwner]
            
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filters the request based on what campaign in in the URL, or based on the user.

        If as user doesn't have access to a specific campaign it doesn't return anything.
        """
        if 'campaign' in self.request.query_params:
            user = self.request.user
            campaign = self.request.query_params.get('campaign')
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list based on the Campaign in the URL, and by finding what values in the list are in the access Object
            return CalEvent.objects.filter(campaign_id__in=access,campaign=campaign)
        else:
            user = self.request.user
            # Filters the Campaign User based on the logged in User putting that in an object, and creates a list with all of the values.
            access = CampaignUsers.objects.filter(user=user).values_list('campaign_id', flat=True)
            # Returns a filtered list by finding what values in the list are in the access Object
            return CalEvent.objects.filter(campaign_id__in=access)  