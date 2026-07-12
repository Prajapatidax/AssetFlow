from rest_framework.permissions import BasePermission
from apps.authentication.models import User


class IsAdmin(BasePermission):
    """
    Allows access only to Admin users or superusers.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin


class IsAssetManager(BasePermission):
    """
    Allows access only to Asset Managers or Admins.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.is_admin or request.user.role == User.Roles.ASSET_MANAGER
        )


class IsDepartmentHead(BasePermission):
    """
    Allows access only to Department Heads or Admins.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.is_admin or request.user.role == User.Roles.DEPARTMENT_HEAD
        )
