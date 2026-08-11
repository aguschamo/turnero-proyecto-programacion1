from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrVendedor(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role in ['ADMIN', 'VENDEDOR']


class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Unificamos el criterio de Admin: staff de Django o rol ADMIN del sistema
        is_admin = request.user.is_staff or getattr(request.user, 'role', None) == 'ADMIN'
        return is_admin or obj.usuario == request.user


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
