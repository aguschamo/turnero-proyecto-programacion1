from django.contrib import admin

from .models import Servicio, Turno, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'is_staff')
    search_fields = ('nombre', 'email')


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'duracion', 'precio')
    search_fields = ('nombre',)


@admin.register(Turno)
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora', 'usuario', 'servicio', 'estado')
    list_filter = ('estado', 'fecha')
    search_fields = ('usuario__nombre',)
