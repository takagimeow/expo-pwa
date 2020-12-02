import { Layout } from 'components/Layout';
import { graphql } from 'gatsby';
import React from 'react';
import { View } from 'react-native';

import '../../styles/global.css';

const BlogPost = ({ data }: any) => {
  const post = data.markdownRemark;
  return (
    <Layout title={data.site.siteMetadata.title}>
      <div
        style={{
          width: '100%',
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
