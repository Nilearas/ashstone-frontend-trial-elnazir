import React from 'react';
import Navbar from './components/Layout/Navbar';
import PostList from './components/Posts/PostList';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <PostList />
      </main>
    </>
  );
}
