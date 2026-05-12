from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Client, Service, Appointment
from .serializers import ClientSerializer, ServiceSerializer, AppointmentSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer