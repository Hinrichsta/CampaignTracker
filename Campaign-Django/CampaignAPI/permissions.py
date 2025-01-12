from rest_framework import permissions
from .models import CampaignCore,CampaignUsers,PartyMember

#Can Edit, but can edit anyones...  Maybe put in Validator again?
class campaignPermissions(permissions.BasePermission):
    """
    
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Assume the campaign ID is passed in the URL
        #campaign_id = obj.id or obj.campaign.id
        campaignId = view.kwargs.get('cid')
        if "campaignusers" in request.path:
            targetUserId = view.kwargs.get('pk')
        
        if not campaignId:
            return False
        
        try:
            userCampaignRole = CampaignUsers.objects.get(user=request.user, campaign=campaignId)
        except CampaignUsers.DoesNotExist:
            return False
        
        requiredRole = self.getActionPerm(request, view)

        if targetUserId:
            try:
                targetUserRole = CampaignUsers.objects.get(user=targetUserId, campaign=campaignId)
            except CampaignUsers.DoesNotExist:
                return False
            
            if view.action == 'retrieve':
                return True
            
            if not self.roleOrderHigher(userCampaignRole.getRoleOrder(), targetUserRole.getRoleOrder()):
                return False

        if self.roleOrderHigher(userCampaignRole.getRoleOrder(), requiredRole):
            return True
        
        return False
    
    def getActionPerm(self, request, view):
        """
        This method determines what role is required based on the action.
        """
        if view.action == 'list':  # View permissions for listing
            return 'V'  # Viewer
        elif view.action == 'retrieve':  # View permissions for retrieving 
            return 'V'  # Viewer
        elif view.action == 'create' and "campaignusers" not in request.path:  # Players can add items
            return 'P'  # Player
        elif view.action == 'create' and "campaignusers" in request.path:  # Only Admin can add players
            return 'A'  # Player
        elif view.action == 'update':  # Admins or higher can update items
            return 'A'  # Admin
        elif view.action == 'destroy':  # Admins or higher can delete items
            return 'A'  # Owner
        return 'V'  # Default to Viewer if no specific condition is met

    def roleOrderHigher(self, userRoleOrder, requiredRole):
        """
        Compare the user's role against the required role for an action.
        """
        roleOrder = {'V': 0, 'P': 1, 'A': 2, 'O': 3, 'S': 4}

        return userRoleOrder > roleOrder.get(requiredRole, 0)

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
