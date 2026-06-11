from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Servicio, Turno
from .permissions import IsAdminOrVendedor, IsOwnerOrAdmin
from .serializers import ServicioSerializer, TurnoSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

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
        if user.is_staff or user.role == 'ADMIN':
            return Turno.objects.all()
        return Turno.objects.filter(usuario=user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
