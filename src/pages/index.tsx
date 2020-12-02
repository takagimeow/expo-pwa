import { Layout } from 'components/Layout';
import { Link, graphql } from 'gatsby';
import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

export default function Home({ data }: any) {
  return (
    <Layout title={data.site.siteMetadata.title}>
      <View>
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
      </View>
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
