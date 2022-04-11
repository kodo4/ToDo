import graphene
from graphene_django import DjangoObjectType
from Projectapp.models import ToDo, Project
from users.models import Users


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = ('username', 'is_superuser', 'is_staff')


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
