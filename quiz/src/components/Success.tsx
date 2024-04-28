import React, { Dispatch, useEffect } from 'react'
import { CustomButton } from './Button'
import { Text, View, SectionList, SafeAreaView } from 'react-native'
import ResultInterFace from "../interface/result"
import { twMerge } from 'tailwind-merge'

interface SuccessProps {
  data: ResultInterFace,
  onClick: () => void,
  highScore: number[],
  setHighScore: Dispatch<number[]>
}

const Success: React.FC<SuccessProps> = ({
  data,
  onClick,
  highScore,
  setHighScore
}) => {

  useEffect(() => {
    if (data.result) {
      const currentScore: number = data.result / 10
      highScore.push(currentScore)
      setHighScore(highScore)
    }
  }, [data])

  console.log(highScore, 'highScore')

  const passText: string = 'You are in a great shape. Keep doing this';
  const failText: string = 'You need to study more!'

  return (
    <View className="bg-white flex justify-center items-center w-screen h-200 mt-40 p-5">
      <View className="border shadow-teal-300 shadow-md max-w-2xl p-6 rounded-lg">
        <View className="border-b-2 mb-8 text-center">
          <Text testID='success-title' className="text-4xl font-mono font-extrabold py-3">{data.status}</Text>
        </View>
        <View testID='passed-label'>
          <Text>
            {`High Score: ${(highScore.sort((a, b) => b - a))[0]}`}
          </Text>
          <Text>
            {`Score : ${data.result / 10} / 10`}
          </Text>
          <Text>
            {data.result === 100 ?
              "You have chosen all of the correct answers!" :
              "Please try again!"
            }
          </Text>
        </View>
        <View className='border-t-2 mt-5 pt-5 flex flex-row justify-between'>
          <Text testID='success-desc' className={twMerge("text-sm font-mono font-extrabold", data.result >= 50 ? 'text-green-700' : 'text-red-700')}>
            {data.result >= 50 ? passText : failText}
          </Text>
          <CustomButton
            color='#d45a3f'
            onClick={onClick}
            title="Retake Quiz" />
        </View>
      </View>
    </View>
  )
}

export default Success