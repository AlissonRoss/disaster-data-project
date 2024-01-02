import React, { useState, useEffect } from 'react';


const ThesaurusComponent = () => {
  const [word, setWord] = useState('');
  const [outputWords, setOutputWords] = useState([]);
  
  const WordComponent = ({ word }) => {
    useEffect(() => {
      getWords(word);
      return () => {};
    }, [word]);

    const getWords = async (word) => {
      try {
        const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const data = await res.json();
        setOutputWords(data);
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <div>
        <div className='Search'>
            <label>Buscar Sinónimo</label>
            <input value={word} onChange={(e) => setWord(e.target.value)}/>
        </div>
        <div className='Words'>
            <p>{word}</p>
            {outputWords.map((word, index) => (
                <h4 key={index}>
                    {word.word}
                </h4>
            ))}
            <WordComponent word={word} />
            
      </div>
      <footer>Made by Alisson Ross for Module 4 Cohort 236</footer>
    </div>
  );
};

export default ThesaurusComponent;