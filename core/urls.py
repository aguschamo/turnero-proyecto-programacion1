from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ServicioViewSet, TurnoViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'turnos', TurnoViewSet, basename='turno')

urlpatterns = [
    path('', include(router.urls)),
]
