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
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="O")
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Admin Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="A")
    
class IsCampaignUser(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Player Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="P")
    
class IsCampaignViewer(permissions.BasePermission):
    """
    Checked to see if a User is Authenticated, and if that have the Viewer Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="V")