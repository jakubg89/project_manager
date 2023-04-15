from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User,
    Project,
    Comment,
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

    first_name = serializers.CharField(max_length=150, required=True)
    last_name = serializers.CharField(max_length=150, required=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "gender",
            "age",
            "phone_number",
            "first_name",
            "last_name",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=35, required=True)
    about = serializers.CharField(max_length=500)
    status = serializers.CharField(max_length=1, required=False)
    start_date = serializers.DateTimeField(format="%Y-%m-%d")
    end_date = serializers.DateTimeField(format="%Y-%m-%d")
    user_id = serializers.IntegerField(required=True)
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "about",
            "status",
            "start_date",
            "end_date",
            "user_id",
            "first_name",
            "last_name",
        ]

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name


class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(required=True)
    project_id = serializers.IntegerField(required=True)
    content = serializers.CharField(
        max_length=500, style={"base_template": "textarea.html"}
    )
    date_added = serializers.DateTimeField(format="%Y-%m-%d %H:%M", required=False)

    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "user_id",
            "project_id",
            "content",
            "date_added",
            "first_name",
            "last_name",
        ]

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name
