from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'quiz', views.QuizViewSet)
router.register(r'question', views.QuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]