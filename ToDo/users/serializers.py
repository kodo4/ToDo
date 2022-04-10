from rest_framework.serializers import HyperlinkedModelSerializer, \
    ModelSerializer
from .models import Users


class UsersModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'is_superuser', 'is_staff']
