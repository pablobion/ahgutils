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
      image: 'nophoto.jpg'
    },
    {
      name: 'Pablo Bion',
      image: "pablo.jpg"
    },
  ]

  return (
    <div id="container">
      <div id='modalPerson'>
        <div>
         <h1 className='teste'>Colaboradores do projeto</h1>
          {people.map((person, index) => (
            <div className='divPerson'>
              <img
                src={`./${person.image}`}
              ></img>
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
