import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge'

interface QuestionItemsProps {
  id: string,
  answer: string,
  index: number,
  onSelect: (answer: string, index: number) => void,
  isSelected: boolean
}

const QuestionItems: React.FC<QuestionItemsProps> = ({
  id,
  answer,
  index,
  onSelect,
  isSelected = false
}) => {

  const onSelectAnswer = () => {
    onSelect(answer, index)
  }

  return (
    <Pressable
      onPress={onSelectAnswer}
      className={
        twMerge("bg-white p-2 border border-neutral-100 shadow-sm text-center transition hover:bg-neutral-100 hover:border-neutral-300",
          isSelected ? "bg-blue-400 border border-blue-200 hover:bg-blue-400 hover:border-blue-200" : null
        )
      }>
      <Text testID={`${id}-answer-${index}`}>
        {`${index}. ${answer}`}
      </Text>
    </Pressable>
  )
}

export default QuestionItems