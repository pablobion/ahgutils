import React from 'react';
import './styles.scss'
function About() {


  const people = [
    {
      name: 'Erick',
      image: "https://lh3.googleusercontent.com/a-/AD_cMMQacZmvGO9DwhXWipd-SR5m0rYO791Ir2oyZ2UjyTQ5gQ=s88-w88-h88-c-k-no"
    },
    {
      name: 'Pablo',
      image: "https://lh3.googleusercontent.com/a/AAcHTte94ZE2k3X-y80P99q82zBy0kcPqQznGWn5ZK1Cdj92VKI=s88-w88-h88-c-k-no"
    }
  ]

  return (
    <div id="container">
      <div id='modal'>
      <h1 className='teste'>Colaboradores do projeto</h1>
        {people.map((person, index) => (
          <div className='divPerson'>
            <img src={person.image}></img>
            <h2>{person.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
