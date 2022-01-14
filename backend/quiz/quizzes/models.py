from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User

class TimeStampMixin(models.Model):
    """Abstract model used to add datetime fields in other models"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta model class to define model class as an abstract model"""
        abstract = True

class Topic(TimeStampMixin):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name

class Quiz(TimeStampMixin):
    topic = models.ForeignKey(Topic, related_name='topic', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def get_correct_answer(self, quiz_id):
        """
        This functions retrieve a dict {question_id: correct_answer_id}
        that represent the correct answers from a quiz (quiz_id : param)
        """
        result = {}
        quiz = Quiz.objects.get(pk=quiz_id)
        questions = quiz.questions.all()
        for question in questions:
            answer = question.answers.get(correct=True)
            result[question.id] = answer.id

        return result

    def __str__(self):
        return self.name

class Question(TimeStampMixin):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=200)

    def __str__(self):
        return self.question

class Answer(TimeStampMixin):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    answer = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer

class QuizAttempt(TimeStampMixin):
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name='quiz', on_delete=models.CASCADE)
    quantity_questions = models.IntegerField()
    correct_answers = models.IntegerField(default=0)
    score_percentage = models.FloatField(default=0.0) # could create an index with a calc
    start_at = models.DateTimeField(auto_now_add=True) # could use create_at
    end_at = models.DateTimeField(blank=True, null=True)

    
    def get_ranking(self):
        """
        This functions retrieve a raking from each quiz
        """
        result = {}
        quizzes_attempt = QuizAttempt.objects.all().order_by('quiz','-score_percentage')
        quiz = 0
        for attempt in quizzes_attempt:
            if quiz != attempt.quiz.id :
                result[attempt.quiz.name] = []
                quiz = attempt.quiz.id
            
            result[attempt.quiz.name].append((
                attempt.user.username, attempt.score_percentage
            ))
            
        return result

