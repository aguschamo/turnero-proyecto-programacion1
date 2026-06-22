from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'nombre', 'role')



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'nombre')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            nombre=validated_data.get('nombre', ''),
            role=User.Roles.CLIENTE,
        )
        return user
