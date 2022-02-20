from django.core.management.base import BaseCommand
from users.models import Users
from django.contrib.auth.models import User

import json, os

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

    super_user = User.objects.create_superuser('admin',
                                               'admin@localhost.local',
                                               'admin')
