from django.shortcuts import render
from rest_framework import viewsets, permissions
from CampaignAPI.models import *
from CampaignAPI.serializers import *
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

class Campaign_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Campaign.objects.all()
    serializer_class = Campaign_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Party_Views(viewsets.ModelViewSet):
    """
    """
    queryset = PartyMember.objects.all()
    serializer_class = Party_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Receivable_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Receivable.objects.all()
    serializer_class = Receivable_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Payable_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Payable.objects.all()
    serializer_class = Payable_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Vehicles_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Vehicles.objects.all()
    serializer_class = Vehicles_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Hirelings_Views(viewsets.ModelViewSet):
    """
    """
    queryset = Hirelings.objects.all()
    serializer_class = Hirelings_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MagicItems_Views(viewsets.ModelViewSet):
    """
    """
    queryset = MagicItems.objects.all()
    serializer_class = MagicItems_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ConsumItems_Views(viewsets.ModelViewSet):
    """
    """
    queryset = ConsumItems.objects.all()
    serializer_class = ConsumItems_Serial
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
