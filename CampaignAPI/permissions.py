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
        if (request.user == CampaignUsers.user) and (CampaignUsers.role == 'O'):
            if (obj.campaign == CampaignUsers.campaign) or (obj.id == CampaignUsers.campaign):
                return True
        return False
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        if (request.user in CampaignUsers.user) and (obj.campaign == CampaignUsers.campaign) and (CampaignUsers.role == 'A'):
            return True
        return False
    
class IsCampaignUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        if (request.user in CampaignUsers.user) and (obj.campaign == CampaignUsers.campaign) and (CampaignUsers.role == 'P'):
            return True
        return False
    
class IsCampaignViewer(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view it.
    """
    def has_object_permission(self, request, view, obj):
        if (request.user in CampaignUsers.user) and (obj.campaign == CampaignUsers.campaign) and (CampaignUsers.role == 'V'):
            return True
        return False