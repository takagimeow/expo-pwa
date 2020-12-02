/* eslint-disable global-require */
import image1 from 'assets/images/4.png';
import image2 from 'assets/images/5.png';
import image3 from 'assets/images/6.png';
import { IntroduceSection } from 'components/IntroduceSection';
import { Layout } from 'components/Layout';
import { Link, graphql } from 'gatsby';
import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import tailwind from 'tailwind-rn';

export default function Home({ data }: any) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <Layout title={data.site.siteMetadata.title}>
      <>
        <View
          style={[
            tailwind('flex flex-1 justify-center mt-8'),
            windowWidth > 580 ? tailwind('px-4') : tailwind('px-4'),
            {
              width: windowWidth * 0.8,
            },
          ]}
        >
          <View style={[tailwind('py-12')]}>
            <Text style={[tailwind('text-lg')]}>404 Not Found</Text>
          </View>
          {/*
          <Text style={[tailwind('text-5xl')]}>Amazing Pandas Eating Things</Text>
          <Text style={[tailwind('text-base')]}>{data.allMarkdownRemark.totalCount} Posts</Text>
          {data.allMarkdownRemark.edges.map(({ node }: any) => (
            <View key={node.id}>
              <Link to={node.fields.slug}>
                <View style={[tailwind('mb-4 flex-row')]}>
                  <Text style={[tailwind('text-lg')]}>{node.frontmatter.title} </Text>
                  <Text style={[tailwind('text-lg text-gray-500')]}>— {node.frontmatter.date}</Text>
                </View>
                <Text style={[tailwind('text-sm')]}>{node.excerpt}</Text>
              </Link>
            </View>
					))}
					*/}
        </View>
      </>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
