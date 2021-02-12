import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Heading, Text } from 'grommet';

import {
  PageDescription,
  Layout,
  SEO,
  CommunityCard,
  SectionHeader,
  ResponsiveGrid,
} from '../../components';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

const columns = {
  small: ['auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto', 'auto'],
};

const rows = {
  small: ['auto', 'auto', 'auto'],
  medium: ['auto', 'auto'],
  large: ['auto'],
  xlarge: ['auto'],
};
function Community({ data }) {
  const communities = data.allMarkdownRemark.edges;
  const siteMetadata = useSiteMetadata();
  const siteTitle = siteMetadata.title;
  return (
    <Layout title={siteTitle}>
      <SEO title="Community" />
      <Box flex overflow="auto" gap="large" pad="xlarge" wrap>
        <PageDescription image="/img/community/community.svg" title="Community">
          <Text>
            A community is all about connection. Discover the many different
            ways you can connect with members of the HPE DEV Community here.
          </Text>
        </PageDescription>
        <SectionHeader color="yellow">
          <ResponsiveGrid gap="large" rows={rows} columns={columns}>
            {communities.map((community) => (
              <CommunityCard key={community.node.id} node={community.node} />
            ))}
          </ResponsiveGrid>
        </SectionHeader>
      </Box>
    </Layout>
  );
}

Community.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              image: PropTypes.string,
              link: PropTypes.string,
              linkname: PropTypes.string,
              priority: PropTypes.number,
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              sourceInstanceName: PropTypes.string.isRequired,
            }),
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Community;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "community" } } }
      sort: { fields: [frontmatter___priority] }
    ) {
      edges {
        node {
          id
          rawMarkdownBody
          fields {
            sourceInstanceName
          }
          excerpt
          frontmatter {
            title
            link
            description
            image
            linkname
            priority
          }
        }
      }
    }
  }
`;