from django.test import TestCase
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from users.views import UserViewSet
from rest_framework import status
from users.models import Users
from Projectapp.models import ToDo, Project
from mixer.backend.django import mixer


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        user = Users.objects.create(username='kodo',
                                    email='kodo@localhost.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = Users.objects.create(username='kodo',
                                    email='kodo@localhost.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/',
                              {'username': 'KODO',
                               'email': 'kood@localhost.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProjectAppViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        admin = Users.objects.create_superuser('admin', 'admin@admin.com',
                                               'adminadmin')
        self.client.login(username='admin', password='adminadmin')
        response = self.client.put(f'/api/project/{project.id}/',
                                   {'users': 'company',
                                   'name': 'first_project',
                                    'repo': 'http://127.0.0.1:8000/api/'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.repo, 'first_project')