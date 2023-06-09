import { ReactMic } from "@cleandersonlobo/react-mic";
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";

import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const useStyles = makeStyles((theme) => {
  return {
    callContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    callDisappear: {
      position: "fixed",
      zIndex: 5,
      top: "-100rem",
      width: "0rem",
      height: "80px",
      borderRadius: "10rem",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0rem 3rem",
      transition: "all ease-in-out 1.2s",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        height: "80px",
      },
    },
    callAppear: {
      position: "fixed",
      zIndex: 5,
      top: "5rem",
      margin: "0 auto",
      width: "50rem",
      height: "80px",
      borderRadius: "10rem",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0rem 3rem",
      transition: "all ease-in-out 1.2s",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        height: "80px",
      },
    },
    callInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    oneCenterCallStatus: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      // gap: "1rem",
    },
    callDot: {
      height: "1rem",
      width: "1rem",
      borderRadius: "50%",
      // backgroundColor: "orange",
      animationName: "my-animation",
      animationDuration: "1s",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    },

    callConnectDisconnect: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255, .1)",
      transition: "all ease-in-out .5s",
      "&:hover": {
        backgroundColor: "rgba(255,255,255, .15)",
        scale: "1.1",
        transition: "all ease-in-out .5s",
      },
    },
    callConnectDisconnectAppear: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255, .1)",
    },
    form: {
      marginTop: "10rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "3rem",
      },
    },
    textInput: {
      width: "50rem",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 0.4,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 0.8,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 1,
        },
      },
    },
    icon: {
      width: "2rem",
    },
    button: {
      width: "50rem",
      padding: "18.5px 14px",
      fontSize: "1.6rem",
      display: "flex",
      justifyContent: "space-around",
      transition: "all ease-in-out .5s",
      color: theme.palette.primary.main,
      borderColor: theme.palette.secondary.light,
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        padding: "14px",
      },
    },
  };
});
function Waitlist(props) {
  Aos.init();
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [callComponent, setCallComponent] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [record, setRecord] = useState(false);
  const [valid, setValid] = useState(true);
  const allowedReviewTime = 30000;
  const [dotColor, setDotColor] = useState("orange");

  useEffect(() => {
    setRecordedAudio(recordedAudio);
  }, [recordedAudio]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const startRecording = () => {
    setDotColor("green");
    setRecord(true);
    setRecordedAudio(null);
    // const MIN_DECIBELS = -45;
    // const SILENCE_DURATION = 2000;
    // let audioContext;
    // let mediaStream;
    // let scriptProcessorNode;
    // let silenceDetected = false;
    // let silenceTimer = null;

    // const activateMicrophone = () => {
    //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //     mediaStream = stream;
    //     audioContext = new (window.AudioContext || window.webkitAudioContext)();
    //     scriptProcessorNode = audioContext.createScriptProcessor(4096, 1, 1);

    //     const microphoneSource = audioContext.createMediaStreamSource(stream);
    //     const analyser = audioContext.createAnalyser();
    //     analyser.minDecibels = MIN_DECIBELS;

    //     microphoneSource.connect(analyser);
    //     analyser.connect(scriptProcessorNode);
    //     scriptProcessorNode.connect(audioContext.destination);

    //     scriptProcessorNode.addEventListener("audioprocess", detectSound);
    //   });
    // };

    // const detectSound = (event) => {
    //   const inputData = event.inputBuffer.getChannelData(0);
    //   const isSoundDetected = inputData.some((value) => Math.abs(value) > 0.01);

    //   if (isSoundDetected) {
    //     clearTimeout(silenceTimer);
    //     silenceDetected = false;
    //     console.log("Sound detected");
    //   } else if (!silenceDetected) {
    //     silenceDetected = true;
    //     silenceTimer = setTimeout(() => {
    //       stopRecording();
    //       console.log("Silence detected for more than 2 seconds");
    //       mediaStream.getTracks().forEach((track) => track.stop());
    //       console.log("Microphone deactivated");
    //     }, SILENCE_DURATION);
    //   }
    // };

    // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //   mediaStream = stream;
    //   mediaStream.oninactive = () => {
    //     clearTimeout(silenceTimer);
    //   };

    //   activateMicrophone();

    //   const audioChunks = [];
    //   const mediaRecorder = new MediaRecorder(stream);
    //   mediaRecorder.start();

    //   mediaRecorder.addEventListener("dataavailable", (event) => {
    //     audioChunks.push(event.data);
    //   });

    //   mediaRecorder.addEventListener("stop", () => {
    //     clearTimeout(silenceTimer);
    //     const audioBlob = new Blob(audioChunks);
    //     const audioUrl = URL.createObjectURL(audioBlob);
    //     const audio = new Audio(audioUrl);
    //     audio.play();
    //   });
    // });
  };

  const stopRecording = () => {
    setDotColor("red");
    setRecord(false);
    console.log("stopped");
  };
  const onStop = (recordedBlob) => {
    const blob = new Blob([recordedBlob.blob], {
      type: recordedBlob.blob.type,
    });
    setRecordedAudio(blob);
  };

  useEffect(() => {
    if (recordedAudio) {
      console.log("here");
      const formData = new FormData();
      console.log(recordedAudio);
      console.log(recordedAudio instanceof Blob);
      let revId = localStorage.getItem("ID");
      console.log("filename:" + revId + ".mp3");
      formData.append("speech", recordedAudio, revId + ".mp3");

      setDotColor("red");

      fetch(`${process.env.REACT_APP_API_URL}/review/${revId}`, {
        method: "PATCH",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          console.log("here too");
          response.arrayBuffer().then((buffer) => {
            context.decodeAudioData(buffer, (decodedData) => {
              const source = context.createBufferSource();
              source.buffer = decodedData;
              source.connect(context.destination);
              source.start();
              setDotColor("orange");
              source.addEventListener("ended", () => {
                setCallComponent(false);
              });
            });
          });
        }
      });
      const context = new AudioContext();
    }
  }, [recordedAudio]);
  function handleJoinWaitList() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setValid(isValid);


    if (valid) {
      setValid(true);
      const context = new AudioContext();

      let ringer = new Audio("./Audio/ringer.mp3");
      ringer.loop = true;
      ringer.play();
      setCallComponent(true);
      fetch(`${process.env.REACT_APP_API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, company: companyName }),
      })
        .then((response) => {
          const contentType = response.headers.get("Content-Type");
          console.log("Content-Type:", contentType);
          ringer.pause();
          ringer.currentTime = 0;
          if (response.ok) {
            const headers = new Headers(response.headers);
            const id = headers.get("Review-Id");
            console.log(id);
            localStorage.setItem("ID", id);
            response.arrayBuffer().then((buffer) => {
              context.decodeAudioData(buffer, (decodedData) => {
                const source = context.createBufferSource();
                source.buffer = decodedData;
                source.connect(context.destination);
                source.start();
                setDotColor("orange");
                if (id) {
                  source.addEventListener("ended", () => {
                    startRecording();
                    setTimeout(stopRecording, allowedReviewTime);
                  });
                } else {
                  setCallComponent(false);
                  console.log("invalid email");
                }
              });
            });
          } else {
            console.error("Error:", response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setValid(false);
    }
  }
  const renderer = ({ minutes, seconds }) => {
    // Pad the minutes and seconds with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return (
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  };

  return (
    <div>
      <div>
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          // mimeType="audio/mp3"
        />
      </div>
      <div className={classes.callContainer}>
        <div
          className={callComponent ? classes.callAppear : classes.callDisappear}
        >
          <div className={classes.callInfo}>
            <div
              className={classes.callDot}
              style={{ backgroundColor: dotColor }}
            ></div>
            <div className={classes.timer}>
              <Typography
                variant="body2"
                style={{ opacity: 0.5, fontWeight: 600 }}
              >
                {dotColor == "green" ? (
                  <Countdown date={Date.now() + 30000} renderer={renderer} />
                ) : (
                  "--:--"
                )}
              </Typography>
            </div>
          </div>
          <div className={classes.oneCenterCallStatus}>
            <Typography variant="body1">OneCenter</Typography>
            <Typography
              variant="body2"
              style={{ opacity: 1, color: "green", fontWeight: 600 }}
            >
              Connected
            </Typography>
          </div>
          <div
            className={classes.callConnectDisconnect}
            onClick={() => {
              setCallComponent(false);
            }}
          >
            <img src="./Icons/telephone.png" alt="" width="30rem" />
          </div>
        </div>
      </div>
      <Container
        classes={classes.waitList}
        id="waitList"
        // data-aos="fade-zoom-up"
        // data-aos-easing="ease-in-back"
        // data-aos-delay="500"
        // data-aos-offset="0"
      >
        <Typography variant="h4" className="waitlistH4">
          Join the OneCenter waitlist now for exclusive access to our beta
          release.
        </Typography>
        <Typography variant="body1" style={{ color: "white", opacity: 0.5 }}>
          Be among the first to experience our revolutionary new platform and
          transform the way you manage your business{" "}
        </Typography>
        {!valid && (
          <Alert
            severity="error"
            variant="outlined"
            // color="info"
            style={{
              fontSize: "1.2rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2rem",
              width: "50rem",
              margin: "auto",
            }}
          >
            <AlertTitle style={{ textAlign: "left ", fontSize: "1.5rem  " }}>
              Invalid Email Address
            </AlertTitle>
            Please make sure your email address is valid
          </Alert>
        )}

        <form
          className={classes.form}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
          data-aos-offset="0"
        >
          <TextField
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/person.png" className={classes.icon} />
                Name
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            type={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/mail.png" className={classes.icon} />
                Mail
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/mail.png" className={classes.icon} />
                Company to Review
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Button
            variant="outlined"
            className={classes.button}
            startIcon
            onClick={handleJoinWaitList}
            disabled={email || name != "" ? false : true}
            endIcon={<img src="./Icons/hourglass.png" width="25rem" />}
          >
            JOIN THE WAITLIST
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Waitlist;
