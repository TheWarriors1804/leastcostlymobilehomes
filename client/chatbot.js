import React from 'react'
import {ThemeProvider} from 'styled-components'
import ChatBot from 'react-simple-chatbot'

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#183879',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#183879',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
  fontFamily: 'Source Sans Pro'
}
const Chatbot = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          floating="true"
          botAvatar="connor.jpg"
          steps={[
            {
              id: '0',
              message: 'Welcome to Least Costly Mobile Homes Direct! ',
              trigger: '1'
            },
            {
              id: '1',
              message: 'My name is Connor and I will be here to help.',
              trigger: '2'
            },
            {
              id: '2',
              message: 'What is your name?',
              trigger: '3'
            },
            {
              id: '3',
              user: true,
              trigger: '4'
            },
            {
              id: '4',
              message: 'We hope you find your rightful home, {previousValue}!',
              trigger: '5'
            },
            {
              id: '5',
              options: [
                {value: 1, label: 'Tell me a joke', trigger: '6'},
                {value: 2, label: 'Help me shop a home', trigger: '8'}
              ]
            },
            {
              id: '6',
              message: `Q: How do you know if there's a snowman in your bed?`,
              trigger: '7'
            },
            {
              id: '7',
              message: `A: You wake up wet!`,
              trigger: '5'
            },
            {
              id: '8',
              message: 'What kind of home are you looking for?',
              trigger: '9'
            },
            {
              id: '9',
              options: [
                {value: 1, label: 'Single Wide', trigger: '10'},
                {value: 2, label: 'Double Wide', trigger: '11'},
                {value: 3, label: 'Tiny Home', trigger: '12'}
              ]
            },
            {
              id: '10',
              message: 'Click here to see our Single Wide homes',
              end: true
            },
            {
              id: '11',
              message: 'Click here to see our Double Wide homes',
              end: true
            },
            {
              id: '12',
              message: 'Click here to see our Tiny Homes',
              end: true
            }
          ]}
        />
      </ThemeProvider>
    </div>
  )
}

export default Chatbot
