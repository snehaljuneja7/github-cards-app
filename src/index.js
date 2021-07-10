import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function Card(props) {
  //const profile = props.profile;
  return(
    <div className="github-profile">
      <img src={props.avatar_url} alt="GitHub-Avatar" />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  );  
}

function CardList(props) {
  return(
    <div>
      {props.profiles.map(profile => <Card name={profile.name} company={profile.company} avatar_url={profile.avatar_url} />)}
    </div>
  );
}

function Form(props) {
  const [userName, setUserName] = useState('');
  const [err, setErr] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${userName}`);
      props.onSubmit(response.data);
      setUserName('');
      setErr(null);
    } catch(err) {
      setErr(err);
      setUserName('');
    }
  }
  const message = ' Please Make Sure You Enter A Valid Username';
    return(
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="GitHub Username" value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
        <button>Add Card</button>
        <br />
        {err &&(<span className="error"><br/>{message}</span>)}
      </form>
    );
  
}

function App(props) {
  const [profiles, setProfiles] = useState([]);
  function handleSubmit(newProfile) {
    setProfiles(profiles.concat(newProfile));
  };
  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={handleSubmit}/>
      <CardList profiles = {profiles} />
    </div>
  );
}

ReactDOM.render(<App title="The GitHub Cards App" />, document.getElementById('root'));