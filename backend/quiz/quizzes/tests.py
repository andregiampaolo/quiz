from django.test import TestCase
from unittest.mock import patch

from datetime import datetime
from rest_framework.test import APITestCase
from rest_framework import status
from quizzes.models import Topic, Quiz, Question, Answer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class QuizTest(APITestCase):
    """Integration tests for quiz endpoint"""

    def setUp(self):
        """Start instance variables of quiz"""
        self.user = User.objects.create(username="test", password="test", is_superuser=True )
        self.topic = self._create_topic()
        self.data = {"name": "quiz test", "topic_id": self.topic.id}
        self.url = "/quiz/"
        self.id_not_exist = "999999"
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def _create_topic(self, name="topic test"):
        """Private function to create an topic"""
        return Topic.objects.create(name=name)

    def _create_quiz(self, topic, name="quiz test"):
      return Quiz.objects.create(name=name, topic=topic)

    def _create_question(self, quiz, question="question test"):
      return Question.objects.create(quiz=quiz, question=question)
    
    def _create_answer(self, question, answer="answer", correct=False):
        return Answer.objects.create(
          question=question, 
          answer=answer, 
          correct=correct
          )
    
    def _create_valid_quiz(self, topic, name="valid quiz"):
      quiz = self._create_quiz(topic, name)
      question = self._create_question(quiz, "question 1")
      answer_1 = self._create_answer(question, "answer 1")
      answer_2 = self._create_answer(question, "answer 2")
      answer_3 = self._create_answer(question, "answer 3", True)
      answer_4 = self._create_answer(question, "answer 4")
      return quiz
      
    def test_unauthorized_user(self):
        """Test unauthorized user"""
        self.client.logout()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class QuizListTest(QuizTest):
    """Integration tests for list quiz endpoint"""

    def test_retrieve_empty_list_quiz(self):
        """Retrieve a list quiz empty"""
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_list_quiz(self):
        """Retrieve a list quiz with no valid quizzes."""
        self._create_quiz(self.topic, "test 0")
        self._create_quiz(self.topic, "test 1")
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_list_quiz(self):
        """Retrieve a list quiz with two valid quizzes"""
        self._create_valid_quiz(self.topic, "test 0")
        self._create_valid_quiz(self.topic, "test 1")
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class QuizRetrieveTest(QuizTest):
    """Integration tests for retrieve quiz endpoint"""

    def test_retrieve_quiz_by_id(self):
        """Retrieve quiz by id"""
        quiz = self._create_quiz(self.topic)
        response = self.client.get(self.url + str(quiz.id) + "/")
        self.assertEqual(quiz.id, response.json()["id"])

    def test_retrieve_quiz_by_invalid_id(self):
        """Retrieve quiz by invalid id"""
        self._create_quiz(self.topic)
        response = self.client.get(self.url + self.id_not_exist + "/")
        print(response.json())
        result = {'detail': 'Not found.'}
        self.assertEqual(result, response.json())
