import React, {useContext, useState} from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup
} from 'react-bootstrap'
import { ProductContext } from '../../contexts/ProductContext'

const SearchBar = () => {
    const {
        filterProducts,
        getProducts
    } = useContext(ProductContext)
    
    const [query, setQuery] = useState("");
    const onChange = (event) => {
        setQuery(event.target.value)
        if(event.target.value.length !== 0) filterProducts(event.target.value)
        else getProducts()
    }
    return (    
        <>
            <Row className='justify-content-center mt-4'>
                <Col sm={4}>
                    <FormGroup>
                        <Form.Control 
                            type="text"
                            placeholder='Search here...'
                            name='query'
                            value={query}
                            onChange={onChange}
                            />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default SearchBar
