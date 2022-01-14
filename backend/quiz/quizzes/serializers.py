from rest_framework import serializers
from quizzes.models import Topic, Quiz, Question, Answer, QuizAttempt


class AnswerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Answer
        fields = ['id', 'answer', 'correct']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'question', 'answers']

# https://www.django-rest-framework.org/api-guide/serializers/#example
class QuizDynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(QuizDynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        fields = self.context['request'].query_params.get('fields')
        if fields:
            fields = fields.split(',')
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class TopicSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Topic
        fields = ['id', 'name']


class QuizSerializer(QuizDynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    topic = TopicSerializer(many=False, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id','name', 'questions', 'topic']


class QuizAttemptSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = QuizAttempt
        fields = "__all__"
