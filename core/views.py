from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Servicio, Turno
from .permissions import IsAdminOrVendedor, IsOwnerOrAdmin, ReadOnly
from .serializers import ServicioSerializer, TurnoSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

    def get_permissions(self):
        if self.request.method in ('POST', 'PUT', 'PATCH', 'DELETE'):
            return [IsAdminOrVendedor()]
        return []


class TurnoViewSet(viewsets.ModelViewSet):
    serializer_class = TurnoSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Turno.objects.all()
        return Turno.objects.filter(usuario=user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
