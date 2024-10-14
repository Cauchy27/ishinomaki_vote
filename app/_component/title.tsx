"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';

const Title2 = ({ setTitle }) => {

  // 背景グラデーションスタイル
  const backgroundStyle = {
    height: '100vh', // 全画面をカバー
    background: 'linear-gradient(135deg, #ffccf9 0%, #b3e5fc 100%)', // 淡いピンク(#ffccf9)からライトブルー(#b3e5fc)のグラデーション
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex', // コンテンツを中央に配置
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // ボタンとテキストを縦に配置
  };

  // 色切り替え
  const [color, setColor] = useState('#ff00ff');
  const toggleColor = () => {
    setColor(prevColor => (prevColor === '#ff00ff' ? '#ff69b4' : '#ff00ff'));
  };

  // 背景色切り替え用のstate
  // const [bgColor, setBgColor] = useState('');

  // useEffect(() => {
  //   document.body.style.background = bgColor;
  //   return () => {
  //     document.body.style.backgroundColor = '';
  //   };
  // }, [bgColor]);

  // テキストスタイル
  const textStyle = {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '4em',
    fontFamily: '"Comic Sans MS", cursive, sans-serif', // 可愛らしいフォントに変更
    color: 'darkblue',
    textShadow: '2px 2px 5px lightpink', // 影をつけてポップな印象に
  };

  // ボタンスタイル
  const buttonStyle = {
    backgroundColor: color,
    color: 'white',
    padding: '20px 50px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.5em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // ホバーエフェクトのためにトランジションを追加
  };

  // ボタンホバー時のエフェクト
  // const buttonHoverStyle = {
  //   ...buttonStyle,
  //   transform: 'scale(1.1)', // ホバー時に少し拡大
  // };

  return (
    <>
      <div style={backgroundStyle}>
        <div>
          <p style={textStyle}>
            かわいい投票❤️
          </p>
        </div>
        <button
          onClick={() => { toggleColor(); setTitle(); }}
          style={buttonStyle}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          スタート
        </button>
      </div>
    </>
  );
};

export default Title2;
