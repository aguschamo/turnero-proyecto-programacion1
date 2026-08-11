from rest_framework import serializers
from django.utils import timezone
from datetime import time

from .models import Servicio, Turno



class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'duracion', 'precio', 'is_active')


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ('id', 'fecha', 'hora', 'usuario', 'servicio', 'estado')
        read_only_fields = ('usuario', 'estado')

    def validate(self, data):
        fecha = data.get('fecha')
        hora = data.get('hora')

        if fecha and hora:
            if Turno.objects.filter(fecha=fecha, hora=hora).exists():
                raise serializers.ValidationError(
                    "Este horario ya se encuentra ocupado. Por favor, elija otra fecha u hora."
                )
        return data

    def validate_fecha(self, value):
        if value < timezone.locals.date().date() if hasattr(timezone.locals, 'date') else value < timezone.now().date():
            raise serializers.ValidationError("La fecha del turno no puede ser anterior a hoy.")
        return value

    def validate_hora(self, value):
        start_time = time(9, 0)
        end_time = time(20, 0)
        if not (start_time <= value <= end_time):
            raise serializers.ValidationError(f"El horario debe estar entre las {start_time} y las {end_time}.")
        return value

