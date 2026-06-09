from datetime import timedelta

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models


class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.DurationField(validators=[MinValueValidator(timedelta(minutes=1))])
    precio = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.nombre


class Turno(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        CONFIRMADO = 'confirmado', 'Confirmado'
        CANCELADO = 'cancelado', 'Cancelado'

    fecha = models.DateField()
    hora = models.TimeField()
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='turnos'
    )
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE, related_name='turnos'
    )
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PENDIENTE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['fecha', 'hora'], name='unique_fecha_hora'
            )
        ]

    def __str__(self):
        return f"{self.fecha} {self.hora} - {self.usuario}"
