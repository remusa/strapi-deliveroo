import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/Layout'

class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, isAuthenticated, ctx } = this.props

        return (
            <Container>
                <Layout isAuthenticated={isAuthenticated} {...pageProps}>
                    <Component {...pageProps} />
                </Layout>

                <style jsx global>
                    {`
                        a {
                            color: white !important;
                        }
                        a:link {
                            text-decoration: none !important;
                            color: white !important;
                        }
                        a:hover {
                            color: white;
                        }
                        .card {
                            display: inline-block !important;
                        }
                        .card-columns {
                            column-count: 3;
                        }
                    `}
                </style>
            </Container>
        )
    }
}

export default withData(MyApp)
