import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import selectedImages from 'store/selectedImages'


const SecondPage = () => {
  console.log(selectedImages.images)

  return (
      <Layout>
        <SEO title="Page two"/>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
  )
}

export default SecondPage
