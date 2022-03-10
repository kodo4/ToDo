import json
import os

from django.core.management.base import BaseCommand

from users.models import Users

JSON_PATH = 'users/json'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_from_json('users')

        Users.objects.all().delete()
        for user in users:
            new_user = Users(**user)
            new_user.save()

        Users.objects.create_superuser(username='kodoch',
                                       email='admin@localhost.local',
                                       password='123123')
