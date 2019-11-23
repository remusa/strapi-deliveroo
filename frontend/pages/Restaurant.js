import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import {
    Button,
    Card,
    CardBody,
    CardColumns,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Row,
} from 'reactstrap'
import { withContext } from '../components/Context/AppProvider.js'
import Cart from '../components/Cart'
import defaultPage from '../hocs/defaultPage'

const RESTAURANT_DISHES_QUERY = gql`
    query restaurant($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                _id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }
`

class Restaurants extends React.Component {
    constructor(props) {
        super(props)
    }

    const = addItem(item) => {
        this.props.context.addItem(item)
    }

    render() {
        const {
            data: { loading, error, restaurant },
            router,
            context,
            isAuthenticated,
        } = this.props
        if (error) return 'Error Loading Dishes'

        if (restaurant) {
            return (
                <>
                    <h1>{restaurant.name}</h1>
                    <Row>
                        <Col xs='9' style={{ padding: 0 }}>
                            <div style={{ display: 'inline-block' }} className='h-100'>
                                {restaurant.dishes.map(res => (
                                    <Card style={{ width: '30%', margin: '0 10px' }} key={res._id}>
                                        <CardImg
                                            top
                                            style={{ height: 250 }}
                                            src={`http://localhost:1337${res.image.url}`}
                                        />
                                        <CardBody>
                                            <CardTitle>{res.name}</CardTitle>
                                            <CardText>{res.description}</CardText>
                                        </CardBody>
                                        <div className='card-footer'>
                                            <Button
                                                onClick={this.addItem}
                                                outline
                                                color='primary'
                                            >
                                                + Add To Cart
                                            </Button>

                                            <style jsx>
                                                {`
                                                    a {
                                                        color: white;
                                                    }
                                                    a:link {
                                                        text-decoration: none;
                                                        color: white;
                                                    }
                                                    .container-fluid {
                                                        margin-bottom: 30px;
                                                    }
                                                    .btn-outline-primary {
                                                        color: #007bff !important;
                                                    }
                                                    a:hover {
                                                        color: white !important;
                                                    }
                                                `}
                                            </style>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Col>

                        <Col xs='3' style={{ padding: 0 }}>
                            <div>
                                <Cart isAuthenticated={isAuthenticated} />
                            </div>
                        </Col>
                    </Row>
                </>
            )
        }
        return <h1>Loading</h1>
    }
}

export default compose(
    withRouter,
    // defaultPage,
    withContext,
    graphql(RESTAURANT_DISHES_QUERY, {
        options: props => ({
            variables: {
                id: props.router.query.id,
            },
        }),
        props: ({ data }) => ({ data }),
    })
)(Restaurants)
