import React, { useState } from 'react';
import './App.css';

interface Problem {
  binStr: string;
  num: number;
  point: number;
}

interface ProblemSet {
  level: number;
  numOfQ: number;
  lenOfQ: number;
  timeLimit: number;  
}

// 2進数でlen桁になる10進数の数字をランダムで取得
function getRandomNbitNumber(len: number) {
  // prob_len桁での最大値 -> pow(2, prob_len-1)
  return Math.floor(Math.random()*Math.pow(2,len-1));
}

// 10進数->2進数
function getBinaryStr(num: number){
  return num.toString(2);
}

function problemGenerater(prob_len: number) {
  if(prob_len<=0) return{num:-1, binStr:"", point:-1};
  let num_10 :number = getRandomNbitNumber(prob_len);
  let bin_str:string = getBinaryStr(num_10);
  return {num: num_10, binStr:bin_str, point:prob_len};
}

function App() {
  const [probSet, setProblemSet] = useState<ProblemSet>({level:1, numOfQ:10, lenOfQ:8, timeLimit:60});
  const [inputValue, setInputValue] = useState<string>('');
  const [problem, setProblem] = useState(problemGenerater(probSet.numOfQ));
  const [nowScore, setNowScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [incorrectCounter, setIncorrectCounter] = useState<number>(0);

  // 入力
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(problem.num.toString()===inputValue){
      // alert("Correct!");
      setMessage('Correct!');
      setNowScore(nowScore+problem.point);
      setProblem(problemGenerater(probSet.numOfQ)); // 問題を再設定
      setIncorrectCounter(0);
    }else{
      // alert(`Incorrect\nCorrect answer:${problem.num}`);
      setIncorrectCounter(incorrectCounter+1);
      setMessage((incorrectCounter<2)?`Incorrect!`:`Incorrect!\nAnswer=${problem.num}`);
    }
    setInputValue(''); // フォームの値をクリアする
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>フラッシュ2進数</h1>
        <h2> Score: {nowScore} </h2>
      </header>
      <body className="Game">
        <h3 className="Problem-display">{problem.binStr}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>

        <h2 className="Messages">{message}</h2>

      </body>

    </div>
  );
}

export default App;
