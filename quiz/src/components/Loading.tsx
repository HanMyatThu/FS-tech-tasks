import React from 'react'
import { Text, View } from 'react-native'

interface LoadingProps { }

const Loading: React.FC<LoadingProps> = ({ }) => {
  return (
    <View id='loader' className="mt-20 mb-20 h-full w-full flex items-center justify-center">
      <View
        className="
          inline-block 
          h-8 
          w-8 
          animate-spin 
          items-center
          justify-center
          text-center
          rounded-full 
          border-4 
          border-solid
          bg-green-500
          border-current 
          border-r-transparent 
          align-[-0.125em] 
          motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <View
          className="
            !absolute 
            !-m-px 
            !h-px 
            !w-px 
            !overflow-hidden 
            !whitespace-nowrap 
            !border-0 
            !p-0 
            ![clip:rect(0,0,0,0)]"
        >
          <Text>
            ...Loading
          </Text>
        </View>
      </View>
    </View>

  )
}

export default Loading