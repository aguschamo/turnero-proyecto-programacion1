from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import Servicio, Turno, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ('nombre', 'email', 'is_staff')
    search_fields = ('nombre', 'email')
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Datos adicionales', {'fields': ('nombre',)}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ('Datos adicionales', {'fields': ('nombre',)}),
    )


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'duracion', 'precio')
    search_fields = ('nombre',)


@admin.register(Turno)
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora', 'usuario', 'servicio', 'estado')
    list_filter = ('estado', 'fecha')
    search_fields = ('usuario__nombre',)
