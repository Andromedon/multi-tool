import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const title = 'Worktout Timer';
const rowStyle = {
  margin: '0.5rem',
  textAlign: 'center' as const,
};

const buttonStyle = {
  margin: '0.5rem',
};

const iconRowStyle = {
  margin: '0.5rem',
  textAlign: 'center' as const,
  minHeight: '5.5rem',
};

const dogImageStyle = {
  height: '5rem',
  width: 'auto',
  margin: '0 0.5rem',
};

const defaultNumberOfSets: number = 5;
const defaultBreakTime: number = 60;

let wakeLock: any = null;

const WorkoutTimer = () => {
  const [numberOfSets, setNumberOfSets] = useState(defaultNumberOfSets);
  const [brakeTime, setBreakTime] = useState(defaultBreakTime);
  const [numberOfSetsCompleted, setNumberOfSetsCompleted] = useState(0);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [counter, setCounter] = useState(60);

  const getCompletedSetsImages = () => {
    let dogsImages = [];
    for (let i = 0; i < numberOfSetsCompleted; i++) {
      dogsImages.push(<img src='dog.png' alt='woof!' style={dogImageStyle} />);
    }
    return dogsImages;
  };

  const getSetsImages = () => {
    let dogsImages = [];
    for (let i = 0; i < numberOfSets; i++) {
      dogsImages.push(<img src='dog.png' alt='woof!' style={dogImageStyle} />);
    }
    return dogsImages;
  };

  const handleNumberOfSetsSub = () => {
    if (numberOfSets > 1) {
      setNumberOfSets((prevState) => prevState - 1);
    }
  };

  const handleNumberOfSetsAdd = () => {
    setNumberOfSets((prevState) => prevState + 1);
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
    if (numberOfSetsCompleted < numberOfSets - 1) {
      setCountdownRunning(true);
    } else {
      setWorkoutFinished(true);
    }
    setNumberOfSetsCompleted((prevState) => prevState + 1);
  };

  const handleBreakStop = () => {
    setCountdownRunning(false);
    setCounter(brakeTime);
    stopVibration();
    stopAudio();
  };

  const handleNewWorkout = () => {
    setWorkoutActive(false);
    setWorkoutFinished(false);
    setNumberOfSets(defaultNumberOfSets);
    setNumberOfSetsCompleted(0);
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
        <div className='container-fluid'>
          <div className='row' style={rowStyle}>
            <Card sx={{ minWidth: 275, background: '#d4eafd' }}>
              <CardContent>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Number of sets:
                  </Typography>
                </div>
                <div className='row' style={iconRowStyle}>
                  {getSetsImages()}
                </div>
                <div className='row' style={rowStyle}>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleNumberOfSetsSub}
                  >
                    -
                  </Button>
                  <Button
                    size='large'
                    variant='contained'
                    style={buttonStyle}
                    onClick={handleNumberOfSetsAdd}
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
        <div className='container-fluid'>
          <audio id='alarm' src='alarm.mp3' />
          <div className='row' style={rowStyle}>
            <Card sx={{ minWidth: 275, background: '#e3f2e3' }}>
              <CardContent>
                <div className='row' style={rowStyle}>
                  <Typography variant='h5' component='h3' sx={{ mb: 1 }}>
                    Sets completed:
                  </Typography>
                </div>
                <div className='row' style={iconRowStyle}>
                  {getCompletedSetsImages()}
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
