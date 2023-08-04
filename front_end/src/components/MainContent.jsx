import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthorsFunc, setCurrentPage } from "../states/authorState";
import { getAllPostsFunc } from '../states/postStates';
import AuthorCard from './AuthorCard';
import Pagination from 'react-bootstrap/Pagination';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';


const MainContent = () => {

    //pagination hooks
    const currentPage = useSelector((state) => state.authors.currentPage);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState(null);

    const dispatch = useDispatch();
    const allAuthors = useSelector((state) => state.authors.allAuthors);
    const allPosts = useSelector((state) => state.posts.allPosts)

    const pagination = () => {
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => {
                    setActive(number);
                    dispatch(setCurrentPage(number));
                    dispatch(getAllAuthorsFunc(currentPage))
                }}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPages(items);
    }

    useEffect(() => {
        dispatch(getAllAuthorsFunc());
        dispatch(getAllPostsFunc());
        pagination()
    }, [active])

    return (
        <div className='container' style={{ minHeight: "80vh" }}>
            <h2 className='mt-4 ps-1 myTitles'>Medical News</h2>
            <Link className='myLink' to="AddPost">
                <i class="bi bi-plus-lg me-2"> Add Post</i>
            </Link>
            <div className='row mt-3 justify-content-center'>
                {
                    allPosts && allPosts.map((el) => {
                        return <PostCard
                            key={nanoid()}
                            id={el._id}
                            title={el.title}
                            img={el.img}
                            category={el.tags}
                            subtitle={el.subtitle}
                            text={el.text}
                            authorAvatar={el.author.avatar}
                            authorImg={el.author.authorImg}
                        />
                    })
                }
            </div>
            <hr />
            {
                allAuthors && allAuthors.map((el) => {
                    return <AuthorCard
                        key={nanoid()}
                        avatar={el.avatar}
                        authorImg={el.authorImg}
                        email={el.email}
                        name={el.name}
                        surname={el.surname}
                        dateOfBirth={el.dob}
                    />
                })
            }
            <div className='d-flex justify-content-center mt-3'>
                <Pagination className='shadow-sm'>{pages}</Pagination>
            </div>
        </div>
    )
}

export default MainContent