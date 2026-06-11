from rest_framework import serializers

from .models import Servicio, Turno


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'duracion', 'precio')


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ('id', 'fecha', 'hora', 'usuario', 'servicio', 'estado')
        read_only_fields = ('usuario', 'estado')
