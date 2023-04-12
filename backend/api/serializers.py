from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User,
    Project,
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

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=35, required=True)
    about = serializers.CharField(max_length=500)
    status = serializers.CharField(max_length=1, required=False)
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    user_id = serializers.IntegerField(required=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'about', 'status', 'start_date', 'end_date', 'user_id']
