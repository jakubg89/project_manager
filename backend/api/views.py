from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.decorators import action

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .serializers import (
    MyTokenObtainPairSerializer,
    UserSerializer,
    ProjectSerializer,
    CommentSerializer,
)

from .models import User, Project, Comment


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GenderChoices(APIView):
    def get(self, request):
        gender = {}
        for i in User.GENDER_CHOICES:
            gender.update({i[0]: i[1]})
        return Response({"gender_choices": gender})


class ProjectChoices(APIView):
    def get(self, request):
        project = {}
        for i in Project.STATUS_CHOICES:
            project.update({i[0]: i[1]})
        return Response({"status": project})


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
            print(self.request.data)
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
    serializer_class = ProjectSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        if self.action in ["list"]:
            self.queryset = Project.objects.filter(user=self.request.user)
        elif self.action in ["destroy", "retrieve", "update", "partial_update"]:
            project_pk = self.kwargs.get("pk")
            self.queryset = Project.objects.filter(id=project_pk)
        else:
            self.queryset = None
        return super().get_queryset()


# class ProjectAssignedUserView(GenericAPIView, mixins.ListModelMixin):
#     pass


class CommentView(GenericViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):
    serializer_class = CommentSerializer
    permission_classes = [
        IsAuthenticated,
        # AllowAny
    ]

    @action(detail=True, methods=["get"], url_path="details", url_name="details")
    def project_comments(self, request, pk=None):
        self.queryset = Comment.objects.filter(project_id=pk).order_by("-date_added")
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
