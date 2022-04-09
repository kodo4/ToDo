from rest_framework.serializers import ModelSerializer, StringRelatedField

from users.models import Users
from Projectapp.models import Project, ToDo


class SimpleUserModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ['username']


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        # exclude = ['id']
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    user = SimpleUserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
