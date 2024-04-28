import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { fetchQuestions, SubmitQuestions } from '../api/fetchQuestion';
import { CustomButton } from './Button';
import { AppState, View, Text } from 'react-native';
import ResultInterFace from '../interface/result';
import Loading from './Loading';
import Success from './Success'
import Question from './Question'

const defaultState: ResultInterFace = {
  result: 0,
  status: '',
  corrAns: [],
  wrongAnswers: []
}

export const Home: React.FC = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);


  const [questionIndex, setQuestinIndex] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [singleAnswer, setSingleAnswer] = useState<string>('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
  const [successScreen, setSuccessScreen] = useState<boolean>(false)
  const [highScrore, setHighScore] = useState<number[]>([])
  const [successData, setSuccessData] = useState<ResultInterFace>(defaultState)

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryFn: async () => await fetchQuestions(`https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`),
    staleTime: Infinity,
    cacheTime: 0,
    enabled: true,
  })

  const correctAnswer: string = data?.results?.[questionIndex].correct_answer
  const allAnswers: string[] = data?.results?.[questionIndex].incorrect_answers
  const totalQuestion: number = data?.results?.length
  const isLastQuestion: boolean = questionIndex === totalQuestion - 1

  const goNext = () => {
    //set the user answer
    quizAnswers[questionIndex] = singleAnswer
    setQuizAnswers(quizAnswers)
    // set the correct answer
    correctAnswers[questionIndex] = correctAnswer
    setCorrectAnswers(correctAnswers)
    if (questionIndex < totalQuestion - 1) {
      setQuestinIndex(value => value + 1)
      //set the default to answer selection
      setSelectedAnswerIndex(null)
      //save the answer to total answers

    } else if (isLastQuestion) {
      //submit the final test
      SubmitAnswer()
    }
  }

  const goPrevious = () => {
    if (questionIndex > 0) {
      setQuestinIndex(value => value - 1)
      //remove last element from array
      const newArr = quizAnswers.slice(0, questionIndex)
      setQuizAnswers(newArr)
      setSelectedAnswerIndex(null)
      correctAnswers.pop()
      setCorrectAnswers(correctAnswers)
    }
  }

  const buttonLabel: string = isLastQuestion ? "Submit" : "Next"
  const buttonId: string = isLastQuestion ? 'submit_button' : 'next_button'

  // index = question index
  const handleSelect = (answer: string) => {
    setSingleAnswer(answer)
  }

  const { mutateAsync: SubmitAnswer, isLoading: submitLoading } = useMutation({
    mutationFn: async () => await SubmitQuestions(correctAnswers, quizAnswers),
    onSuccess: (data) => {
      setSuccessData(data)
      setSuccessScreen(true)
    }
  })

  const handleSuccessBtn = () => {
    //reset all state variables & frefresh the questions
    setSuccessScreen(false)
    setSelectedAnswerIndex(null)
    setSingleAnswer('')
    setQuizAnswers([])
    setCorrectAnswers([])
    setQuestinIndex(0)
    setSuccessData(defaultState)
    refetch()
  }


  useEffect(() => {
    if (appStateVisible === 'background') {
      handleSuccessBtn()
    }
  }, [appStateVisible])


  if (successScreen) {
    return (
      <Success
        data={successData}
        onClick={handleSuccessBtn}
        highScore={highScrore}
        setHighScore={setHighScore}
      />
    )
  }

  return (
    <View className="mt-20 h-250 w-full items-center justify-center bg-teal-lightest font-sans flex flex-col">
      <View className="mt-10 mb-5 justify-center items-center">
        <Text className="text-lg">
          Sport Quiz
        </Text>
      </View>
      <View className="bg-slate-100 rounded shadow p-6 m-4 w-full h-full">
        {
          isLoading || submitLoading || isRefetching ?
            <Loading /> :
            <Question
              id={`bizzy-quiz-${questionIndex}`}
              title={data?.results?.[questionIndex].question}
              answers={[...allAnswers, correctAnswer]}
              questionIndex={questionIndex}
              onSelect={handleSelect}
              selectedIndex={selectedAnswerIndex}
              setSelectedIndex={setSelectedAnswerIndex}
              preSelectedAnswer={quizAnswers[questionIndex]}
            />
        }
        {
          !isLoading && !submitLoading && !isRefetching && (
            <View className='mt-10 justify-center flex flex-row gap-x-2'>
              <View>
                <CustomButton
                  id='previous_button'
                  disabled={questionIndex === 0}
                  color='#41dadf'
                  onClick={goPrevious}
                  title="Previous" />
              </View>
              <View>
                <CustomButton
                  id={buttonId}
                  disabled={selectedAnswerIndex === null}
                  color='#da145d'
                  onClick={goNext}
                  title={buttonLabel} />
              </View>
            </View>
          )
        }
      </View>
    </View>
  )
}
