import gql from 'graphql-tag'
import Link from 'next/link'
import { graphql } from 'react-apollo'
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

const RestaurantList = ({ data: { loading, error, restaurants }, search }, req) => {
    if (error) return 'Error loading restaurants'

    if (restaurants && restaurants.length) {
        const searchQuery = restaurants.filter(query => query.name.toLowerCase().includes(search))

        if (searchQuery.length != 0) {
            return (
                <div>
                    <div className='h-100'>
                        {searchQuery.map(res => (
                            <Card
                                style={{ width: '30%', margin: '0 10px' }}
                                className='h-100'
                                key={res._id}
                            >
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
                                    <Link
                                        as={`/restaurants/${res._id}`}
                                        href={`/restaurants?id=${res._id}`}
                                    >
                                        <a className='btn btn-primary'>View</a>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <style jsx global>
                        {`
                            a {
                                color: white;
                            }
                            a:link {
                                text-decoration: none;
                                color: white;
                            }
                            a:hover {
                                color: white;
                            }
                            .card-columns {
                                column-count: 3;
                            }
                        `}
                    </style>
                </div>
            )
        }

        return <h1>No Restaurants Found</h1>
    }

    return <h1>Loading</h1>
}

const query = gql`
    {
        restaurants {
            _id
            name
            description
            image {
                url
            }
        }
    }
`
RestaurantList.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
}

export default graphql(query, {
    props: ({ data }) => ({
        data,
    }),
})(RestaurantList)
