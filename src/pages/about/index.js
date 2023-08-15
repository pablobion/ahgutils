import React from 'react';
import Image from 'next/image'
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
              <Image
                src={`/assets/person/${person.image}`}
                width={80}
                height={80}
                onClick={() => router.push('/')}
                style={{ cursor: 'pointer' }}
              />
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
