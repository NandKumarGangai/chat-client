import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Chat from './components/Chatting/Chat';
import Join from './components/Chatting/Join';
import Gallary from './components/PhotoGallary';
import PlanningPoker from './components/PlanningPoker';
import LandingPage from './components/LandingPage';
import VideoChat from './components/VideoChat';

const App = () => (
  <Router>
    <Route path='/' exact component={LandingPage} ></Route>
    <Route path='/gallary' exact component={Gallary}></Route>
    <Route path='/join' component={Join}></Route>
    <Route path='/chat' component={Chat}></Route>
    <Route path='/planningpoker' exact component={PlanningPoker}></Route>
    <Route path='/video' exact component={VideoChat}></Route>
  </Router>
)

export default App;