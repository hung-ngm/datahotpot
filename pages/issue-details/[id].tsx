import { NextPage } from 'next';
import { Layout } from '../../src/components/layout';
import { prisma } from '../../lib/prismadb';
import { IIssueDetails } from '../../src/components/templates/issueDetails/types';
import { IssueDetails } from '../../src/components/templates/issueDetails';

export const getServerSideProps = async ({ params }: any) => {
    const issueId = params.id;

    const issue = await prisma.issue.findUnique({
        where: {
            id: issueId
        },
        include: {
            categories: true
        }
    })


    if (issue) {
        return {
            props: {
                issue: JSON.parse(JSON.stringify(issue))
            }
        }
    }

    return {
        redirect: {
            destination: '/issues',
            permanent: false
        }
    }
}

const IssueDetailsPage: NextPage<IIssueDetails> = ({ issue }) => {
    return (
        <Layout>
            <IssueDetails issue={issue} />
        </Layout>
    );
};

export default IssueDetailsPage;
