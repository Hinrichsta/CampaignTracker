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
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        try:
            if "/user" in request.path:
                campaign_req = request.query_params.get('campaign')
            else:
                campaign_req = view.kwargs.get('cid')
            if not campaign_req:
                campaign_req = obj.campaign.id if hasattr(obj, 'campaign') else view.kwargs.get('pk')
            if not campaign_req:
                print("No Campaign Request")
                return False
        except:
            return False
        if "/user" in request.path:
            try:
                requested_user = CampaignUsers.objects.get(user=view.kwargs.get('pk'), campaign=campaign_req)
                if not requested_user:
                    return False
            except:
                print("Requested User Failed")
                return False
        try:
            campaign_user = CampaignUsers.objects.get(user=request.user, campaign=campaign_req)
            if campaign_user.role == 'O':
                return True
            return False
        except CampaignUsers.DoesNotExist:
            return False
        
    
class IsCampaignAdmin(permissions.BasePermission):
    """
    Checks to see if a User is Authenticated, and if that have the Admin Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        try:
            if "/user" in request.path:
                campaign_req = request.query_params.get('campaign')
            else:
                campaign_req = view.kwargs.get('cid')
            if not campaign_req:
                campaign_req = obj.campaign.id if hasattr(obj, 'campaign') else view.kwargs.get('pk')
            if not campaign_req:
                print("No Campaign Request")
                return False
        except:
            return False
        if "/user" in request.path:
            try:
                requested_user = CampaignUsers.objects.get(user=view.kwargs.get('pk'), campaign=campaign_req)
                if not requested_user:
                    return False
            except:
                print("Requested User Failed")
                return False
        try:
            campaign_user = CampaignUsers.objects.get(user=request.user, campaign=campaign_req)
            if campaign_user.role == 'A':
                return True
            return False
        except CampaignUsers.DoesNotExist:
            return False
    
class IsCampaignUser(permissions.BasePermission):
    """
    Checks to see if a User is Authenticated, and if that have the Player Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            try:
                campaign_req = view.kwargs.get('cid')
                if not campaign_req:
                    campaign_req = obj.campaign.id if hasattr(obj, 'campaign') else view.kwargs.get('pk')
                if not campaign_req:
                    return False
            except:
                return False
            try:
                campaign_user = CampaignUsers.objects.get(user=request.user, campaign=campaign_req)
                if campaign_user.role == 'P':
                    #if PartyMember.objects.get(player=request.user):
                    #    return True
                    #el
                    if request.method in permissions.SAFE_METHODS:
                        return True
                return False
            except CampaignUsers.DoesNotExist:
                return False
        return False
    

    
class IsCampaignViewer(permissions.BasePermission):
    """
    Checks to see if a User is Authenticated, and if that have the Viewer Role in the Campaign User's Table.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            try:
                campaign_req = view.kwargs.get('cid')
                if not campaign_req:
                    campaign_req = obj.campaign.id if hasattr(obj, 'campaign') else view.kwargs.get('pk')
                if not campaign_req:
                    return False
            except:
                return False
            try:
                campaign_user = CampaignUsers.objects.get(user=request.user, campaign=campaign_req)
                if campaign_user.role == 'V':
                    return True
                return False
            except CampaignUsers.DoesNotExist:
                return False
        return False


class CampaignIsPublic(permissions.BasePermission):
    """
    Checks to see if a campaign has been set to public.  Users can only view public campaigns, they cannot edit them in anyway.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            try:
                campaign_req = view.kwargs.get('cid')
                if not campaign_req:
                    campaign_req = obj.campaign.id if hasattr(obj, 'campaign') else view.kwargs.get('pk')
                if not campaign_req:
                    return False
            except:
                return False
        return False