import React from 'react'
import { Alert, Button, Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import Layout from '../components/Layout'
import RestaurantList from '../components/RestaurantList'

const Index = () => {
    const [query, setQuery] = React.useState()

    const handleChange = e => {
        const value = e.target.value.toLowerCase()
        setQuery(value)
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col>
                    <div className='search'>
                        <InputGroup>
                            <InputGroupAddon addonType='append'>Search</InputGroupAddon>
                            <Input onChange={handleChange} />
                        </InputGroup>

                        <RestaurantList search={query} />
                    </div>
                </Col>
            </Row>

            <style jsx>
                {`
                    .search {
                        margin: 20px;
                        width: 500px;
                    }
                `}
            </style>
        </div>
    )
}
export default Index
