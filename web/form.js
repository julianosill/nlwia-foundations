import { server } from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#summary-content')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  content.classList.add('placeholder')
  const videoURL = input.value
  if (!videoURL.includes('shorts')) {
    return (content.textContent =
      'This video is not a Shorts. Please, choose a Youtube Shorts video.')
  }
  const [_, params] = videoURL.split('/shorts/')
  const [videoID] = params.split('?si')

  content.textContent = 'Getting text from audio...'

  const transcription = await server.get(`/summary/${videoID}`)

  content.textContent = 'Generating a summary...'

  const summary = await server.post('/summary', {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove('placeholder')
})
