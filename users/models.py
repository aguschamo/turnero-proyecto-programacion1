from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        CLIENTE = 'CLIENTE', 'Cliente'
        VENDEDOR = 'VENDEDOR', 'Vendedor'

    nombre = models.CharField(max_length=150, blank=True, default='')
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.CLIENTE)

    def __str__(self):
        return self.nombre
