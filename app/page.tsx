"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import VoteButton from './_component/VoteButton';
import { Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { Supabase } from './_component/supabase';

import InputField from './_component/inputField';
import Title2 from './_component/title';

// Extend the Window interface to include webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const Home: NextPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>(["player1", "player2"]);
  const [targetId, setTargetId] = useState<string>("0");
  const [title, setTitle] = useState<boolean>(true);

  const [count1, setCount1]=useState<number>(0);
  const [count2, setCount2]=useState<number>(0);

  // Refs for AudioContext and EffectSource
  const audioContextRef = useRef<AudioContext | null>(null);
  const effectSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext only on the client
    if (typeof window !== 'undefined') {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (AudioContextConstructor) {
        audioContextRef.current = new AudioContextConstructor();
      } else {
        console.error('Web Audio API is not supported in this browser.');
      }
    }

    return () => {
      // Clean up AudioContext on unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const updateBattleData = async (player: number) => {
    const storage = Supabase.from("Battle");
    const { data, error } = await storage.select(`player1Count, player2Count`).eq("id", targetId);
    if (error) {
      return setOpenSnackbar(true);
    }
    if (data) {
      if (player === 1 && data[0]?.player1Count >= 0) {
        soundPlay("/sound/effect.mp3");
        return await storage.update({ player1Count: data[0].player1Count + 1 }).eq('id', targetId).select();
      }
      if (player === 2 && data[0]?.player2Count >= 0) {
        soundPlay("/sound/effect.mp3");
        return await storage.update({ player2Count: data[0].player2Count + 1 }).eq('id', targetId).select();
      }
    }
    return setOpenSnackbar(true);
  };

  const getBattleData = async () => {
    const storage = Supabase.from("Battle");
    const { data, error } = await storage.select(`player1Name, player2Name`).eq("id", targetId);
    if (error) {
      return setOpenSnackbar(true);
    }
    if (data) {
      if (data[0]?.player1Name && data[0]?.player2Name) {
        soundPlay("/sound/effect.mp3");
        return setPlayers([data[0].player1Name, data[0].player2Name]);
      }
    }
    return setOpenSnackbar(true);
  };

  useEffect(() => {
    if (targetId !== "0") {
      getBattleData();
    }
  }, [targetId]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Function to fetch and decode the audio
  const setupEffect = async (soundUrl: string): Promise<AudioBuffer | null> => {
    try {
      const response = await fetch(soundUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const arrayBuffer = await response.arrayBuffer();
      if (audioContextRef.current) {
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        return audioBuffer;
      }
      return null;
    } catch (error) {
      console.error('Error setting up effect:', error);
      return null;
    }
  };

  // Function to play the audio
  const playEffect = (audioBuffer: AudioBuffer) => {
    if (audioContextRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      effectSourceRef.current = source;
    }
  };

  // Function to handle sound playing
  const soundPlay = async (soundUrl: string) => {
    if (audioContextRef.current) {
      const effect = await setupEffect(soundUrl);
      if (effect) {
        playEffect(effect);
      }
    }
  };

  return (
    <div>
      {
        title &&
        <Title2 setTitle={setTitle} />
      }
      {
        !title &&
        <>
          <Head>
            <title>可愛い投票アプリ</title>
            <meta
              name="description"
              content="ベビーピンクとライトブルーのどちらが好きか投票しよう！"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container
            maxWidth="sm"
            className="flex flex-col w-full items-center justify-center min-h-screen bg-pink-50"
          >
            <Box className="w-full p-6 mb-20 space-y-6 bg-white rounded-lg shadow-lg">
              <Typography variant="h4" className="text-center text-pink-500">
                IDを入力してください
              </Typography>

              <InputField
                label="ID"
                placeholder="ここに対戦IDを入力してください"
                value={targetId}
                onChange={(value) => {setTargetId(value);setCount1(0);setCount2(0);}}
              />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              className="text-center text-pink-500"
            >
              かわいかったら、その分だけボタンを押してください❤️
            </Typography>
            <Box className="w-full space-y-20">
              <VoteButton
                color="babyPink"
                label={players[0]+":"+count1}
                onVote={() => {updateBattleData(1);setCount1((prev)=> prev+1);}}
              />
              <VoteButton
                color="lightBlue"
                label={players[1]+":"+count2}
                onVote={() => {updateBattleData(2);setCount2((prev)=> prev+1);}}
              />
            </Box>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                失敗しました！ IDを確認してください！！
              </Alert>
            </Snackbar>
          </Container>
        </>
      }
    </div>
  );
};

export default Home;
