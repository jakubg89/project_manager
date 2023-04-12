from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    MyTokenObtainPairView,
    GenderChoices,
    ProjectChoices,
    UserView,
    ProjectView,
)

router = DefaultRouter()
router.register(r'project', ProjectView, basename="project")
# router.register(r'user', UserView, basename="user")

urlpatterns = [
    path("gender/", GenderChoices.as_view(), name="gender_choice"),
    path("project_status/", ProjectChoices.as_view(), name="status_choice"),

    path("user/register/", UserView.as_view({'post': 'create'}), name='sign_in'),

    # Tokens
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += [
    path('', include(router.urls)),
]