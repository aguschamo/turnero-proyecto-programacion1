from django.db import models


class Client(models.Model):
    name = models.CharField("Nombre", max_length=100)
    phone = models.CharField("Teléfono", max_length=20)
    created_at = models.DateTimeField("Creado el", auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone}"


class Service(models.Model):
    name = models.CharField("Nombre", max_length=100)
    price = models.DecimalField("Precio", max_digits=8, decimal_places=2)
    duration_minutes = models.PositiveIntegerField("Duración (minutos)")
    created_at = models.DateTimeField("Creado el", auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.duration_minutes} min)"


class Appointment(models.Model):
    date = models.DateField("Fecha")
    time = models.TimeField("Hora")
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="appointments",
        verbose_name="Cliente"
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="appointments",
        verbose_name="Servicio"
    )
    created_at = models.DateTimeField("Creado el", auto_now_add=True)

    class Meta:
        ordering = ["date", "time"]
        verbose_name = "Turno"
        verbose_name_plural = "Turnos"

    def __str__(self):
        return f"{self.date} {self.time} - {self.client.name} ({self.service.name})"
