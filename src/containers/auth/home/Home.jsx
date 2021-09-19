import React from 'react';
import { useAppState } from '../../../context';

import ProfilePopover from '../../../components/Popover';
import CreateChannel from '../../../components/Modals';
import './style.scss'

const Home = () => {
  const state = useAppState();

  return (
    <>
    <header className="header">
      <div className="header-content">
        <CreateChannel />
        <ProfilePopover user={state.get("user")} />
      </div>
    </header>
    <h2 className="text-center">Welcome to awesome chat</h2>
    </>
  )
}

export default Home;
