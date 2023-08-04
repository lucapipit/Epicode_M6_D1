import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, clearCategories } from '../states/postStates';
import { getPostByIdFunc } from "../states/postStates";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/esm/Button';

const EditPostModal = ({ id }) => {

    //redux
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.posts.categories);
    const singlePost = useSelector((state) => state.posts.singlePost);


    const [file, setFile] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const img = singlePost.img;
    const title = singlePost.title;
    const subtitle = singlePost.subtitle;
    const text = singlePost.text;
    const author = singlePost.title;



    const submitForm = async (e) => {
        e.preventDefault();
        console.log(title.current.value, subtitle.current.value, text.current.value, author.current.value, file);
        try {
            const uploadedFile = await uploadFile(file);

            const myPayload = {
                title: title.current.value,
                subtitle: subtitle.current.value,
                author: author.current.value,
                img: uploadedFile.img,
                text: text.current.value,
                tags: categories
            };
            const response = await fetch(`${process.env.REACT_APP_SERVERBASE_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("loginData")
                },
                body: JSON.stringify(myPayload)
            });
            return await response.json()

        } catch (error) {
            console.log("la POST non è andata a buon fine");
        }

    };

    return (
        <div className='d-flex justify-content-center'>
            <div className='myEditModal position-fixed p-4 bg-light rounded-2'>

                <form encType='multipart/form-data'>
                    <div className='mainImage'>
                        <img className='mb-3 me-3 rounded-2 img-fluid' src={`${process.env.REACT_APP_SERVERBASE_URL}/uploads/${img}`} alt="img" />
                        <input className='mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />{/* accept, required */}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
                        <Form.Control value={title}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Subtitle</InputGroup.Text>
                        <Form.Control value={subtitle}/>
                    </InputGroup>
                    <div className='d-flex align-items-center mb-3'>
                        <DropdownButton align="start" title="Category" id="dropdown-menu-align-end" variant="info">
                            <Dropdown.Item eventKey="1" onClick={() => dispatch(addCategory("cardiology"))}><i class="bi bi-activity"></i>Cardiology</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={() => dispatch(addCategory("immunology"))}><i class="bi bi-shield-fill-exclamation"></i>Immunology</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={() => dispatch(addCategory("pediatrics"))}><i class="bi bi-bandaid-fill"></i>Pediatrics</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={() => dispatch(addCategory("radiology"))}><i class="bi bi-radioactive"></i>Radiology</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="5" onClick={() => dispatch(addCategory("biotechnology"))}><i class="bi bi-fingerprint"></i>Biotechnology</Dropdown.Item>
                        </DropdownButton>
                        <div className='d-flex ms-3'>
                            {categories.map((el) => {
                                switch (el) {
                                    case "cardiology": return <i class="bi bi-activity"></i>;
                                    case "immunology": return <i class="bi bi-shield-fill-exclamation"></i>;
                                    case "pediatrics": return <i class="bi bi-bandaid-fill"></i>;
                                    case "radiology": return <i class="bi bi-radioactive"></i>;
                                    case "biotechnology": return <i class="bi bi-fingerprint"></i>;
                                }
                            })}
                            {
                                categories.length > 0 ? <i class="bi bi-x-circle text-danger" onClick={() => dispatch(clearCategories())}> clear</i> : null
                            }
                        </div>
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Text</InputGroup.Text>
                        <Form.Control as="textarea" rows={20} value={text} />
                    </InputGroup>
                    <div className=' d-flex justify-content-center'>
                        {isSending ?
                            <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading... </Button>
                            : <Button onClick={(e) => { submitForm(e); resetForm() }}><i class="bi bi-check-circle-fill me-2"></i>Update</Button>}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EditPostModal