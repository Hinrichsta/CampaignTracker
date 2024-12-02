from rest_framework import permissions
from .models import CampaignCore,CampaignUsers,PartyMember

class IsSuperAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(campaignusers__role="S")

class IsCampaignOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="O")
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="A")
    
class IsCampaignUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="P")
    
class IsCampaignViewer(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        CampaignUsers.objects.filter(user=request.user, campaign=obj.campaign, campaignusers__role="V")