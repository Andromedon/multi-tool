import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const title = 'Worktout Timer';
const rowStyle = {
  marginBottom: '1rem',
  textAlign: 'center' as const,
};

const containerStyle = {
  margin: '1rem 1.5rem 1rem 1.5rem',
};

const buttonStyle = {
  margin: '0.5rem',
};

const defaultNumberOfBreaks: number = 5;
const defaultBreakTime: number = 60;

let wakeLock: any = null;

const WorkoutTimer = () => {
  const [numberOfBreakes, setNumberOfBreaks] = useState(defaultNumberOfBreaks);
  const [brakeTime, setBreakTime] = useState(defaultBreakTime);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [counter, setCounter] = useState(60);

  const handleNumberOfBreaksSub = () => {
    if (numberOfBreakes > 1) {
      setNumberOfBreaks((prevState) => prevState - 1);
    }
  };

  const handleNumberOfBreaksAdd = () => {
    setNumberOfBreaks((prevState) => prevState + 1);
  };

  const handleBreakTimeSub = () => {
    if (brakeTime > 10) {
      setBreakTime((prevState) => prevState - 10);
    }
  };

  const handleBreakTimeAdd = () => {
    setBreakTime((prevState) => prevState + 10);
  };

  const handleWorkoutStart = () => {
    setWorkoutActive(true);
    setCounter(brakeTime);
  };

  const handleBreakStart = () => {
    setNumberOfBreaks((prevState) => prevState - 1);
    if (numberOfBreakes <= 0) {
      setNumberOfBreaks(0);
    }
    setCountdownRunning(true);
  };

  const handleBreakStop = () => {
    setCountdownRunning(false);
    setCounter(brakeTime);
    stopVibration();
    stopAudio();

    if (numberOfBreakes <= 0) {
      setWorkoutFinished(true);
    }
  };

  const handleNewWorkout = () => {
    setWorkoutActive(false);
    setWorkoutFinished(false);
    setNumberOfBreaks(defaultNumberOfBreaks);
    setCounter(brakeTime);
  };

  const BreakButton = () => {
    if (workoutFinished) {
      return (
        <Button
          size='large'
          variant='contained'
          style={buttonStyle}
          onClick={handleNewWorkout}
        >
          New Workout
        </Button>
      );
    } else if (!countdownRunning) {
      return (
        <Button
          size='large'
          color='success'
          variant='contained'
          style={buttonStyle}
          onClick={handleBreakStart}
        >
          Break
        </Button>
      );
    } else {
      return (
        <Button
          size='large'
          color='error'
          variant='contained'
          style={buttonStyle}
          onClick={handleBreakStop}
        >
          Stop
        </Button>
      );
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (counter > 0 && countdownRunning) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      vibrateDevice();
      playAudio();
    } else if (!countdownRunning) {
      clearInterval(intervalId!);
    }

    return () => clearInterval(intervalId);
  }, [counter, countdownRunning]);

  const acquireWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        const anyNav: any = navigator;
        wakeLock = await anyNav.wakeLock.request('screen');
        if (wakeLock !== null) {
          wakeLock.addEventListener('release', function () {
            console.log('Wake Lock was released');
          });
          console.log('Wake Lock acquired');
        }
      } catch (err: any) {
        console.error(`Error acquiring wake lock: ${err.name}, ${err.message}`);
      }
    }
  };

  const vibrateDevice = () => {
    if ('vibrate' in navigator) {
      const loopedPattern = Array(30).fill([500, 200, 500]).flat();
      navigator.vibrate(loopedPattern);
    }
  };

  const stopVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
  };

  const stopAudio = () => {
    const audio = document.getElementById('alarm') as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const playAudio = () => {
    const audio = document.getElementById('alarm') as HTMLAudioElement;
    audio.play();
  };

  useEffect(() => {
    document.title = title;
    acquireWakeLock();
  }, []);

  if (!workoutActive) {
    return (
      <>
        <div className='container-fluid' style={containerStyle}>
          <div className='row' style={rowStyle}>
            <Card sx={{ minWidth: 275, background: '#d4eafd' }}>
              <CardContent>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Number of sets:
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h1' component='h3' sx={{ mb: 1 }}>
                    {numberOfBreakes + 1}
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleNumberOfBreaksSub}
                  >
                    -
                  </Button>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleNumberOfBreaksAdd}
                  >
                    +
                  </Button>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Break time (s):
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h1' component='h3' sx={{ mb: 1 }}>
                    {brakeTime}
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleBreakTimeSub}
                  >
                    -
                  </Button>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleBreakTimeAdd}
                  >
                    +
                  </Button>
                </div>
                <div className='row' style={rowStyle}>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleWorkoutStart}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='container-fluid' style={containerStyle}>
          <audio id='alarm' src='alarm.mp3' />
          <div className='row' style={rowStyle}>
            <Card sx={{ minWidth: 275, background: '#e3f2e3' }}>
              <CardContent>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Sets left:
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h1' component='h3' sx={{ mb: 1 }}>
                    {numberOfBreakes + 1}
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Time (s):
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <Typography variant='h1' component='h3' sx={{ mb: 1 }}>
                    {counter}
                  </Typography>
                </div>
                <div className='row' style={rowStyle}>
                  <BreakButton />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
};

export default WorkoutTimer;
