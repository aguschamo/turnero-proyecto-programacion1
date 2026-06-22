from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ('nombre', 'email', 'role', 'is_staff')
    list_filter = ('role',)
    search_fields = ('nombre', 'email')
    
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Datos adicionales', {'fields': ('nombre', 'role')}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ('Datos adicionales', {'fields': ('nombre', 'role')}),
    )
