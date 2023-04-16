from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractUser):
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
    )

    username = None
    age = models.IntegerField(
        blank=False,
        null=True,
        validators=[MaxValueValidator(140), MinValueValidator(1)],
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()


class Comment(models.Model):
    user = models.ForeignKey(
        "User", related_name="user_comment", on_delete=models.CASCADE
    )
    content = models.TextField(max_length=500)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    project = models.ForeignKey(
        "Project", related_name="project_comments", on_delete=models.CASCADE
    )


class Project(models.Model):
    STATUS_CHOICES = (
        ("N", "New"),
        ("F", "Finished"),
    )

    name = models.CharField(max_length=35, blank=False, null=True)
    about = models.TextField(max_length=500, blank=False, null=True)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0]
    )
    added_date = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField(blank=False, null=True)
    end_date = models.DateTimeField(blank=False, null=True)
    user = models.ForeignKey("User", related_name="user", on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name="projects")
