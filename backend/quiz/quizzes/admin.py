from django.contrib import admin

# Register your models here.

from .models import Topic, Quiz, Question, Answer

admin.site.register(Topic)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Answer)