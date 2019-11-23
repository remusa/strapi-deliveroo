import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { graphql } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
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

const RESTAURANTS_QUERY = gql`
    query RESTAURANTS_QUERY {
        restaurants {
            id
            name
            description
            image {
                url
            }
        }
    }
`

const RestaurantList = ({ search }) => {
    const [stars, setStars] = useState({})

    useEffect(() => {
        const getStars = async () => {
            const res = await fetch('https://api.github.com/repos/zeit/next.js').catch(err =>
                console.error(`ERROR getStars | ${err.message}`)
            )

            if (res) {
                const json = await res.json()
                setStars({ stars: json.stargazers_count })
            }
        }

        getStars()
    })

    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            search,
        },
    })

    if (loading) return <h1>Loading</h1>

    if (error) {
        console.log(`ERROR: ${error.message}`)
        return <h2>Error loading restaurants</h2>
    }

    const { restaurants } = data

    if (!restaurants.length) {
        return <h1>No Restaurants Found</h1>
    }

    const searchQuery = restaurants.filter(query => query.name.toLowerCase().includes(search))

    if (!searchQuery.length) {
        return <h1>No Restaurants Found</h1>
    }

    return (
        <div>
            <div className='h-100' style={{ display: 'flex', flexFlow: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                {searchQuery.map(res => (
                    <Card
                        style={{ width: "auto", height: '250px', margin: '0 10px' }}
                        className='h-100'
                        key={res.id}
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
                            <Link as={`/restaurants/${res.id}`} href={`/restaurants?id=${res.id}`}>
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

export default RestaurantList
