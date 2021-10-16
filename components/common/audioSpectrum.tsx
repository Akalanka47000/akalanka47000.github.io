import { useEffect } from 'react'
import AudioSpectrum from 'react-audio-spectrum'


const Spectrum = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      eventFire(document.getElementById('dummyBtn'), 'click')
    }, 4000)
  }, [])

  function eventFire(el:any, etype:any) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype)
    } else {
      var evObj = document.createEvent('Events')
      evObj.initEvent(etype, true, false)
      el.dispatchEvent(evObj)
    }
  }

  const playAudio = () => {
    const audio = document.getElementById('audio-element') as HTMLAudioElement
    audio.muted = true
    audio
      .play()
      .then(
        () => {
          audio.muted = false
          audio.volume = 0.05
        },
        () => {
          console.log('promise rejected')
        }
      )
      .catch(() => {
        console.log('autoplay disabled in chrome')
      })
  }

  return (
    <div>
      <iframe src="/portfolio/audio/silence.mp3" allow="autoplay" id="audio" className="hidden"></iframe>
      <div
        className="absolute w-screen bottom-0 left-0 flex justify-center opacity-80"
        id="spectrum-container"
      >
        <button id="dummyBtn" onClick={playAudio}>
          <audio
            id="audio-element"
            src="/portfolio/audio/music.mp3"
            autoPlay={false}
            muted
            loop
          ></audio>
        </button>
        <AudioSpectrum
          id="audio-canvas"
          height={150}
          width={
            process.browser
              ? document.getElementById('spectrum-container')?.clientWidth
              : 1920
          }
          audioId={'audio-element'}
          capColor={'#ff4000'}
          capHeight={6}
          meterWidth={3}
          meterCount={1000}
          meterColor={[
            { stop: 0, color: '#ffffff' },
            { stop: 0.5, color: '#000000' },
            { stop: 1, color: '#ffffff' },
          ]}
          gap={8}
        />
      </div>
    </div>
  )
}

export default Spectrum
