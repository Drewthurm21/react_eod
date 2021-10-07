import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsThunk, deleteCommentThunk, createNewCommentThunk } from './store/comments.js'

import './App.css';

const pageWrapper = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'
}

const commentStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '30px'
}

const sidebarStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '1px solid black',
  minWidth: '500px'
}

const h1Style = {
  position: 'sticky',
  color: 'rgb(255, 0, 179)',
  textShadow: `-20px -22px 1px black, 
              10px 10px 1px rgb(0, 255, 34),
             -10px -12px 1px rgb(0, 255, 34),
             -30px -30px 1px rgb(255, 238, 0, 0.3)`
}

function App() {
  const dispatch = useDispatch()

  const comments = useSelector(store => store.comments)
  const [commentText, setCommentText] = useState('')

  const handleDelete = (id) => {
    dispatch(deleteCommentThunk(id))
  }

  const postComment = (e) => {
    e.preventDefault()
    let comment = {
      'user_name': 'Drew_T',
      'body': commentText,
    }
    dispatch(createNewCommentThunk(comment))
  }

  useEffect(() => {
    dispatch(getCommentsThunk())
  }, [dispatch])

  const commentsSection = Object.values(comments)?.map(comment => (
    <div key={comment.id} className='single-comment'>
      <div>{comment.user_name}</div>
      <div>{comment.id}</div>
      <button className='delete-Button' onClick={() => handleDelete(comment.id)}>Delete Me</button>
      <div>{comment.body}</div>
    </div>
  ))

  return (
    <div style={pageWrapper}>
      <div style={sidebarStyles}>
        <form onSubmit={postComment}>
          <div>
            <label>Comment</label>
            <textArea
              style={{ 'minHeight': '800px' }} value={commentText}
              onChange={(e) => setCommentText(e.target.value)} />
            <button style={{ 'marginTop': '20px', 'height': '40px' }}>Add Comment</button>
          </div>
        </form>
      </div>
      <div style={commentStyles}>
        <h1 style={h1Style}>TOMMENTS</h1>
        <div className="App">
          {commentsSection}
        </div>
      </div>
    </div>
  );
}

export default App;
