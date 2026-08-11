from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Servicio, Turno
from .permissions import IsAdminOrVendedor, IsOwnerOrAdmin
from .serializers import ServicioPublicoSerializer, ServicioSerializer, TurnoSerializer


def is_admin(user):
    return user.is_staff or getattr(user, 'role', None) == 'ADMIN'


class ServicioViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and is_admin(user):
            return Servicio.objects.all()
        return Servicio.objects.filter(is_active=True)

    def get_serializer_class(self):
        user = self.request.user
        is_safe = self.request.method in ('GET', 'HEAD', 'OPTIONS')
        if is_safe and not (user.is_authenticated and is_admin(user)):
            return ServicioPublicoSerializer
        return ServicioSerializer

    def get_permissions(self):
        if self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return []
        return [IsAdminOrVendedor()]


class TurnoViewSet(viewsets.ModelViewSet):
    serializer_class = TurnoSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        if is_admin(user):
            return Turno.objects.all()
        if getattr(user, 'role', None) == 'CLIENTE':
            return Turno.objects.filter(usuario=user)
        return Turno.objects.none()

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
