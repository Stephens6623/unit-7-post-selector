import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
// Display component to show details of a single post
export default function Display(props) {
    const { postId } = props;
    const [post,setPost] = useState(null);
    const [loading,setLoading]= useState(true)
    const [ error, setError ] = useState(null);
// Fetch post details when postId changes
    // If postId is null, reset post and loading state
    useEffect(() => {
        async function fetchPost() {
            if (postId === null) {
                setPost(null);
                setLoading(false);
                return;
            }
            // Fetch post details from API
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPost(data);// Set the fetched post
                setError(null);// Clear any previous error
            } catch (error) {
                setError(error);// Set error if fetch fails
                setPost(null);// Clear post on error
            } finally {
                setLoading(false);// Set loading to false after fetch completes
            }
        }
        fetchPost();
    }, [postId]);// Run effect when postId changes

  return (
    <div className="post-display">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {post && (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        )}
        {!post && !loading && !error && (
            <p>Select a post to view its content</p>
        )}
    </div>
  )
}

