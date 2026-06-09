from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    nombre = models.CharField(max_length=150, blank=True, default='')

    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.DurationField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre


class Turno(models.Model):
    PENDIENTE = 'pendiente'
    CONFIRMADO = 'confirmado'
    CANCELADO = 'cancelado'
    ESTADOS = [
        (PENDIENTE, 'Pendiente'),
        (CONFIRMADO, 'Confirmado'),
        (CANCELADO, 'Cancelado'),
    ]

    fecha = models.DateField()
    hora = models.TimeField()
    usuario = models.ForeignKey(
        'core.User', on_delete=models.CASCADE, related_name='turnos'
    )
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE, related_name='turnos'
    )
    estado = models.CharField(max_length=20, choices=ESTADOS, default=PENDIENTE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['fecha', 'hora'], name='unique_fecha_hora'
            )
        ]

    def __str__(self):
        return f"{self.fecha} {self.hora} - {self.usuario}"
