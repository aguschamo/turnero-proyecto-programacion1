from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Client, Service, Appointment

admin.site.register(Client)
admin.site.register(Service)
admin.site.register(Appointment)