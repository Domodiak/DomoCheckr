from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    title = models.CharField(default='Task', max_length=50)
    description = models.CharField(default='', max_length=2000)
    created_time = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(auto_now=True) #to test
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Task {}".format(self.pk)