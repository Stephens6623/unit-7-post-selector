import { useState } from "react"
import React  from 'react'
import { useEffect } from "react"
// List component to display a list of posts
// Clicking a post sets the postId in the parent component
export default function List(props) {
    const { setPostId } = props; 
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
// Fetch all posts when component mounts
    // If fetch fails, set error state
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setPosts(data)// Set the fetched posts
            } catch (error) {
                setError(error)// Set error if fetch fails
            } finally {
                setLoading(false)// Set loading to false after fetch completes
            }
        }
        fetchPosts()
    }, [])

  return (
    <div className="post-list">
        <h2>Posts</h2>
        <ul>
            {posts.map(post => (
                <li onClick={() => setPostId(post.id)} key={post.id}>
                    {post.title}
                </li>
            ))}
        </ul>
    </div>
  )
}
