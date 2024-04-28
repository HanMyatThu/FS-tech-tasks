import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import QuestionItems from './QuestionItems';

interface QuestionProps {
  id: string,
  title: string,
  answers: Array<string>,
  questionIndex: number,
  onSelect: (ans: string) => void,
  selectedIndex: number | null,
  setSelectedIndex: (index: number) => void,
  preSelectedAnswer?: string
}

const Question: React.FC<QuestionProps> = ({
  id,
  title,
  answers,
  questionIndex,
  onSelect,
  selectedIndex,
  setSelectedIndex,
  preSelectedAnswer
}) => {
  const [preSelect, setPreSelect] = useState<string>('')

  useEffect(() => {
    if (preSelectedAnswer) {
      setPreSelect(preSelectedAnswer)
    }
  }, [preSelectedAnswer])

  const handleOnSelect = (ans: string, index: number) => {
    onSelect(ans)
    setSelectedIndex(index)
    setPreSelect('')
  }

  return (
    <View>
      <View className="pb-4 border-b-2 border-gray-300 text-center">
        <Text testID={`${id}-title`}>
          {`${questionIndex + 1} : ${title}`}
        </Text>
      </View>
      <View className="pt-4 items-center gap-y-3">
        {
          answers.map((answer: string, index: number) => {
            return (
              <View key={index}>
                <QuestionItems
                  key={index}
                  id={id}
                  answer={answer}
                  index={index}
                  onSelect={handleOnSelect}
                  isSelected={selectedIndex === index || preSelect === answer}
                />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default Question