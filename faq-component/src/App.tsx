import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

type INFO = {
  question: string;
  answer: string;
  showAnswer?: boolean;
};
const staticData = [
  {
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human",
  },
  {
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day",
  },
  {
    question: "How long do cats live",
    answer:
      "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
  },
];

const FaqComponent = ({
  data,
  setData,
}: {
  data: INFO[];
  setData: (val: INFO[]) => void;
}) => {
  console.log({ data });
  const onClick = (index: number) => {
    console.log("inside onclick", index);
    const arr = [...data];
    arr[index].showAnswer = !arr[index].showAnswer;
    setData(arr);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
          style={{
            width: "80%",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            border: "solid 1px black",
            padding: 10,
          }}
        >
          <div>{item.question}</div>
          {item.showAnswer ? <div>{item.answer}</div> : null}
        </div>
      ))}
    </div>
  );
};

const addShowAnswerField = (data: INFO[]) => {
  return data.map((item) => {
    return { ...item, showAnswer: false };
  });
};

function App() {
  const [data, setData] = useState<INFO[]>([]);
  const modifiedData = useMemo(() => addShowAnswerField(staticData), []);
  useEffect(() => {
    setData(modifiedData);
  }, [modifiedData]);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <FaqComponent data={data} setData={setData} />
    </div>
  );
}

export default App;
