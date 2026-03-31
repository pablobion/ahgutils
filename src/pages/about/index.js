import React from 'react';
import './styles.scss'
function About() {


  const people = [
    {
      name: 'Erick Henrique',
      image: "erick.jpg"
    },
    {
      name: 'Andrey Costa',
      image: 'andrey.jpg'
    },
    {
      name: 'Pablo Bion',
      image: "pablo.jpg"
    },
  ]

  return (
    <div id="container">
         <div onClick={() => window.open('https://4generate.com/pt?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
      <div id='modalPerson'>
        <div>
         <h1 className='teste'>Colaboradores do projeto</h1>
          {people.map((person, index) => (
            <div className='divPerson'>
              <img src={`./assets/person/${person.image}`}></img>
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
