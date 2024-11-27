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
    """
    #queryset = CampaignCore.objects.all()
    serializer_class = CampaignCore_Serial
    permission_classes = [permissions.IsAdminUser, IsCampaignOwner]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return CampaignCore.objects.filter(purchaser=user)

class CampaignUsers_Views(viewsets.ModelViewSet):
    """
    """
    queryset = CampaignUsers.objects.all()
    serializer_class = CampaignUsers_Serial
    permission_classes = [permissions.IsAdminUser, IsCampaignOwner]

class Party_Views(viewsets.ModelViewSet):
    """
    """
    queryset = PartyMember.objects.all()
    serializer_class = Party_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class Receivable_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Receivable.objects.all()
    serializer_class = Receivable_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class Payable_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Payable.objects.all()
    serializer_class = Payable_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class Vehicles_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Vehicles.objects.all()
    serializer_class = Vehicles_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class Hirelings_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Hirelings.objects.all()
    serializer_class = Hirelings_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class MagicItems_Views(viewsets.ModelViewSet):
    """
    """
    queryset = MagicItems.objects.all()
    serializer_class = MagicItems_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class ConsumItems_Views(viewsets.ModelViewSet):
    """
    """
    queryset = ConsumItems.objects.all()
    serializer_class = ConsumItems_Serial
    [permissions.IsAdminUser, IsCampaignOwner]

class CalendarCore_Views(viewsets.ModelViewSet):
    """
    """
    queryset = CalendarCore.objects.all()
    serializer_class = CalendarCore_Serial
    permission_classes = [permissions.IsAdminUser, IsCampaignOwner]

class CalMonth_Views(viewsets.ModelViewSet):
    """
    """ 
    queryset = CalMonth.objects.all()
    serializer_class = CalMonth_Serial
    permission_classes = [permissions.IsAdminUser, IsCampaignOwner]

class CalEvent_Views(viewsets.ModelViewSet):
    """
    """ 
    queryset = CalEvent.objects.all()
    serializer_class = CalEvent_Serial
    permission_classes = [permissions.IsAdminUser, IsCampaignOwner]