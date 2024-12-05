from rest_framework import permissions
from .models import CampaignCore,CampaignUsers,PartyMember

class IsSuperAdmin(permissions.BasePermission):
    """
    Not Completed

    Checked to see if a User is Authenticated, and if that have the Super User Role in the Campaign User's Table.
    """
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(campaignusers__role="S")

class IsCampaignOwner(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Owner Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        else:
            campaign_req = 0
        if request.user.is_authenticated & request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=campaign_req, campaignusers__role="O") is not None:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="O") is not None:
            return True
        return False
        
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Admin Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        else:
            campaign_req = 0
        if request.user.is_authenticated & request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=campaign_req, campaignusers__role="A") is not None:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="A") is not None:
            return True
        return False
    
class IsCampaignUser(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Player Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        else:
            campaign_req = 0
        if request.user.is_authenticated & request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=campaign_req, campaignusers__role="P") is not None:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="P") is not None:
            return True
        return False
    
class IsCampaignViewer(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Viewer Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif self.request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        else:
            campaign_req = 0
        if request.user.is_authenticated & request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=campaign_req, campaignusers__role="V") is not None:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS & CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="V") is not None:
            return True
        return False

class CampaignIsPublic(permissions.BasePermission):
    """
    Checks to see if a campaign has been set to public.  Users can only view public campaigns, the cannot edit them in anyway.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS & CampaignCore.objects.filter(campaign=request.campaign, campaigncore__public=True):
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS & CampaignCore.objects.filter(campaign=request.campaign, campaigncore__public=True):
            return True
        return False
