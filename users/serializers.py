from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=False, allow_blank=True, default='')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field].required = False
        self.fields[self.username_field].allow_blank = True

    def validate(self, data):
        email = (data.get('email') or '').strip()
        password = data.get('password', '')

        if email:
            user = User.objects.filter(email__iexact=email).first()
            if user is not None and user.is_active and user.check_password(password):
                refresh = self.get_token(user)
                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            raise AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        if not data.get(self.username_field):
            raise serializers.ValidationError({
                self.username_field: ['This field is required.'],
            })
        return super().validate(data)
