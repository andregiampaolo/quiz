from rest_framework import viewsets, permissions, decorators, status, mixins
from rest_framework.response import Response
from django.http import JsonResponse
from quizzes.models import Quiz, Question, QuizAttempt
from quizzes.serializers import QuizSerializer, QuestionSerializer, QuizAttemptSerializer
from datetime import datetime
from django.utils import timezone
import quizzes.constants as Constants


class QuizViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Quiz.objects.all()
    
    '''
        todo: 
            improve this logic to filter data with django model aggregation
            or
            use filter filterset_class
    '''

    def list(self, request, *args, **kwargs):
        queryset = self._filter_quizzes()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def _filter_quizzes(self):
        """
        This view should return a list of all the quizzes with only have
        questions with for answers and one of them is the correct
        """
        quizzes = Quiz.objects.all()
        result = []
        for quiz in quizzes:
            questions = quiz.questions.all()
            add_quiz = False
            for question in questions:
                answers = question.answers.count()
                correct = question.answers.filter(correct=True).count()
                if answers == 4 and correct == 1:
                    add_quiz = True
                    break
            if add_quiz:
                result.append(quiz)

        return result

    

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuizAttemptViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        # overwrite to add quantity of questions on 
        quiz  = request.data.get('quiz')
        if(quiz):
            quiz = Quiz.objects.get(pk=quiz)
            quantity_questions = quiz.questions.count()
            request.data["quantity_questions"] = quantity_questions

        # do your thing here
        return super().create(request)
    

    def _validate_finish_quiz_params(self, request):
        '''Validate if params answers was sended in request

        Args: request

        Returns:
            answers (array)

        Raises: General exception
            Answers type is not defined.
        '''
        answers = request.data.get('answers')
        if answers is None:
            raise Exception(Constants.EXCEPTION_ANSWERS_NOT_INFORMED)
        return answers

    def _calculate_correct_answers(self, quiz_id, answers):
        correct_answers = Quiz.get_correct_answer(self, quiz_id)
        quantity_correct_answers = 0
        for question_id in answers:
            answer_id = answers[question_id]
            answer_id_correct = correct_answers[int(question_id)]
            if int(answer_id) == answer_id_correct:
                quantity_correct_answers = quantity_correct_answers + 1

        return quantity_correct_answers


    @decorators.action(detail=True, methods=['PATCH'],
            url_path='finish',
            url_name='finish')
    def quiz_attempt_finish(self, request, pk):
        '''Save answers of the quiz

        Args: Request with params
            answers (dict) : dict with key: questions_id and value: answers_id
            
        Returns:
            quiz accuracy: text with quiz accuracy

        Raises:
            Exception: General exception or Image(s).
                answers is not defined.
        '''
        try:
            answers = self._validate_finish_quiz_params(request)
            quiz_attempt = QuizAttempt.objects.get(pk=pk);
            quiz_accuraty = self._calculate_correct_answers(quiz_attempt.quiz.id, answers);

            quiz_attempt.correct_answers = quiz_accuraty
            quiz_attempt.score_percentage = quiz_accuraty * 100 / quiz_attempt.quantity_questions
            quiz_attempt.end_at = timezone.now()

            quiz_attempt.save()
            

        except BaseException as error:
            return JsonResponse(data={"message": str(error)},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            instance = self.get_object()

            serializer = self.get_serializer(instance)
            print(serializer)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)


class RakingViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        ranking = QuizAttempt.get_ranking(self)
        return JsonResponse(ranking,status=status.HTTP_200_OK)