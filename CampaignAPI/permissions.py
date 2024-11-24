from rest_framework import permissions
from .models import CampaignCore,CampaignUsers,PartyMember

class IsSuperAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsCampaignOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        if (request.user in CampaignUsers.user):
            if (obj.CampaignCore == CampaignUsers.campaign) and (CampaignUsers.role == 'O'):
                return True
        return False
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
    
class IsCampaignUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
    
class IsCampaignViewer(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user