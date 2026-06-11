from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ServicioViewSet, TurnoViewSet

router = DefaultRouter()
router.register(r'servicios', ServicioViewSet)
router.register(r'turnos', TurnoViewSet, basename='turno')

urlpatterns = [
    path('', include(router.urls)),
]
