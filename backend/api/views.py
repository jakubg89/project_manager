from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .serializers import (
    MyTokenObtainPairSerializer,
    UserSerializer,

)

from .models import User, Project


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GenderChoices(APIView):
    def get(self, request):
        return Response({"gender_choices": User.GENDER_CHOICES})


class ProjectChoices(APIView):
    def get(self, request):
        return Response({"status": Project.STATUS_CHOICES})


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy", "retrieve", "list"]:
            self.permission_classes = [
                IsAuthenticated,
            ]
        elif self.action in ["create"]:
            self.permission_classes = [
                AllowAny,
            ]
        return super().get_permissions()

    def get_queryset(self):
        if self.action in ["list"]:
            self.queryset = User.objects.filter(is_staff=0)
        elif self.action in ["destroy", "retrieve", "update", "partial_update"]:
            self.queryset = User.objects.filter(id=self.request.user)
        else:
            self.queryset = None
        return super().get_queryset()


class ProjectView(ModelViewSet):
    pass


class ProjectAssignedUserView(GenericAPIView, mixins.ListModelMixin):
    pass


class CommentView(GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    pass
