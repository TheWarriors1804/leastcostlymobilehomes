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
                {value: 2, label: 'Help me shop a home', trigger: '14'}
              ]
            },
            {
              id: '6',
              message: `Knock Knock`,
              trigger: '7'
            },
            {
              id: '7',
              options: [{value: 1, label: `Who's there?`, trigger: '8'}]
            },
            {
              id: '8',
              message: 'You know',
              trigger: '9'
            },
            {
              id: '9',
              options: [{value: 1, label: `You know who?`, trigger: 10}]
            },
            {
              id: '10',
              message:
                'I know the best source for the least costly mobile homes, direct!',
              trigger: '11'
            },
            {
              id: '11',
              message: 'Do you want me to introduce you to them?',
              trigger: '12'
            },
            {
              id: '12',
              options: [
                {value: 1, label: 'Yes, please!', trigger: '13'},
                {value: 2, label: 'No, thanks.', trigger: '19'}
              ]
            },
            {
              id: '13',
              message: `You're right where you should be!`,
              trigger: '14'
            },
            {
              id: '14',
              message: 'What kind of home are you looking for?',
              trigger: '15'
            },
            {
              id: '15',
              options: [
                {value: 1, label: 'Single Wide', trigger: '16'},
                {value: 2, label: 'Double Wide', trigger: '17'},
                {value: 3, label: 'Tiny Home', trigger: '18'}
              ]
            },
            {
              id: '16',
              message: 'Click here to see our Single Wide homes',
              end: true
            },
            {
              id: '17',
              message: 'Click here to see our Double Wide homes',
              end: true
            },
            {
              id: '18',
              message: 'Click here to see our Tiny Homes',
              end: true
            },
            {
              id: '19',
              message:
                'Thanks for visiting Least Costly Mobile Homes Direct, have a good day!',
              end: true
            }
          ]}
        />
      </ThemeProvider>
    </div>
  )
}

export default Chatbot
