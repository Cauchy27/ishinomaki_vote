"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import VoteButton from './_component/VoteButton';
import { Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { Supabase } from './_component/supabase';

import InputField from './_component/inputField';

const Home: NextPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const [players, setPlayers] = useState<string[]>(["player1","player2"]);
  const [targetId, setTargetId] = useState<string>("0");

  const updateBattleData = async(player:number) => {
    const storage = Supabase.from("Battle");
    const { data, error } = await storage.select(`player1Count, player2Count`).eq("id",targetId);
    if(error){
      return setOpenSnackbar(true);
    }
    if(data){
      if(player==1 && data[0]?.player1Count >=0){
        // soundPlay("/sound/effect.mp3")
        return await storage.update({player1Count:data[0].player1Count+1}).eq('id',targetId).select()
      }
      if(player==2 && data[0]?.player1Count>=0){
        // soundPlay("/sound/effect.mp3")
        return await storage.update({player2Count:data[0].player2Count+1}).eq('id',targetId).select()
      }
    }
    return setOpenSnackbar(true);
  }
  const getBattleData = async() => {
    const storage = Supabase.from("Battle");
    const { data, error } = await storage.select(`player1Name, player2Name`).eq("id",targetId);
    if(error){
      return setOpenSnackbar(true);
    }
    if(data){
      if(data[0]?.player1Name && data[0]?.player2Name){
        // soundPlay("/sound/effect.mp3")
        return setPlayers([data[0].player1Name, data[0].player2Name])
      }
    }
    return setOpenSnackbar(true);
  }

  useEffect(()=>{
    getBattleData();
  },[targetId]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // // 音の再生
  // let ctxp = new AudioContext();
  // let EffectSource

  //  // 音源を取得しAudioBuffer形式に変換して返す関数
  // async function setupEffect(soundUrl:string) {
  //   console.log(soundUrl);
  //   const response = await fetch(soundUrl);

  //   console.log(response);

  //   ctxp = new AudioContext();

  //   const arrayBuffer = await response.arrayBuffer();
  //   // Web Audio APIで使える形式に変換
  //   const audioBuffer = await ctxp.decodeAudioData(arrayBuffer);
  //   return audioBuffer;
  // }

  // function playEffect(ctx:AudioContext, audioBuffer:AudioBuffer) {
  //   EffectSource = ctx.createBufferSource();
  //   // 変換されたバッファーを音源として設定
  //   EffectSource.buffer = audioBuffer;
  //   // 出力につなげる
  //   EffectSource.connect(ctx.destination);
  //   EffectSource.start();
  // }

  // const soundPlay = async(soundUrl:string) =>{
  //   if (typeof window !== 'undefined') {
  //     const effect = await setupEffect(soundUrl);
  //     playEffect(ctxp, effect);
  //   }
  // }

  return (
    <div>
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
        className="flex flex-col items-center justify-center min-h-screen bg-pink-50"
      >
        <Box className="w-full p-6 mb-20 space-y-6 bg-white rounded-lg shadow-lg">
          <Typography variant="h4" className="text-center text-pink-500">
            IDを入力してください
          </Typography>

          <InputField 
            label="ID" 
            placeholder="ここに対戦IDを入力してください" 
            value={targetId}
            onChange={(value) => setTargetId(value)}
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
            label={players[0]}
            onVote={() => updateBattleData(1)}
          />
          <VoteButton
            color="lightBlue"
            label={players[1]}
            onVote={() => updateBattleData(2)}
          />
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            失敗しました！
            IDを確認してください！！
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Home;
