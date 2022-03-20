import uuid
from users.models import Users
from django.db import models


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    repo = models.URLField(max_length=200, blank=True)
    users = models.ManyToManyField(Users)


class ToDo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
