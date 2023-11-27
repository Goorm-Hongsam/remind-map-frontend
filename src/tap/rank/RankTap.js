import React, { useState } from 'react';

const RankTap = () => {
  const [studyData, setStudyData] = useState(null);

  const handleClick3 = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        return response.json();
      })
      .then(json => {
        setStudyData(json);
      })
      .catch(error => {
        console.log(`Something Wrong: ${error}`);
      });
  };
  console.log(studyData);

  return (
    <div>
      <button onClick={handleClick3}> study 데이터 가져오기</button>
      {studyData && (
        <ul>
          {studyData.map(data => (
            <p>
              {data.id} , {data.userId}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RankTap;
