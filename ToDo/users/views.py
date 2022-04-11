from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serializers import UsersModelSerializer, UserSerializer
from rest_framework import mixins, viewsets


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserSerializer
        return UsersModelSerializer
