from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User,

)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["email"] = user.email

        return token


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(required=True)

    age = serializers.IntegerField(required=True)
    gender = serializers.CharField(max_length=1, required=True)
    phone_number = serializers.CharField(max_length=20)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'gender', 'age', 'phone_number']


class ProjectSerializer(serializers.ModelSerializer):
    pass
