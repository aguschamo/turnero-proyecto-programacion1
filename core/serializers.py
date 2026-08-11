from rest_framework import serializers
from django.utils import timezone
from datetime import time

from .models import Servicio, Turno

HORARIO_INICIO = time(9, 0)
HORARIO_FIN = time(20, 0)


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'duracion', 'precio', 'is_active')


class ServicioPublicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'duracion', 'precio')


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ('id', 'fecha', 'hora', 'usuario', 'servicio', 'estado')
        read_only_fields = ('usuario', 'estado')

    def validate(self, data):
        fecha = data.get('fecha')
        hora = data.get('hora')

        if fecha and hora:
            qs = Turno.objects.filter(fecha=fecha, hora=hora)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    "Este horario ya se encuentra ocupado. Por favor, elija otra fecha u hora."
                )
        return data

    def validate_fecha(self, value):
        if value < timezone.localdate():
            raise serializers.ValidationError("La fecha del turno no puede ser anterior a hoy.")
        return value

    def validate_hora(self, value):
        if not (HORARIO_INICIO <= value <= HORARIO_FIN):
            raise serializers.ValidationError(
                f"El horario debe estar entre las {HORARIO_INICIO:%H:%M} y las {HORARIO_FIN:%H:%M}."
            )
        return value

