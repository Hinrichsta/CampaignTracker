from rest_framework import permissions
from .models import CampaignCore,CampaignUsers,PartyMember

#Cannot edit other User's permissions yet...
class campaignPermissions(permissions.BasePermission):
    """
    
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
        # Assume the campaign ID is passed in the URL
        campaign_id = obj.id or obj.campaign.id

        if not campaign_id:
            return False
        
        try:
            user_campaign_role = CampaignUsers.objects.get(user=request.user, campaign_id=campaign_id)
        except CampaignUsers.DoesNotExist:
            return False
        
        required_role = self.get_required_role(view)

        if self.is_role_higher_or_equal(user_campaign_role.get_role_order(), required_role):
            return True
        return False
    
    def get_required_role(self, view):
        """
        This method determines what role is required based on the action.
        """
        if view.action == 'list':  # View permissions for listing campaigns
            return 'V'  # Viewer
        elif view.action == 'retrieve':  # View permissions for retrieving a campaign
            return 'V'  # Viewer
        elif view.action == 'create':  # Only Admin or higher can create campaigns
            return 'A'  # Admin
        elif view.action == 'update':  # Only Admin or higher can update campaigns
            return 'A'  # Admin
        elif view.action == 'destroy':  # Only Owner or higher can delete campaigns
            return 'O'  # Owner
        return 'V'  # Default to Viewer if no specific condition is met

    def is_role_higher_or_equal(self, user_role_order, required_role):
        """
        Compare the user's role against the required role for an action.
        """
        required_role_order = {'V': 0, 'P': 1, 'A': 2, 'O': 3, 'S': 4}
        
        return user_role_order >= required_role_order.get(required_role, 0)

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
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        elif view.kwargs.get('pk') is not None:
            if "campaigncore" in request.path:
                campaign_req = obj.id
            else:
                campaign_req = obj.campaign.id
        else:
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
        if hasattr(request, 'campaign'):
            campaign_req = request.campaign
        elif request.query_params.get('campaign') is not None:
            campaign_req = request.query_params.get('campaign')
        elif view.kwargs.get('pk') is not None:
            if "campaigncore" in request.path:
                campaign_req = obj.id
            else:
                campaign_req = obj.campaign.id
        else:
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
            if hasattr(request, 'campaign'):
                campaign_req = request.campaign
            elif request.query_params.get('campaign') is not None:
                campaign_req = request.query_params.get('campaign')
            elif view.kwargs.get('pk') is not None:
                if "campaigncore" in request.path:
                    campaign_req = obj.id
                else:
                    campaign_req = obj.campaign.id
            else:
                return False
            try:
                campaign_user = CampaignUsers.objects.get(user=request.user, campaign=campaign_req)
                if campaign_user.role == 'P':
                    if PartyMember.objects.get(player=request.user):
                        return True
                    elif request.method in permissions.SAFE_METHODS:
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
            if hasattr(request, 'campaign'):
                campaign_req = request.campaign
            elif request.query_params.get('campaign') is not None:
                campaign_req = request.query_params.get('campaign')
            elif view.kwargs.get('pk') is not None:
                if "campaigncore" in request.path:
                    campaign_req = obj.id
                else:
                    campaign_req = obj.campaign.id
            else:
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
            if hasattr(request, 'campaign'):
                campaign_req = request.campaign
            elif request.query_params.get('campaign') is not None:
                campaign_req = request.query_params.get('campaign')
            elif view.kwargs.get('pk') is not None:
                if "campaigncore" in request.path:
                    campaign_req = obj.id
                else:
                    campaign_req = obj.campaign.id
            else:
                return False
            if CampaignCore.objects.filter(id=campaign_req, public=True):
                return True
        return False
